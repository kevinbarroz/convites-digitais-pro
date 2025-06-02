import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import ConfirmarPresencaModal from './ConfirmarPresencaModal';
import LocalizacaoModal from './LocalizacaoModal';

export default function ConviteAberto({ convite }) {
  const [showConfirmarModal, setShowConfirmarModal] = useState(false);
  const [showLocalizacaoModal, setShowLocalizacaoModal] = useState(false);
  
  useEffect(() => {
    document.body.classList.add('convite-page');
    incrementarVisualizacoes();
    
    return () => {
      document.body.classList.remove('convite-page');
    };
  }, []);

  const incrementarVisualizacoes = async () => {
    try {
      const { error } = await supabase
        .from('convites')
        .update({ 
          visualizacoes: convite.visualizacoes + 1 
        })
        .eq('id', convite.id);

      if (error) {
        console.error('Erro ao incrementar visualizações:', error);
      }
    } catch (err) {
      console.error('Erro:', err);
    }
  };

  const irParaHome = () => {
    window.open('/', '_blank');
  };

  // Função para converter base64 em blob URL
  const convertBase64ToUrl = (base64String) => {
    if (!base64String || !base64String.startsWith('data:image')) return null;
    
    try {
      const byteCharacters = atob(base64String.split(',')[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'image/png' });
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error('Erro ao converter base64:', error);
      return null;
    }
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  
  let base64Image = null;
  
  if (isMobile) {
    base64Image = convite.background_mobile_aberto_url || 
                  convite.background_mobile_url ||
                  convite.background_desktop_aberto_url ||
                  convite.background_desktop_url;
  } else {
    base64Image = convite.background_desktop_aberto_url || 
                  convite.background_desktop_url ||
                  convite.background_mobile_aberto_url ||
                  convite.background_mobile_url;
  }
  
  const backgroundImage = convertBase64ToUrl(base64Image);

  return (
    <div 
      className="convite-background convite-aberto"
      style={{
        backgroundImage: backgroundImage 
          ? `url(${backgroundImage})` 
          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative'
      }}
    >
      <div className="convite-overlay" style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.2)'
      }}></div>
      
      <button
        onClick={irParaHome}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'rgba(20, 20, 20, 0.8)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          color: 'white',
          padding: '8px 16px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          fontSize: '12px',
          fontWeight: '400',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          zIndex: 30,
          boxShadow: 'none'
        }}
      >
        Faça seu Convite Digital
      </button>

      <div style={{
        position: 'fixed',
        bottom: '60px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
        width: '100%',
        maxWidth: '400px',
        padding: '0 24px',
        zIndex: 10
      }}>
        <button
          onClick={() => setShowConfirmarModal(true)}
          style={{
            background: 'rgba(20, 20, 20, 0.8)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            color: 'white',
            padding: '12px 20px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            fontWeight: '400',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: 'none',
            fontSize: '14px'
          }}
        >
          Confirmar Presença
        </button>
        
        <button
          onClick={() => setShowLocalizacaoModal(true)}
          style={{
            background: 'rgba(20, 20, 20, 0.8)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            color: 'white',
            padding: '12px 20px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            fontWeight: '400',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: 'none',
            fontSize: '14px'
          }}
        >
          Localização
        </button>
      </div>

      {showConfirmarModal && (
        <ConfirmarPresencaModal 
          convite={convite}
          onClose={() => setShowConfirmarModal(false)}
        />
      )}

      {showLocalizacaoModal && (
        <LocalizacaoModal 
          convite={convite}
          onClose={() => setShowLocalizacaoModal(false)}
        />
      )}
    </div>
  );
}