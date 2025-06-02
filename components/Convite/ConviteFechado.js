export default function ConviteFechado({ convite, onAbrir }) {
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

  // Detectar se é mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  
  // Selecionar background apropriado
  let base64Image = null;
  
  if (isMobile) {
    base64Image = convite.background_mobile_url || 
                  convite.background_desktop_url;
  } else {
    base64Image = convite.background_desktop_url || 
                  convite.background_mobile_url;
  }
  
  const backgroundImage = convertBase64ToUrl(base64Image);
  
  return (
    <div 
      className="convite-fechado-container"
      style={{
        backgroundImage: backgroundImage 
          ? `url(${backgroundImage})` 
          : 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      onClick={onAbrir}
    >
      <div className="convite-fechado-texto">
        CLIQUE PARA ABRIR
      </div>
    </div>
  );
}