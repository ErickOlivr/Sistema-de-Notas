import React, { useState } from 'react';

export const DatabaseToggle = () => {
  // Inicializa o estado lendo o localStorage (padrão 'sql' se estiver vazio)
  const [isMongo, setIsMongo] = useState(localStorage.getItem('database_mode') === 'mongodb');

  const handleToggle = () => {
    const newMode = !isMongo ? 'mongodb' : 'sql';
    setIsMongo(!isMongo);
    localStorage.setItem('database_mode', newMode);
    
    // Recarrega a página suavemente para atualizar a URL base dos serviços
    window.location.reload();
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px' }}>
      <span style={{ fontWeight: 500, fontSize: '14px', color: isMongo ? '#666' : '#000' }}>
        PostgreSQL
      </span>
      
      {/* Container do Switch de deslizar */}
      <div 
        onClick={handleToggle}
        style={{
          width: '50px',
          height: '26px',
          backgroundColor: isMongo ? '#4caf50' : '#ccc',
          borderRadius: '15px',
          position: 'relative',
          cursor: 'pointer',
          transition: 'background-color 0.3s'
        }}
      >
        {/* A bolinha que desliza */}
        <div 
          style={{
            width: '20px',
            height: '20px',
            backgroundColor: '#white',
            borderRadius: '50%',
            position: 'absolute',
            top: '3px',
            left: isMongo ? '27px' : '3px',
            transition: 'left 0.3s',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
        />
      </div>

      <span style={{ fontWeight: 500, fontSize: '14px', color: isMongo ? '#4caf50' : '#666' }}>
        MongoDB Atlas
      </span>
    </div>
  );
};