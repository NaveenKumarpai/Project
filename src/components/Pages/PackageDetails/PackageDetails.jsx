import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./PackageDetails.css";
import { useNavigate } from 'react-router-dom';

const PackageDetails = ({ server_key, tokenu, id }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [amount1, setAmount1] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'https://test.e-prathibha.com/apis/packageDetails',
          {},
          {
            headers: {
              tokenu: tokenu,
              id: id,
              server_key: server_key,
            },
          }
        );
        console.log(response.data);
        const { name, amount, amount_year } = response.data.data;
        setName(name);
        setAmount(amount);
        setAmount1(amount_year);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id, server_key, tokenu]);

  useEffect(() => {
    const loadRazorpayScript = () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    };

    loadRazorpayScript();
  }, []);

  const handleRazorpayPayment = (amount, name, email, contact) => {
    axios
      .post(
        'https://test.e-prathibha.com/apis/test_paymentGateway',
        {
          packagearr: { '8': '1' },
          packagetype: 'RAZORPAY',
          year: '',
        },
        {
          headers: {
            tokenu: tokenu,
            id: id,
            server_key: server_key,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        const orderId = response.data.data.order_id;

        const options = {
          key: "rzp_test_0YCAdMj7OeF0tB",
          amount: amount * 100,
          currency: "INR",
          name: name,
          description: "Test Transaction",
          handler: function (response) {
            console.log(response.razorpay_payment_id);
            console.log(response);
            navigate('/paymentResponse', {
              state: { paymentId: response.razorpay_payment_id, 
                orderId: orderId },
            });
          },
          prefill: {
            name: name,
            email: email,
            contact: contact,
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
        console.log(rzp);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <div className='premium'>
        <div className='premium1'>
          <h3>{name}</h3>
          <p>6 months package</p>
          <h3>{amount}</h3>
          <button onClick={() => handleRazorpayPayment(amount, "NaveenKumar", "naveen.paidipamula@gmail.com", "9160156140")}>
            Pay 
          </button>
        </div>
        <div className='premium2'>
          <h3>{name}</h3>
          <p>1 Year package</p>
          <h3>{amount1}</h3>
          <button onClick={() => handleRazorpayPayment(amount1, "NaveenKumar", "naveen.paidipamula@gmail.com", "9160156140")}>
            Pay 
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
