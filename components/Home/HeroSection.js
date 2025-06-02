export default function HeroSection({ onCtaClick }) {
  const handleCtaClick = () => {
    window.open('https://wa.me/5543996284678?text=Ol%C3%A1!%20Gostaria%20de%20saber%20sobre%20os%20Convites%20Digitais.', '_blank');
  };

  return (
    <main style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '0 32px'
    }}>
      <h1 style={{
        fontSize: 'clamp(2.5rem, 8vw, 6rem)',
        fontWeight: 800,
        lineHeight: 1.1,
        marginBottom: '32px',
        background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        letterSpacing: '-0.02em'
      }}>
        Crie Convites Digitais<br />
        Para Qualquer Ocasião
      </h1>

      <p style={{
        fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
        color: 'rgb(255, 255, 255)',
        marginBottom: '48px',
        maxWidth: '600px',
        lineHeight: 1.5
      }}>
        Transforme seus eventos em experiências únicas com convites digitais elegantes e personalizados
      </p>

      <button
        onClick={handleCtaClick}
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none',
          color: '#fff',
          padding: '20px 48px',
          borderRadius: '12px',
          fontSize: '18px',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)'
          e.target.style.boxShadow = '0 12px 40px rgba(102, 126, 234, 0.4)'
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)'
          e.target.style.boxShadow = '0 8px 32px rgba(102, 126, 234, 0.3)'
        }}
      >
        Faça seu convite
      </button>
    </main>
  )
}