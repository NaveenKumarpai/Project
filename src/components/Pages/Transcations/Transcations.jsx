import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Transactions = ({ server_key, tokenu, id }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'https://test.e-prathibha.com/apis/transactions',
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
        // console.log(response.data.data);
        setTransactions(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [server_key, tokenu, id]);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Transaction_Id</th>
            <th>Order Id</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((item, index) => (
            <tr key={index}>
                <td>{index+1}</td>
              <td>{item.Payment.transaction_id}</td>
              <td>{item.Payment.token}</td>
              <td>{item.Payment.amount}</td>
              <td>{item.Payment.date}</td>
              <td>{item.Payment.status}</td>
              <td>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
