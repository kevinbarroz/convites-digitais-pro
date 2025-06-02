import { useState, useEffect } from 'react'
import Head from 'next/head'
import { supabase } from '../lib/supabase'
import Dashboard from '../components/Admin/Dashboard'
import CriarConvite from '../components/Admin/CriarConvite'
import ConvitesCriados from '../components/Admin/ConvitesCriados'
import DadosConvites from '../components/Admin/DadosConvites'

export default function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [stats, setStats] = useState({
    totalConvites: 0,
    totalConfirmacoes: 0,
    totalVisualizacoes: 0,
    ctaClicks: 0
  })
  const [convites, setConvites] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    checkAuthentication()
  }, [])

  const checkAuthentication = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('Erro ao verificar sessão:', error)
        window.location.href = '/'
        return
      }

      if (!session || !session.user) {
        window.location.href = '/'
        return
      }

      setUser(session.user)
      loadStats()
      loadConvites()
    } catch (err) {
      console.error('Erro na verificação de auth:', err)
      window.location.href = '/'
    } finally {
      setAuthLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('Erro ao fazer logout:', error)
      }
      
      window.location.href = '/'
    } catch (err) {
      console.error('Erro:', err)
      window.location.href = '/'
    }
  }

  const loadStats = async () => {
    try {
      // Total de convites
      const { count: totalConvites } = await supabase
        .from('convites')
        .select('*', { count: 'exact', head: true })

      // Total de confirmações
      const { count: totalConfirmacoes } = await supabase
        .from('confirmacoes')
        .select('*', { count: 'exact', head: true })

      // Visualizações de convites (soma de todas as visualizações)
      const { data: visualizacoesData } = await supabase
        .from('convites')
        .select('visualizacoes')

      const totalVisualizacoes = visualizacoesData?.reduce((sum, item) => sum + (item.visualizacoes || 0), 0) || 0

      setStats({
        totalConvites: totalConvites || 0,
        totalConfirmacoes: totalConfirmacoes || 0,
        totalVisualizacoes: totalVisualizacoes,
        ctaClicks: 0 // Implementar se necessário
      })
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error)
    }
  }

  const loadConvites = async () => {
    try {
      const { data, error } = await supabase
        .from('convites')
        .select('*')
        .order('criado_em', { ascending: false })

      if (error) throw error
      setConvites(data || [])
    } catch (error) {
      console.error('Erro ao carregar convites:', error)
    }
  }

  const showMessage = (type, text) => {
    setMessage({ type, text })
    setTimeout(() => setMessage({ type: '', text: '' }), 5000)
  }

  const handleCreateConvite = async (formData) => {
    if (!formData.nomeFesta || !formData.dataEvento || !formData.horaEvento || 
        !formData.localizacaoNome || !formData.slug) {
      showMessage('error', 'Preencha todos os campos obrigatórios')
      return
    }

    setLoading(true)
    try {
      // Combinar data e hora
      const dataHora = `${formData.dataEvento}T${formData.horaEvento}:00`

      const { data, error } = await supabase
        .from('convites')
        .insert([{
          titulo: formData.nomeFesta,
          data_evento: dataHora,
          local_evento: formData.localizacaoNome,
          endereco: formData.localizacaoMapsUrl,
          slug: formData.slug,
          background_mobile_url: formData.backgroundMobile,
          background_desktop_url: formData.backgroundDesktop,
          background_mobile_aberto_url: formData.backgroundMobileAberto,
          background_desktop_aberto_url: formData.backgroundDesktopAberto
        }])

      if (error) throw error

      showMessage('success', 'Convite criado com sucesso!')
      loadConvites()
      loadStats()
    } catch (error) {
      showMessage('error', 'Erro ao criar convite: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard stats={stats} />
      case 'criar':
        return <CriarConvite onSubmit={handleCreateConvite} loading={loading} message={message} />
      case 'convites':
        return <ConvitesCriados convites={convites} />
      case 'dados':
        return <DadosConvites />
      default:
        return <Dashboard stats={stats} />
    }
  }

  if (authLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#0a0a0a',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid rgba(255, 255, 255, 0.1)',
            borderTop: '3px solid #667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p>Verificando autenticação...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Painel Admin - Convites Digitais</title>
      </Head>

      <div style={{
        minHeight: '100vh',
        background: '#0a0a0a',
        color: '#fff',
        fontFamily: 'Inter, sans-serif'
      }}>
        {/* Header */}
        <header style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '16px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>
            🎉 Painel Administrativo
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>
              {user?.email}
            </span>
            <button
              onClick={handleLogout}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#fff',
                padding: '8px 16px',
                borderRadius: '6px',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.15)'
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)'
              }}
            >
              Sair
            </button>
          </div>
        </header>

        <div style={{ display: 'flex', minHeight: 'calc(100vh - 73px)' }}>
          {/* Sidebar */}
          <aside style={{
            width: '280px',
            background: 'rgba(255, 255, 255, 0.02)',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '24px 0'
          }}>
            {[
              { id: 'dashboard', label: '📊 Dashboard' },
              { id: 'criar', label: '➕ Criar Convite' },
              { id: 'convites', label: '📋 Convites Criados' },
              { id: 'dados', label: '📈 Dados dos Convites' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  width: '100%',
                  padding: '16px 24px',
                  background: activeTab === tab.id ? 'rgba(102, 126, 234, 0.1)' : 'transparent',
                  border: 'none',
                  borderLeft: activeTab === tab.id ? '3px solid #667eea' : '3px solid transparent',
                  color: activeTab === tab.id ? '#667eea' : 'rgba(255, 255, 255, 0.7)',
                  fontSize: '16px',
                  fontWeight: activeTab === tab.id ? 600 : 400,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s'
                }}
              >
                {tab.label}
              </button>
            ))}
          </aside>

          {/* Main Content */}
          <main style={{ flex: 1, padding: '32px' }}>
            {/* Mensagens */}
            {message.text && (
              <div style={{
                background: message.type === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                color: message.type === 'success' ? '#22c55e' : '#ef4444',
                border: `1px solid ${message.type === 'success' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '24px'
              }}>
                {message.text}
              </div>
            )}

            {renderContent()}
          </main>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  )
}