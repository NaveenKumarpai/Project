import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

const PaymentResponse = () => {
  const [packageOrder,setPackageOrder] = useState('');
  const location = useLocation();
  const { orderId,paymentId} = location.state ||{};

    useEffect(() => {
        const fetchData = async () => {
          try { 
            const response = await axios.post(
              'https://test.e-prathibha.com/apis/success',
              {
                orderId: orderId,
                razorpay_payment_id: paymentId,
                }
             
            );
            console.log(response.data);
            setPackageOrder(response.data.data)

            // console.log(orderId);
            // console.log(paymentId)
            
            
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
      },[orderId,paymentId]);
  return (
    <div  className='text-center'>
     <h4>{packageOrder}</h4>
      <Link to={"/Exampage"}>
      <button>Back</button>
      </Link>
    </div>
  )
}

export default PaymentResponse;