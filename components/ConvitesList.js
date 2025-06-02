export default function ConvitesList({ convites, onViewConvite }) {
  if (convites.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '64px 32px' }}>
        <div style={{ fontSize: '4rem', marginBottom: '24px' }}>📋</div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '16px' }}>
          Seus Convites
        </h2>
        <p style={{ 
          color: 'rgba(255, 255, 255, 0.6)', 
          fontSize: '16px',
          lineHeight: 1.6,
          maxWidth: '400px',
          margin: '0 auto'
        }}>
          Nenhum convite criado ainda. Comece criando seu primeiro convite digital e impressione seus convidados!
        </p>
      </div>
    )
  }

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginBottom: '32px' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: '2rem', marginRight: '12px' }}>📋</span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700 }}>
            Seus Convites ({convites.length})
          </h2>
        </div>
        <div style={{ 
          background: 'rgba(102, 126, 234, 0.1)',
          border: '1px solid rgba(102, 126, 234, 0.2)',
          borderRadius: '8px',
          padding: '8px 16px',
          fontSize: '14px',
          color: '#667eea'
        }}>
          {convites.reduce((total, convite) => total + (convite.visualizacoes || 0), 0)} visualizações totais
        </div>
      </div>
      
      <div className="convites-grid">
        {convites.map(convite => {
          const primeiraImagem = convite.imagens && convite.imagens.length > 0 
            ? convite.imagens[0] 
            : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM2NjdlZWEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM3NjRiYTIiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2cpIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuKcqCBDb252aXRlPC90ZXh0Pjwvc3ZnPg=='
          
          const dataFormatada = convite.data_evento ? 
            new Date(convite.data_evento).toLocaleDateString('pt-BR', {
              weekday: 'short',
              day: '2-digit',
              month: 'short',
              year: 'numeric'
            }) : 'Data não definida'

          const horaFormatada = convite.data_evento ?
            new Date(convite.data_evento).toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit'
            }) : ''
          
          return (
            <div key={convite.id} className="convite-card">
              <img
                src={primeiraImagem}
                alt="Preview do convite"
                className="convite-preview"
              />
              
              <div style={{ marginBottom: '16px' }}>
                <h3 style={{ 
                  fontSize: '1.4rem', 
                  fontWeight: 700, 
                  marginBottom: '8px',
                  lineHeight: 1.3
                }}>
                  {convite.titulo}
                </h3>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginBottom: '6px',
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.8)'
                }}>
                  <span style={{ marginRight: '8px' }}>📅</span>
                  <span>{dataFormatada}</span>
                  {horaFormatada && (
                    <>
                      <span style={{ margin: '0 8px', color: 'rgba(255, 255, 255, 0.4)' }}>•</span>
                      <span>🕒 {horaFormatada}</span>
                    </>
                  )}
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginBottom: '6px',
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.8)'
                }}>
                  <span style={{ marginRight: '8px' }}>📍</span>
                  <span style={{ 
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {convite.local}
                  </span>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  marginTop: '12px'
                }}>
                  <div style={{ 
                    fontSize: '14px',
                    color: 'rgba(255, 255, 255, 0.8)'
                  }}>
                    <span style={{ marginRight: '8px' }}>👤</span>
                    {convite.organizador}
                  </div>
                  
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    background: 'rgba(102, 126, 234, 0.1)',
                    border: '1px solid rgba(102, 126, 234, 0.2)',
                    borderRadius: '6px',
                    padding: '4px 8px',
                    fontSize: '12px',
                    color: '#667eea'
                  }}>
                    <span style={{ marginRight: '4px' }}>👀</span>
                    {convite.visualizacoes || 0}
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => onViewConvite(convite)}
                className="btn"
                style={{ 
                  fontSize: '16px',
                  padding: '14px 20px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  e.target.style.border = '1px solid transparent'
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)'
                  e.target.style.border = '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                🚀 Ver Convite
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
