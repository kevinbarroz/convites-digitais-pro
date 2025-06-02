import { useState } from 'react'

export default function SupabaseSetup({ onConnect, isConnected }) {
  const [config, setConfig] = useState({
    url: '',
    key: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onConnect(config.url, config.key)
  }

  if (isConnected) return null

  return (
    <div className="card" style={{ 
      background: 'rgba(102, 126, 234, 0.1)', 
      border: '1px solid rgba(102, 126, 234, 0.2)' 
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
        <span style={{ fontSize: '2rem', marginRight: '12px' }}>🚀</span>
        <h3 style={{ color: '#667eea', fontSize: '1.5rem', fontWeight: 700 }}>
          Configuração do Supabase
        </h3>
      </div>
      
      <p style={{ 
        color: 'rgba(255, 255, 255, 0.7)', 
        marginBottom: '32px',
        fontSize: '16px',
        lineHeight: 1.6
      }}>
        Configure sua conexão com o Supabase para começar a criar convites digitais incríveis.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>URL do Projeto</label>
          <input
            type="url"
            value={config.url}
            onChange={(e) => setConfig(prev => ({ ...prev, url: e.target.value }))}
            placeholder="https://seu-projeto.supabase.co"
            required
          />
        </div>

        <div className="form-group">
          <label>Chave Pública (anon key)</label>
          <input
            type="text"
            value={config.key}
            onChange={(e) => setConfig(prev => ({ ...prev, key: e.target.value }))}
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            required
          />
        </div>
        
        <button type="submit" className="btn">
          🔗 Conectar Supabase
        </button>
      </form>
    </div>
  )
}
