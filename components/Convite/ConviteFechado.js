export default function ConviteFechado({ convite, onAbrir }) {
  // DEBUG: Vamos ver TODOS os campos do convite
  console.log('=== DEBUG COMPLETO ===');
  console.log('Convite inteiro:', convite);
  console.log('Todas as chaves:', Object.keys(convite));
  
  // Vamos testar TODOS os possíveis nomes de campos
  const possiveisCampos = [
    'background_mobile_url',
    'background_desktop_url', 
    'backgroundMobile',
    'backgroundDesktop',
    'background_mobile',
    'background_desktop',
    'imagem_url',
    'imagem_fechado_url'
  ];
  
  console.log('=== TESTANDO TODOS OS CAMPOS ===');
  possiveisCampos.forEach(campo => {
    console.log(`${campo}:`, convite[campo] ? 'EXISTE' : 'null/undefined');
  });

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

  // Tentar TODOS os campos possíveis
  const isMobile = window.innerWidth <= 768;
  let base64Image = null;
  
  // Tentar em ordem de prioridade
  if (isMobile) {
    base64Image = convite.background_mobile_url || 
                  convite.backgroundMobile || 
                  convite.background_mobile ||
                  convite.imagem_url;
  } else {
    base64Image = convite.background_desktop_url || 
                  convite.backgroundDesktop || 
                  convite.background_desktop ||
                  convite.imagem_url;
  }
  
  console.log('=== RESULTADO FINAL ===');
  console.log('Is Mobile:', isMobile);
  console.log('Base64 encontrado:', !!base64Image);
  console.log('Tamanho do base64:', base64Image ? base64Image.length : 0);
  
  const backgroundImage = convertBase64ToUrl(base64Image);
  console.log('Background URL criada:', !!backgroundImage);
  
  return (
    <div 
      className="convite-fechado-container"
      style={{
        backgroundImage: backgroundImage 
          ? `url(${backgroundImage})` 
          : 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
      }}
      onClick={onAbrir}
    >
      <div className="convite-fechado-texto">
        CLIQUE PARA ABRIR
      </div>
    </div>
  );
}