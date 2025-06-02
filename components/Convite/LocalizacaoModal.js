export default function LocalizacaoModal({ convite, onClose }) {
  const abrirGoogleMaps = () => {
    // Se tem um link direto do Google Maps, usar ele
    if (convite.endereco && (convite.endereco.includes('maps.google.com') || convite.endereco.includes('maps.app.goo.gl'))) {
      window.open(convite.endereco, '_blank');
      return;
    }
    
    // Se tem um link no campo localizacao_maps_url, usar ele
    if (convite.localizacao_maps_url && (convite.localizacao_maps_url.includes('maps.google.com') || convite.localizacao_maps_url.includes('maps.app.goo.gl'))) {
      window.open(convite.localizacao_maps_url, '_blank');
      return;
    }
    
    // Caso contrário, fazer busca pelo nome do local
    const endereco = convite.localizacao_nome || convite.endereco || convite.local_evento;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}`;
    window.open(url, '_blank');
  };

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatarHora = (data) => {
    return new Date(data).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
      padding: '16px',
      animation: 'fadeIn 0.3s ease-out'
    }}>
      <div style={{
        background: 'rgba(20, 20, 20, 0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '16px',
        padding: '32px',
        maxWidth: '450px',
        width: '100%',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        animation: 'slideUp 0.4s ease-out'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: 'white',
            margin: 0
          }}>
            Localização
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '1.5rem',
              cursor: 'pointer',
              transition: 'color 0.2s ease',
              padding: '4px',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '4px'
            }}
            onMouseEnter={(e) => e.target.style.color = 'white'}
            onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}
          >
            ×
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Placeholder do mapa */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            height: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <svg style={{ width: '3rem', height: '3rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p style={{ fontSize: '0.9rem', margin: 0, maxWidth: '200px' }}>
              Clique em "Abrir no Maps" para ver o local exato
            </p>
          </div>

          {/* Informações do evento */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: 'white',
              marginBottom: '12px',
              margin: '0 0 12px 0'
            }}>
              {convite.localizacao_nome || convite.endereco || convite.local_evento || 'Local do Evento'}
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg style={{ width: '16px', height: '16px', color: 'rgba(255, 255, 255, 0.6)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px' }}>
                  {formatarData(convite.data_evento)}
                </span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg style={{ width: '16px', height: '16px', color: 'rgba(255, 255, 255, 0.6)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px' }}>
                  {formatarHora(convite.data_evento)}
                </span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg style={{ width: '16px', height: '16px', color: 'rgba(255, 255, 255, 0.6)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px' }}>
                  {convite.localizacao_nome || convite.endereco || convite.local_evento}
                </span>
              </div>
            </div>
          </div>

          {/* Botão abrir no maps */}
          <button
            onClick={abrirGoogleMaps}
            style={{
              width: '100%',
              padding: '14px 20px',
              background: 'white',
              color: '#000',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.9)';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'white';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <svg style={{ width: '18px', height: '18px' }} fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            Abrir no Maps
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}