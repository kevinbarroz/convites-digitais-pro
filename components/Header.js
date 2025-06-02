export default function Header() {
  return (
    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
      <h1 style={{ 
        fontSize: '4rem', 
        marginBottom: '16px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        fontWeight: 800,
        letterSpacing: '-2px'
      }}>
        ✨ Convites Digitais
      </h1>
      <p style={{ 
        fontSize: '1.2rem', 
        color: 'rgba(255, 255, 255, 0.7)',
        fontWeight: 400
      }}>
        Crie convites incríveis em minutos com tecnologia moderna
      </p>
    </div>
  )
}
