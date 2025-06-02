import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import ConfirmarPresencaModal from './ConfirmarPresencaModal';
import LocalizacaoModal from './LocalizacaoModal';

export default function ConviteAberto({ convite }) {
  const [showConfirmarModal, setShowConfirmarModal] = useState(false);
  const [showLocalizacaoModal, setShowLocalizacaoModal] = useState(false);
  
  useEffect(() => {
    // Adicionar classe no body para evitar scroll
    document.body.classList.add('convite-page');
    
    // Incrementar visualizações
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
    if (!base64String || !base64String.startsWith('data:image')) {
      return null;
    }
    
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

  // DETECÇÃO MELHORADA DE MOBILE
  const isMobile = typeof window !== 'undefined' && (
    window.innerWidth <= 768 || 
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  );
  
  // Primeiro tentar mobile, se não tiver usar desktop como fallback
  let base64Image = null;
  
  if (isMobile) {
    base64Image = convite.background_mobile_aberto_url || convite.background_desktop_aberto_url;
    console.log('🔥 CONVITE ABERTO MOBILE - Usando background_mobile_aberto_url');
  } else {
    base64Image = convite.background_desktop_aberto_url || convite.background_mobile_aberto_url;
    console.log('💻 CONVITE ABERTO DESKTOP - Usando background_desktop_aberto_url');
  }
  
  const backgroundImage = convertBase64ToUrl(base64Image);

  return (
    <div 
      className="convite-background convite-aberto"
      style={{
        backgroundImage: backgroundImage 
          ? `url(${backgroundImage})` 
          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}
    >
      <div className="convite-overlay"></div>
      
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
        onMouseEnter={(e) => {
          e.target.style.background = 'rgba(30, 30, 30, 0.9)';
          e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'rgba(20, 20, 20, 0.8)';
          e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        }}
      >
        Faça seu Convite Digital
      </button>

      <div className="btn-grid">
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
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(30, 30, 30, 0.9)';
            e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(20, 20, 20, 0.8)';
            e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
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
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(30, 30, 30, 0.9)';
            e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(20, 20, 20, 0.8)';
            e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
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