import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    axios('https://jsonplaceholder.typicode.com/posts')
      .then(resp => {
        console.log(resp.data);
        setData(resp.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) return 'Error!';

  return (
    <div>
      {data.map(item => {
        const { userId, id, title, body } = item;
        return (
          <div key={id}>
            <h1>{id}</h1>
            <h2>{title}</h2>
            <p>{body}</p>
          </div>
        );
      })}
    </div>
  );
}
