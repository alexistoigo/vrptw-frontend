import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VALID_USER = 'a';
const VALID_PASS = 'a';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(username === VALID_USER && password === VALID_PASS) {
      onLogin();
      navigate('/form');
    } else {
      setError('Credenciais inválidas');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuário:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e)=>setUsername(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Senha:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e)=>setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
