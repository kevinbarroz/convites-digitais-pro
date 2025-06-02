import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function ConfirmarPresencaModal({ convite, onClose }) {
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!nome.trim() || !whatsapp.trim()) {
      alert('Por favor, preencha nome e WhatsApp');
      return;
    }

    setLoading(true);

    try {
      // Inserir confirmação diretamente
      const { error } = await supabase
        .from('confirmacoes')
        .insert([{
          convite_id: convite.id,
          nome: nome.trim(),
          telefone: whatsapp.trim()
        }]);

      if (error) {
        console.error('Erro ao confirmar presença:', error);
        alert('Erro ao confirmar presença. Tente novamente.');
        setLoading(false);
        return;
      }

      // Buscar confirmações atuais e atualizar contador
      const { count } = await supabase
        .from('confirmacoes')
        .select('*', { count: 'exact', head: true })
        .eq('convite_id', convite.id);

      // Atualizar contador no convite
      await supabase
        .from('convites')
        .update({ confirmacoes: count || 0 })
        .eq('id', convite.id);

      setSucesso(true);
      
      setTimeout(async () => {
        onClose();
        
        // BUSCAR CONVITE ATUALIZADO DO BANCO
        console.log('🔄 Buscando convite atualizado do banco...');
        const { data: conviteAtualizado, error: errorBusca } = await supabase
          .from('convites')
          .select('*')
          .eq('id', convite.id)
          .single();
        
        if (errorBusca) {
          console.error('Erro ao buscar convite atualizado:', errorBusca);
          return;
        }
        
        console.log('✅ Convite atualizado do banco:', conviteAtualizado);
        console.log('🔗 redirect_url do banco:', conviteAtualizado.redirect_url);
        
        // Redirecionamento com dados atualizados
        if (conviteAtualizado.redirect_url && conviteAtualizado.redirect_url.trim()) {
          const url = conviteAtualizado.redirect_url.trim();
          console.log('🚀 REDIRECIONANDO PARA:', url);
          window.open(url, '_blank');
        } else {
          console.log('❌ URL ainda está null no banco');
        }
      }, 2000);

    } catch (err) {
      console.error('Erro geral:', err);
      alert('Erro ao confirmar presença. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (sucesso) {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        padding: '16px',
        animation: 'fadeIn 0.3s ease-out'
      }}>
        <div style={{
          background: 'rgba(20, 20, 20, 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '16px',
          padding: '40px',
          maxWidth: '400px',
          width: '100%',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          textAlign: 'center',
          animation: 'slideUp 0.4s ease-out'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
          <h2 style={{ 
            color: '#22c55e', 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            marginBottom: '1rem',
            margin: 0
          }}>
            Presença Confirmada!
          </h2>
          <p style={{ 
            color: 'rgba(255, 255, 255, 0.7)',
            lineHeight: 1.5,
            margin: 0
          }}>
            Obrigado por confirmar sua presença. Estamos ansiosos para te ver no evento!
          </p>
          {convite.redirect_url && (
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: '14px',
              marginTop: '16px',
              margin: '16px 0 0 0'
            }}>
              Redirecionando...
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
      padding: '16px',
      animation: 'fadeIn 0.3s ease-out'
    }}>
      <div style={{
        background: 'rgba(20, 20, 20, 0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '16px',
        padding: '32px',
        maxWidth: '450px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        animation: 'slideUp 0.4s ease-out'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: 'white',
            margin: 0
          }}>
            Confirmar Presença
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '1.5rem',
              cursor: 'pointer',
              transition: 'color 0.2s ease',
              padding: '4px',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '4px'
            }}
            onMouseEnter={(e) => e.target.style.color = 'white'}
            onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '500',
              color: 'rgba(255, 255, 255, 0.8)'
            }}>
              Nome Completo *
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome completo"
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                fontSize: '16px',
                color: '#fff',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                e.target.style.background = 'rgba(255, 255, 255, 0.08)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
              }}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '500',
              color: 'rgba(255, 255, 255, 0.8)'
            }}>
              WhatsApp *
            </label>
            <input
              type="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="(11) 99999-9999"
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                fontSize: '16px',
                color: '#fff',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                e.target.style.background = 'rgba(255, 255, 255, 0.08)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '12px 16px',
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'rgba(255, 255, 255, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                e.target.style.color = 'rgba(255, 255, 255, 0.7)';
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 1,
                padding: '12px 16px',
                background: loading ? 'rgba(255, 255, 255, 0.2)' : 'white',
                color: loading ? 'rgba(255, 255, 255, 0.5)' : '#000',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.background = 'white';
                }
              }}
            >
              {loading ? 'Confirmando...' : 'Confirmar Presença'}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}