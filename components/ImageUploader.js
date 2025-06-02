import { useState } from 'react'

export default function ImageUploader({ 
  label, 
  onImageSelect, 
  currentImage, 
  required = false 
}) {
  const [preview, setPreview] = useState(currentImage || null)
  const [uploading, setUploading] = useState(false)

  const handleFileSelect = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validação
    if (file.size > 10 * 1024 * 1024) {
      alert('Imagem muito grande. Máximo 10MB.')
      return
    }

    if (!file.type.startsWith('image/')) {
      alert('Selecione apenas imagens.')
      return
    }

    setUploading(true)

    try {
      // Converter para base64
      const reader = new FileReader()
      reader.onload = function(event) {
        const imageUrl = event.target.result
        setPreview(imageUrl)
        onImageSelect(imageUrl)
        setUploading(false)
      }
      
      reader.onerror = function(error) {
        console.error('Erro ao ler arquivo:', error)
        setUploading(false)
      }
      
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('Erro ao processar imagem:', error)
      setUploading(false)
    }
  }

  return (
    <div style={{ marginBottom: '24px' }}>
      <label style={{
        display: 'block',
        marginBottom: '8px',
        fontSize: '14px',
        fontWeight: 500,
        color: 'rgba(255, 255, 255, 0.8)'
      }}>
        {label} {required && '*'}
      </label>
      
      <div style={{
        border: '2px dashed rgba(255, 255, 255, 0.2)',
        borderRadius: '12px',
        padding: '24px',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        background: preview ? 'rgba(255, 255, 255, 0.05)' : 'transparent'
      }}
      onClick={() => document.getElementById(`upload-${label.replace(/\s+/g, '-')}`).click()}
      >
        {preview ? (
          <div>
            <img 
              src={preview} 
              alt="Preview" 
              style={{
                maxWidth: '200px',
                maxHeight: '120px',
                borderRadius: '8px',
                marginBottom: '12px',
                objectFit: 'cover'
              }}
            />
            <p style={{ 
              fontSize: '14px', 
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: '8px'
            }}>
              Clique para alterar a imagem
            </p>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>📸</div>
            <p style={{ 
              fontSize: '16px', 
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '8px'
            }}>
              {uploading ? 'Processando...' : 'Clique para selecionar imagem'}
            </p>
            <p style={{ 
              fontSize: '12px', 
              color: 'rgba(255, 255, 255, 0.5)' 
            }}>
              JPG, PNG ou GIF • Máximo 10MB
            </p>
          </div>
        )}
        
        <input
          id={`upload-${label.replace(/\s+/g, '-')}`}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  )
}