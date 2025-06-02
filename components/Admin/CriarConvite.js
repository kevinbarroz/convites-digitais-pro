import { useState, useEffect } from 'react'
import ImageUploader from '../ImageUploader'

export default function CriarConvite({ onSubmit, loading, message, editingConvite, onCancelEdit }) {
  const [formData, setFormData] = useState({
    nomeFesta: '',
    dataEvento: '',
    horaEvento: '',
    localizacaoNome: '',
    localizacaoMapsUrl: '',
    slug: '',
    redirectUrl: '',
    backgroundMobile: '',
    backgroundDesktop: '',
    backgroundMobileAberto: '',
    backgroundDesktopAberto: ''
  })

  // Preencher formulário quando for edição
  useEffect(() => {
    if (editingConvite && editingConvite.dadosParaEdicao) {
      setFormData(editingConvite.dadosParaEdicao)
    } else if (!editingConvite) {
      // Limpar formulário quando não estiver editando
      setFormData({
        nomeFesta: '',
        dataEvento: '',
        horaEvento: '',
        localizacaoNome: '',
        localizacaoMapsUrl: '',
        slug: '',
        redirectUrl: '',
        backgroundMobile: '',
        backgroundDesktop: '',
        backgroundMobileAberto: '',
        backgroundDesktopAberto: ''
      })
    }
  }, [editingConvite])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Auto-gerar slug baseado no nome da festa (apenas se não for edição)
    if (name === 'nomeFesta' && !editingConvite) {
      const slug = value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .trim()
      setFormData(prev => ({ ...prev, slug }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validação
    if (!formData.nomeFesta || !formData.dataEvento || !formData.horaEvento || 
        !formData.localizacaoNome || !formData.slug) {
      alert('Preencha todos os campos obrigatórios')
      return
    }
    
    // Enviar dados
    await onSubmit(formData)
    
    // Limpar formulário após sucesso (apenas se não for edição)
    if (!loading && !editingConvite) {
      setFormData({
        nomeFesta: '',
        dataEvento: '',
        horaEvento: '',
        localizacaoNome: '',
        localizacaoMapsUrl: '',
        slug: '',
        redirectUrl: '',
        backgroundMobile: '',
        backgroundDesktop: '',
        backgroundMobileAberto: '',
        backgroundDesktopAberto: ''
      })
    }
  }

  const isEditing = !!editingConvite

  return (
    <div>
      <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '32px', color: '#fff' }}>
        {isEditing ? '✏️ Editar Convite' : 'Criar Novo Convite'}
      </h2>

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

      <form onSubmit={handleSubmit} style={{
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '32px',
        maxWidth: '1000px'
      }}>
        {/* Informações básicas */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: 500,
              color: 'rgba(255, 255, 255, 0.8)'
            }}>
              Nome da Festa *
            </label>
            <input
              type="text"
              name="nomeFesta"
              value={formData.nomeFesta}
              onChange={handleInputChange}
              placeholder="Ex: Aniversário da Ana Maria"
              required
              style={{
                width: '100%',
                padding: '16px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '16px'
              }}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: 500,
              color: 'rgba(255, 255, 255, 0.8)'
            }}>
              Slug do Convite *
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
              placeholder="ana-maria"
              required
              disabled={isEditing} // Não permitir alterar slug na edição
              style={{
                width: '100%',
                padding: '16px',
                background: isEditing ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: isEditing ? 'rgba(255, 255, 255, 0.5)' : '#fff',
                fontSize: '16px'
              }}
            />
            <small style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px' }}>
              URL: /{formData.slug}
              {isEditing && <span style={{ color: '#f59e0b' }}> (não pode ser alterado)</span>}
            </small>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: 500,
              color: 'rgba(255, 255, 255, 0.8)'
            }}>
              Data do Evento *
            </label>
            <input
              type="date"
              name="dataEvento"
              value={formData.dataEvento}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '16px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '16px'
              }}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: 500,
              color: 'rgba(255, 255, 255, 0.8)'
            }}>
              Hora do Evento *
            </label>
            <input
              type="time"
              name="horaEvento"
              value={formData.horaEvento}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '16px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '16px'
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: '14px',
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.8)'
          }}>
            Local do Evento *
          </label>
          <input
            type="text"
            name="localizacaoNome"
            value={formData.localizacaoNome}
            onChange={handleInputChange}
            placeholder="Ex: Salão de Festas Villa Real"
            required
            style={{
              width: '100%',
              padding: '16px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '16px'
            }}
          />
        </div>

        <div style={{ marginBottom: '32px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: '14px',
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.8)'
          }}>
            Link do Google Maps
          </label>
          <input
            type="url"
            name="localizacaoMapsUrl"
            value={formData.localizacaoMapsUrl}
            onChange={handleInputChange}
            placeholder="https://maps.google.com/..."
            style={{
              width: '100%',
              padding: '16px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '16px'
            }}
          />
        </div>

        <div style={{ marginBottom: '40px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: '14px',
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.8)'
          }}>
            URL de Redirecionamento (após confirmar presença)
          </label>
          <input
            type="url"
            name="redirectUrl"
            value={formData.redirectUrl}
            onChange={handleInputChange}
            placeholder="https://wa.me/5543996284678?text=Confirmei presença!"
            style={{
              width: '100%',
              padding: '16px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '16px'
            }}
          />
          <small style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px' }}>
            Esta URL será aberta após confirmar presença no evento
          </small>
        </div>

        {/* Seção de Upload de Imagens */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: '32px',
          marginBottom: '32px'
        }}>
          <h3 style={{ 
            fontSize: '20px', 
            fontWeight: 600, 
            marginBottom: '24px',
            color: '#667eea'
          }}>
            📸 Backgrounds do Convite
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px'
          }}>
            <ImageUploader
              label="Background Mobile - Convite Fechado"
              onImageSelect={(url) => setFormData(prev => ({ ...prev, backgroundMobile: url }))}
              currentImage={formData.backgroundMobile}
            />

            <ImageUploader
              label="Background Desktop - Convite Fechado"
              onImageSelect={(url) => setFormData(prev => ({ ...prev, backgroundDesktop: url }))}
              currentImage={formData.backgroundDesktop}
            />

            <ImageUploader
              label="Background Mobile - Convite Aberto"
              onImageSelect={(url) => setFormData(prev => ({ ...prev, backgroundMobileAberto: url }))}
              currentImage={formData.backgroundMobileAberto}
            />

            <ImageUploader
              label="Background Desktop - Convite Aberto"
              onImageSelect={(url) => setFormData(prev => ({ ...prev, backgroundDesktopAberto: url }))}
              currentImage={formData.backgroundDesktopAberto}
            />
          </div>
        </div>

        {/* Botões */}
        <div style={{ display: 'flex', gap: '16px' }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              flex: 1,
              background: loading ? 'rgba(102, 126, 234, 0.5)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              color: '#fff',
              padding: '16px 32px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {loading 
              ? (isEditing ? 'Salvando...' : 'Criando...') 
              : (isEditing ? '💾 Salvar Alterações' : '🎉 Criar Convite')
            }
          </button>
          
          {isEditing && onCancelEdit && (
            <button
              type="button"
              onClick={onCancelEdit}
              disabled={loading}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#fff',
                padding: '16px 24px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 500,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s'
              }}
            >
              ❌ Cancelar Edição
            </button>
          )}
        </div>
      </form>
    </div>
  )
}