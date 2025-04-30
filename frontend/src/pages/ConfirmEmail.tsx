import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ConfirmEmail = () => {
  const { token } = useParams();
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3001/api/confirm/${token}`)
        .then(res => {
            console.log(res)
            setMessage(res.data.message)
        })
        .catch(err => setMessage(err.response?.data?.message || 'Erreur'));
  }, [token]);
  return (
    <div
      className="nes-container is-rounded"
      style={{
        maxWidth: "400px",
        margin: "80px auto",
        padding: "2rem",
        background: "#fff",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
      }}
    >
      <h2 className="title glitch" style={{ textAlign: "center" }}>
        Confirmation de l'Email
      </h2>

      <div>
        { message }
      </div>

    </div>
  );
};

export default ConfirmEmail;
