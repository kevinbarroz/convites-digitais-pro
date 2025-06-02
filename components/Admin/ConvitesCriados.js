export default function ConvitesCriados({ convites }) {
  return (
    <div>
      <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '32px' }}>
        Convites Criados ({convites.length})
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '24px'
      }}>
        {convites.map(convite => (
          <div key={convite.id} style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '24px'
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px' }}>
              {convite.nome_festa}
            </h3>
            
            <div style={{ marginBottom: '12px', fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>
              <strong>📅 Data:</strong> {new Date(convite.data_evento).toLocaleDateString('pt-BR')}
            </div>
            
            <div style={{ marginBottom: '12px', fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>
              <strong>🕒 Hora:</strong> {convite.hora_evento}
            </div>
            
            <div style={{ marginBottom: '12px', fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>
              <strong>📍 Local:</strong> {convite.localizacao_nome}
            </div>
            
            <div style={{ marginBottom: '16px', fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>
              <strong>🔗 Slug:</strong> /{convite.slug}
            </div>

            {/* Preview dos backgrounds se existirem */}
            {(convite.background_mobile_url || convite.background_desktop_url) && (
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '8px' }}>
                  Backgrounds:
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {convite.background_mobile_url && (
                    <img 
                      src={convite.background_mobile_url} 
                      alt="Mobile Fechado" 
                      style={{ 
                        width: '60px', 
                        height: '40px', 
                        objectFit: 'cover', 
                        borderRadius: '4px',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }} 
                    />
                  )}
                  {convite.background_desktop_url && (
                    <img 
                      src={convite.background_desktop_url} 
                      alt="Desktop Fechado" 
                      style={{ 
                        width: '60px', 
                        height: '40px', 
                        objectFit: 'cover', 
                        borderRadius: '4px',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }} 
                    />
                  )}
                  {convite.background_mobile_aberto_url && (
                    <img 
                      src={convite.background_mobile_aberto_url} 
                      alt="Mobile Aberto" 
                      style={{ 
                        width: '60px', 
                        height: '40px', 
                        objectFit: 'cover', 
                        borderRadius: '4px',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }} 
                    />
                  )}
                  {convite.background_desktop_aberto_url && (
                    <img 
                      src={convite.background_desktop_aberto_url} 
                      alt="Desktop Aberto" 
                      style={{ 
                        width: '60px', 
                        height: '40px', 
                        objectFit: 'cover', 
                        borderRadius: '4px',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }} 
                    />
                  )}
                </div>
              </div>
            )}

            <button
              onClick={() => window.open(`/${convite.slug}`, '_blank')}
              style={{
                width: '100%',
                background: 'rgba(102, 126, 234, 0.1)',
                border: '1px solid rgba(102, 126, 234, 0.3)',
                color: '#667eea',
                padding: '12px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              🚀 Ver Convite
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
