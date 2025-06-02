export default function Dashboard({ stats }) {
  return (
    <div>
      <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '32px' }}>
        Dashboard
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {[
          { label: 'Total de Convites', value: stats.totalConvites, icon: '🎉' },
          { label: 'Confirmações de Presença', value: stats.totalConfirmacoes, icon: '✅' },
          { label: 'Visualizações', value: stats.totalVisualizacoes, icon: '👀' },
          { label: 'Clicks no CTA', value: stats.ctaClicks, icon: '🔗' }
        ].map((stat, index) => (
          <div key={index} style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '24px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>{stat.icon}</div>
            <div style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px' }}>
              {stat.value}
            </div>
            <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
