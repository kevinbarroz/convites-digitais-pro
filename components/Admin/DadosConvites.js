import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function DadosConvites() {
  const [dados, setDados] = useState({
    convitesAtivos: [],
    convitesExcluidos: [],
    confirmacoes: [],
    loading: true
  })

  useEffect(() => {
    carregarDados()
  }, [])

  const carregarDados = async () => {
    try {
      setDados(prev => ({ ...prev, loading: true }))

      // Buscar convites ativos
      const { data: convitesAtivos } = await supabase
        .from('convites')
        .select('*')
        .order('criado_em', { ascending: false })

      // Buscar convites excluídos (se implementarmos soft delete)
      const { data: convitesExcluidos } = await supabase
        .from('convites_excluidos')
        .select('*')
        .order('excluido_em', { ascending: false })
        .limit(50) // Últimos 50 excluídos

      // Buscar todas as confirmações
      const { data: confirmacoes } = await supabase
        .from('confirmacoes')
        .select(`
          *,
          convites:convite_id (
            nome_festa,
            slug
          )
        `)
        .order('criado_em', { ascending: false })

      setDados({
        convitesAtivos: convitesAtivos || [],
        convitesExcluidos: convitesExcluidos || [],
        confirmacoes: confirmacoes || [],
        loading: false
      })
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
      setDados(prev => ({ ...prev, loading: false }))
    }
  }

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (dados.loading) {
    return (
      <div style={{ textAlign: 'center', padding: '64px' }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid rgba(255, 255, 255, 0.1)',
          borderTop: '3px solid #667eea',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 16px'
        }}></div>
        <p>Carregando dados...</p>
      </div>
    )
  }

  const totalVisualizacoes = dados.convitesAtivos.reduce((sum, c) => sum + (c.visualizacoes || 0), 0)
  const totalConfirmacoes = dados.convitesAtivos.reduce((sum, c) => sum + (c.confirmacoes || 0), 0)

  return (
    <div>
      <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '32px' }}>
        Dados dos Convites
      </h2>

      {/* Cards de resumo */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        <div style={{
          background: 'rgba(102, 126, 234, 0.1)',
          border: '1px solid rgba(102, 126, 234, 0.2)',
          borderRadius: '12px',
          padding: '24px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎉</div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#667eea' }}>
            {dados.convitesAtivos.length}
          </div>
          <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>
            Convites Ativos
          </div>
        </div>

        <div style={{
          background: 'rgba(34, 197, 94, 0.1)',
          border: '1px solid rgba(34, 197, 94, 0.2)',
          borderRadius: '12px',
          padding: '24px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>✅</div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#22c55e' }}>
            {totalConfirmacoes}
          </div>
          <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>
            Total Confirmações
          </div>
        </div>

        <div style={{
          background: 'rgba(168, 85, 247, 0.1)',
          border: '1px solid rgba(168, 85, 247, 0.2)',
          borderRadius: '12px',
          padding: '24px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>👀</div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#a855f7' }}>
            {totalVisualizacoes}
          </div>
          <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>
            Total Visualizações
          </div>
        </div>

        <div style={{
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          borderRadius: '12px',
          padding: '24px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>🗑️</div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#ef4444' }}>
            {dados.convitesExcluidos.length}
          </div>
          <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>
            Convites Excluídos
          </div>
        </div>
      </div>

      {/* Confirmações Recentes */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '32px'
      }}>
        <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px' }}>
          📋 Confirmações Recentes ({dados.confirmacoes.length})
        </h3>
        
        {dados.confirmacoes.length === 0 ? (
          <p style={{ color: 'rgba(255, 255, 255, 0.6)', textAlign: 'center', padding: '20px' }}>
            Nenhuma confirmação ainda
          </p>
        ) : (
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <table style={{ width: '100%', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <th style={{ padding: '12px 8px', textAlign: 'left', color: 'rgba(255, 255, 255, 0.8)' }}>Nome</th>
                  <th style={{ padding: '12px 8px', textAlign: 'left', color: 'rgba(255, 255, 255, 0.8)' }}>WhatsApp</th>
                  <th style={{ padding: '12px 8px', textAlign: 'left', color: 'rgba(255, 255, 255, 0.8)' }}>Convite</th>
                  <th style={{ padding: '12px 8px', textAlign: 'left', color: 'rgba(255, 255, 255, 0.8)' }}>Data</th>
                </tr>
              </thead>
              <tbody>
                {dados.confirmacoes.map((confirmacao, index) => (
                  <tr key={confirmacao.id} style={{ 
                    borderBottom: index < dados.confirmacoes.length - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none' 
                  }}>
                    <td style={{ padding: '12px 8px', color: 'white' }}>{confirmacao.nome}</td>
                    <td style={{ padding: '12px 8px', color: 'rgba(255, 255, 255, 0.7)' }}>
                      <a 
                        href={`https://wa.me/55${confirmacao.telefone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#22c55e', textDecoration: 'none' }}
                      >
                        {confirmacao.telefone}
                      </a>
                    </td>
                    <td style={{ padding: '12px 8px', color: 'rgba(255, 255, 255, 0.7)' }}>
                      {confirmacao.convites?.nome_festa || 'Convite excluído'}
                    </td>
                    <td style={{ padding: '12px 8px', color: 'rgba(255, 255, 255, 0.7)' }}>
                      {formatarData(confirmacao.criado_em)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Performance dos Convites */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '24px'
      }}>
        <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px' }}>
          📊 Performance dos Convites
        </h3>
        
        {dados.convitesAtivos.length === 0 ? (
          <p style={{ color: 'rgba(255, 255, 255, 0.6)', textAlign: 'center', padding: '20px' }}>
            Nenhum convite ativo
          </p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '16px'
          }}>
            {dados.convitesAtivos.map(convite => {
              const taxaConversao = convite.visualizacoes > 0 
                ? ((convite.confirmacoes || 0) / convite.visualizacoes * 100).toFixed(1)
                : 0
              
              return (
                <div key={convite.id} style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  padding: '16px'
                }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', color: 'white' }}>
                    {convite.nome_festa}
                  </h4>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', fontSize: '12px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontWeight: 600, color: '#a855f7' }}>{convite.visualizacoes || 0}</div>
                      <div style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Visualizações</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontWeight: 600, color: '#22c55e' }}>{convite.confirmacoes || 0}</div>
                      <div style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Confirmações</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontWeight: 600, color: '#f59e0b' }}>{taxaConversao}%</div>
                      <div style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Taxa</div>
                    </div>
                  </div>
                  
                  <div style={{ marginTop: '8px', fontSize: '11px', color: 'rgba(255, 255, 255, 0.5)' }}>
                    Criado em: {formatarData(convite.criado_em)}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}