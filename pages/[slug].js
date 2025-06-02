import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabase';
import ConviteFechado from '../components/Convite/ConviteFechado';
import ConviteAberto from '../components/Convite/ConviteAberto';

export default function ConvitePage() {
  const router = useRouter();
  const { slug } = router.query;
  const [convite, setConvite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [conviteAberto, setConviteAberto] = useState(false);

  useEffect(() => {
    if (slug && typeof slug === 'string') {
      buscarConvite();
    }
  }, [slug]);

  const buscarConvite = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('convites')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error || !data) {
        setError('Convite não encontrado');
        return;
      }

      setConvite(data);
    } catch (err) {
      setError('Erro ao carregar convite');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#0a0a0a',
        color: '#fff'
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
          <p>Carregando convite...</p>
        </div>
      </div>
    );
  }

  if (error || !convite) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#0a0a0a',
        color: '#fff'
      }}>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>😔</h1>
          <h2 style={{ marginBottom: '16px' }}>Ops!</h2>
          <p style={{ marginBottom: '24px', color: 'rgba(255,255,255,0.7)' }}>
            {error}
          </p>
          <button 
            onClick={() => router.push('/')}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      {conviteAberto ? (
        <ConviteAberto convite={convite} />
      ) : (
        <ConviteFechado convite={convite} onAbrir={() => setConviteAberto(true)} />
      )}
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}