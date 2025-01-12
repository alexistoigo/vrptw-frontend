import React, { useState } from 'react';

function RouteForm() {
  const [origin, setOrigin] = useState('Praça da Sé - Sé, São Paulo - SP, 01001-000');  const [destinations, setDestinations] = useState([{ address: '', startTime: '', endTime: '' }]);
  const [googleMapsUrl, setGoogleMapsUrl] = useState('');
  const [error, setError] = useState('');
  
  const addDestination = () => {
    setDestinations([...destinations, { address: '', startTime: '', endTime: '' }]);
  };
  
  const removeDestination = (index) => {
    const newDest = destinations.filter((_, i) => i !== index);
    setDestinations(newDest);
  };
  
  const handleDestinationChange = (index, field, value) => {
    const newDestinations = destinations.map((dest, i) => {
      if(i === index) {
        return { ...dest, [field]: value };
      }
      return dest;
    });
    setDestinations(newDestinations);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!origin) {
      setError('O campo de origem é obrigatório.');
      return;
    }
    if(destinations.length === 0 || destinations.some(dest => !dest.address)) {
      setError('Todos os destinos devem ter um endereço válido.');
      return;
    }

    setError('');
    const payload = {
      origin: origin,
      destinations: destinations.map(dest => {
        let time_window_start = 0;
        let time_window_end = 24*3600;
        
        if(dest.startTime) {
          const [h, m] = dest.startTime.split(':').map(Number);
          time_window_start = h * 3600 + m * 60;
        }
        if(dest.endTime) {
          const [h, m] = dest.endTime.split(':').map(Number);
          time_window_end = h * 3600 + m * 60;
        }

        return {
          address: dest.address,
          time_window_start,
          time_window_end
        };
      })
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/optimize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if(!response.ok) {
        setError('Erro ao otimizar a rota.');
        return;
      }
      const data = await response.json();
      setGoogleMapsUrl(data.google_maps_url);
    } catch(err) {
      setError('Erro de rede.');
    }
  };
  
  return (
    <div className="container">
      <h2>Otimização de Rotas</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Origem:</label>
          <input 
            type="text" 
            value={origin} 
            onChange={(e)=>setOrigin(e.target.value)} 
            required 
          />
        </div>
        
        <h3>Destinos:</h3>
        {destinations.map((dest, index) => (
          <div key={index} className="destination-group">
            <div>
              <label>Endereço:</label>
              <input 
                type="text" 
                value={dest.address} 
                onChange={(e)=>handleDestinationChange(index, 'address', e.target.value)} 
                required 
              />
            </div>
            <div>
              <label>Hora Inicial</label>
              <input 
                type="text" 
                value={dest.startTime} 
                onChange={(e)=>handleDestinationChange(index, 'startTime', e.target.value)} 
                placeholder="08:00" 
              />
            </div>
            <div>
              <label>Hora Final</label>
              <input 
                type="text" 
                value={dest.endTime} 
                onChange={(e)=>handleDestinationChange(index, 'endTime', e.target.value)} 
                placeholder="20:30" 
              />
            </div>
            <button
              type="button"
              style={{ color: 'white', backgroundColor: 'red' }}
              onClick={() => {
                if (dest.address && !window.confirm('Deseja realmente remover o endereço?')) {
                  return;
                }
                removeDestination(index);
              }}
            >
              Remover
            </button>
          </div>
        ))}
        <button type="button" onClick={addDestination}>Adicionar Destino</button>

        <div style={{ marginTop: '20px' }}>
          <button type="submit" style={{ color: 'white', backgroundColor: 'green' }}> Otimizar Rota</button>
        </div>
      </form>

      {googleMapsUrl && (
        <div style={{marginTop: '20px', textAlign: 'center'}}>
          <h3>Rota Otimizada:</h3>
          <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
            Ver no Google Maps
          </a>
        </div>
      )}
    </div>
  );
}

export default RouteForm;
