import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function AdminModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Preencha email e senha')
      setTimeout(() => setError(''), 3000)
      return
    }

    setLoading(true)
    setError('')

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      })

      if (error) {
        console.error('Erro de login:', error.message)
        setError('Email ou senha incorretos')
        setTimeout(() => setError(''), 3000)
        return
      }

      if (data.user) {
        window.location.href = '/admin'
      }
    } catch (err) {
      console.error('Erro:', err)
      setError('Erro ao fazer login. Tente novamente.')
      setTimeout(() => setError(''), 3000)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

  if (!isOpen) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px',
      backdropFilter: 'blur(20px)',
      animation: 'fadeIn 0.3s ease-out'
    }}>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translate(-50%, -40%) scale(0.9);
          }
          to { 
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
        
        .modal-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.1) 0%, 
            rgba(255, 255, 255, 0.05) 100%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 40px;
          width: 100%;
          max-width: 440px;
          backdrop-filter: blur(40px);
          box-shadow: 
            0 25px 50px -12px rgba(0, 0, 0, 0.5),
            0 0 0 1px rgba(255, 255, 255, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .close-button {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          color: rgba(255, 255, 255, 0.6);
          font-size: 18px;
          font-weight: 300;
        }
        
        .close-button:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.2);
          color: rgba(255, 255, 255, 0.9);
          transform: translateY(-1px);
        }
        
        .logo-area {
          text-align: center;
          margin-bottom: 32px;
        }
        
        .logo-icon {
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          color: white;
          font-size: 24px;
          font-weight: 600;
          box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
        }
        
        .title {
          font-size: 28px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 8px 0;
          letter-spacing: -0.5px;
        }
        
        .subtitle {
          font-size: 15px;
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
          font-weight: 400;
        }
        
        .input-group {
          margin-bottom: 24px;
        }
        
        .input-label {
          display: block;
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          letter-spacing: 0.5px;
        }
        
        .input-field {
          width: 100%;
          padding: 16px 20px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 16px;
          color: #fff;
          font-size: 16px;
          font-weight: 500;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          outline: none;
          backdrop-filter: blur(10px);
        }
        
        .input-field::placeholder {
          color: rgba(255, 255, 255, 0.4);
          font-weight: 400;
        }
        
        .input-field:focus {
          border-color: rgba(102, 126, 234, 0.6);
          background: rgba(255, 255, 255, 0.12);
          box-shadow: 
            0 0 0 4px rgba(102, 126, 234, 0.1),
            0 8px 32px rgba(102, 126, 234, 0.2);
          transform: translateY(-1px);
        }
        
        .error-message {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: 12px;
          padding: 16px 20px;
          color: #ef4444;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 24px;
          text-align: center;
          backdrop-filter: blur(10px);
        }
        
        .login-button {
          width: 100%;
          padding: 18px 24px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 16px;
          color: white;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          letter-spacing: 0.5px;
          box-shadow: 
            0 8px 32px rgba(102, 126, 234, 0.3),
            0 1px 0 rgba(255, 255, 255, 0.1) inset;
        }
        
        .login-button:not(:disabled):hover {
          transform: translateY(-2px);
          box-shadow: 
            0 12px 40px rgba(102, 126, 234, 0.4),
            0 1px 0 rgba(255, 255, 255, 0.1) inset;
        }
        
        .login-button:not(:disabled):active {
          transform: translateY(0);
        }
        
        .login-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }
        
        .footer-text {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.5);
          text-align: center;
          margin-top: 24px;
          font-weight: 400;
        }
        
        .loading-spinner {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top: 2px solid white;
          animation: spin 1s linear infinite;
          margin-right: 8px;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      
      <div className="modal-container">
        <button
          className="close-button"
          onClick={() => {
            onClose()
            setEmail('')
            setPassword('')
            setError('')
          }}
        >
          ×
        </button>

        <div className="logo-area">
          <div className="logo-icon">A</div>
          <h3 className="title">Acesso Admin</h3>
          <p className="subtitle">Entre com suas credenciais de administrador</p>
        </div>

        <div className="input-group">
          <label className="input-label">EMAIL</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="seu@email.com"
            className="input-field"
          />
        </div>

        <div className="input-group">
          <label className="input-label">SENHA</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="••••••••••"
            className="input-field"
          />
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="login-button"
        >
          {loading && <span className="loading-spinner"></span>}
          {loading ? 'Autenticando...' : 'Acessar Painel'}
        </button>

        <p className="footer-text">
          Acesso restrito • Apenas administradores autorizados
        </p>
      </div>
    </div>
  )
}