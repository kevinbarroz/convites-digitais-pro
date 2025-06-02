import { useState } from 'react'

export default function ConvitesCriados({ convites, onEdit, onDelete }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [conviteParaExcluir, setConviteParaExcluir] = useState(null)
  const [excluindo, setExcluindo] = useState(false)

  const handleDeleteClick = (convite) => {
    setConviteParaExcluir(convite)
    setShowDeleteModal(true)
  }

  const handleConfirmDelete = async () => {
    if (!conviteParaExcluir) return
    
    setExcluindo(true)
    try {
      await onDelete(conviteParaExcluir.id)
      setShowDeleteModal(false)
      setConviteParaExcluir(null)
    } catch (error) {
      console.error('Erro ao excluir convite:', error)
      alert('Erro ao excluir convite. Tente novamente.')
    } finally {
      setExcluindo(false)
    }
  }

  const handleCancelDelete = () => {
    setShowDeleteModal(false)
    setConviteParaExcluir(null)
  }

  return (
    <div>
      <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '32px' }}>
        Convites Criados ({convites.length})
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '24px'
      }}>
        {convites.map(convite => (
          <div key={convite.id} style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '24px'
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px' }}>
              {convite.nome_festa}
            </h3>
            
            <div style={{ marginBottom: '12px', fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>
              <strong>📅 Data:</strong> {new Date(convite.data_evento).toLocaleDateString('pt-BR')}
            </div>
            
            <div style={{ marginBottom: '12px', fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>
              <strong>🕒 Hora:</strong> {convite.hora_evento}
            </div>
            
            <div style={{ marginBottom: '12px', fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>
              <strong>📍 Local:</strong> {convite.localizacao_nome}
            </div>
            
            <div style={{ marginBottom: '16px', fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)' }}>
              <strong>🔗 Slug:</strong> /{convite.slug}
            </div>

            {/* Analytics básicos */}
            <div style={{ 
              background: 'rgba(102, 126, 234, 0.1)', 
              border: '1px solid rgba(102, 126, 234, 0.2)',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '16px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px',
              fontSize: '12px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 600, color: '#667eea' }}>{convite.visualizacoes || 0}</div>
                <div style={{ color: 'rgba(255, 255, 255, 0.6)' }}>👀 Visualizações</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 600, color: '#22c55e' }}>{convite.confirmacoes || 0}</div>
                <div style={{ color: 'rgba(255, 255, 255, 0.6)' }}>✅ Confirmações</div>
              </div>
            </div>

            {/* Preview dos backgrounds se existirem */}
            {(convite.background_mobile_url || convite.background_desktop_url) && (
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '8px' }}>
                  Backgrounds:
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {convite.background_mobile_url && (
                    <img 
                      src={convite.background_mobile_url} 
                      alt="Mobile Fechado" 
                      style={{ 
                        width: '60px', 
                        height: '40px', 
                        objectFit: 'cover', 
                        borderRadius: '4px',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }} 
                    />
                  )}
                  {convite.background_desktop_url && (
                    <img 
                      src={convite.background_desktop_url} 
                      alt="Desktop Fechado" 
                      style={{ 
                        width: '60px', 
                        height: '40px', 
                        objectFit: 'cover', 
                        borderRadius: '4px',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }} 
                    />
                  )}
                  {convite.background_mobile_aberto_url && (
                    <img 
                      src={convite.background_mobile_aberto_url} 
                      alt="Mobile Aberto" 
                      style={{ 
                        width: '60px', 
                        height: '40px', 
                        objectFit: 'cover', 
                        borderRadius: '4px',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }} 
                    />
                  )}
                  {convite.background_desktop_aberto_url && (
                    <img 
                      src={convite.background_desktop_aberto_url} 
                      alt="Desktop Aberto" 
                      style={{ 
                        width: '60px', 
                        height: '40px', 
                        objectFit: 'cover', 
                        borderRadius: '4px',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }} 
                    />
                  )}
                </div>
              </div>
            )}

            {/* Botões de ação */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '8px' }}>
              <button
                onClick={() => window.open(`/${convite.slug}`, '_blank')}
                style={{
                  background: 'rgba(102, 126, 234, 0.1)',
                  border: '1px solid rgba(102, 126, 234, 0.3)',
                  color: '#667eea',
                  padding: '12px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                🚀 Ver Convite
              </button>
              
              <button
                onClick={() => onEdit(convite)}
                style={{
                  background: 'rgba(34, 197, 94, 0.1)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  color: '#22c55e',
                  padding: '12px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  minWidth: '80px'
                }}
              >
                ✏️ Editar
              </button>
              
              <button
                onClick={() => handleDeleteClick(convite)}
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#ef4444',
                  padding: '12px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  minWidth: '80px'
                }}
              >
                🗑️ Excluir
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de confirmação de exclusão */}
      {showDeleteModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '16px'
        }}>
          <div style={{
            background: '#1a1a1a',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '500px',
            width: '100%',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h3 style={{ 
              fontSize: '24px', 
              fontWeight: 700, 
              marginBottom: '16px',
              color: '#ef4444'
            }}>
              ⚠️ Confirmar Exclusão
            </h3>
            
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.8)', 
              marginBottom: '8px',
              lineHeight: 1.5
            }}>
              Tem certeza que deseja excluir o convite:
            </p>
            
            <p style={{ 
              color: 'white', 
              fontWeight: 600,
              marginBottom: '16px',
              fontSize: '18px'
            }}>
              "{conviteParaExcluir?.nome_festa}"
            </p>
            
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '24px'
            }}>
              <p style={{ 
                color: '#ef4444', 
                fontSize: '14px',
                margin: 0,
                lineHeight: 1.5
              }}>
                <strong>Atenção:</strong> Esta ação não pode ser desfeita. O convite será removido permanentemente, mas os dados analytics (visualizações e confirmações) serão preservados no histórico.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleCancelDelete}
                disabled={excluindo}
                style={{
                  flex: 1,
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: excluindo ? 'not-allowed' : 'pointer'
                }}
              >
                Cancelar
              </button>
              
              <button
                onClick={handleConfirmDelete}
                disabled={excluindo}
                style={{
                  flex: 1,
                  background: excluindo ? 'rgba(239, 68, 68, 0.5)' : '#ef4444',
                  border: 'none',
                  color: 'white',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: excluindo ? 'not-allowed' : 'pointer'
                }}
              >
                {excluindo ? 'Excluindo...' : '🗑️ Excluir Definitivamente'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}