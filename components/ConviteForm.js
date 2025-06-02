import { useState } from 'react'

export default function ConviteForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    titulo: '',
    dataEvento: '',
    local: '',
    descricao: '',
    organizador: '',
    whatsapp: '',
    cor: 'roxo',
    fonte: 'elegante'
  })

  const [selectedImages, setSelectedImages] = useState([])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageSelection = (e) => {
    const files = Array.from(e.target.files)
    
    files.forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        alert(`Imagem ${file.name} é muito grande. Máximo 5MB.`)
        return
      }

      const reader = new FileReader()
      reader.onload = function(event) {
        setSelectedImages(prev => [...prev, {
          file: file,
          url: event.target.result,
          name: file.name
        }])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const imagensBase64 = selectedImages.map(img => img.url)
    onSubmit({ ...formData, imagens: imagensBase64 })
    
    // Limpar formulário
    setFormData({
      titulo: '',
      dataEvento: '',
      local: '',
      descricao: '',
      organizador: '',
      whatsapp: '',
      cor: 'roxo',
      fonte: 'elegante'
    })
    setSelectedImages([])
  }

  const cores = [
    { name: 'roxo', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { name: 'rosa', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { name: 'azul', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
    { name: 'verde', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    { name: 'laranja', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
    { name: 'pastel', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' }
  ]

  const fontes = [
    { name: 'elegante', label: 'Fonte Elegante', desc: 'Para eventos formais e sofisticados', font: 'Times New Roman, serif' },
    { name: 'moderna', label: 'Fonte Moderna', desc: 'Para eventos casuais e contemporâneos', font: 'Arial, sans-serif' },
    { name: 'divertida', label: 'Fonte Divertida', desc: 'Para festas infantis e eventos descontraídos', font: 'Comic Sans MS, cursive' }
  ]

  return (
    <div>
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
          <span style={{ fontSize: '2rem', marginRight: '12px' }}>📝</span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Informações do Evento</h2>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <div className="form-group">
              <label>Título do Evento</label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleInputChange}
                placeholder="Ex: Aniversário da Maria"
                required
              />
            </div>

            <div className="form-group">
              <label>Data e Hora</label>
              <input
                type="datetime-local"
                name="dataEvento"
                value={formData.dataEvento}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Local do Evento</label>
            <input
              type="text"
              name="local"
              value={formData.local}
              onChange={handleInputChange}
              placeholder="Ex: Salão de Festas do Condomínio"
              required
            />
          </div>

          <div className="form-group">
            <label>Descrição</label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleInputChange}
              rows={4}
              placeholder="Detalhes sobre o evento, dresscode, observações..."
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <div className="form-group">
              <label>Organizador</label>
              <input
                type="text"
                name="organizador"
                value={formData.organizador}
                onChange={handleInputChange}
                placeholder="Seu nome"
                required
              />
            </div>

            <div className="form-group">
              <label>WhatsApp (opcional)</label>
              <input
                type="tel"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleInputChange}
                placeholder="(11) 99999-9999"
              />
            </div>
          </div>
        </form>
      </div>

      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
          <span style={{ fontSize: '2rem', marginRight: '12px' }}>🎨</span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Personalização Visual</h2>
        </div>
        
        <div className="form-group">
          <label>Tema de Cores</label>
          <div className="color-grid">
            {cores.map(cor => (
              <div
                key={cor.name}
                onClick={() => setFormData(prev => ({ ...prev, cor: cor.name }))}
                className={`color-option ${formData.cor === cor.name ? 'selected' : ''}`}
                style={{ background: cor.gradient }}
              />
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Estilo da Fonte</label>
          {fontes.map(fonte => (
            <div
              key={fonte.name}
              onClick={() => setFormData(prev => ({ ...prev, fonte: fonte.name }))}
              className={`font-preview ${formData.fonte === fonte.name ? 'selected' : ''}`}
              style={{ fontFamily: fonte.font }}
            >
              <div style={{ fontWeight: 600, marginBottom: '4px' }}>{fonte.label}</div>
              <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)' }}>{fonte.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
          <span style={{ fontSize: '2rem', marginRight: '12px' }}>📸</span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Imagens do Convite</h2>
        </div>
        
        <div
          className="file-upload"
          onClick={() => document.getElementById('imageInput').click()}
        >
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📤</div>
          <p style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>
            Clique para adicionar imagens
          </p>
          <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)' }}>
            Formatos aceitos: JPG, PNG, GIF • Máximo 5MB por imagem
          </p>
          <input
            type="file"
            id="imageInput"
            multiple
            accept="image/*"
            onChange={handleImageSelection}
            style={{ display: 'none' }}
          />
        </div>
        
        {selectedImages.length > 0 && (
          <div className="preview-grid">
            {selectedImages.map((image, index) => (
              <div key={index} className="preview-item">
                <img src={image.url} alt={image.name} />
                <button
                  className="remove-btn"
                  onClick={() => removeImage(index)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Criando seu convite...</p>
        </div>
      )}

      <button 
        onClick={handleSubmit}
        disabled={loading}
        className="btn"
        style={{ fontSize: '18px', padding: '20px' }}
      >
        🎉 Criar Convite Digital
      </button>
    </div>
  )
}
