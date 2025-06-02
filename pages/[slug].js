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

      if (error) {
        console.error('Erro ao buscar convite:', error);
        setError('Convite não encontrado');
        return;
      }

      if (!data) {
        setError('Convite não encontrado');
        return;
      }

      setConvite(data);
    } catch (err) {
      console.error('Erro:', err);
      setError('Erro ao carregar convite');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Carregando convite...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-pink-100">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Ops! 😔</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => router.push('/')}
            className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    );
  }

  if (!convite) {
    return null;
  }

  return (
    <div className="min-h-screen">
      {conviteAberto ? (
        <ConviteAberto convite={convite} />
      ) : (
        <ConviteFechado convite={convite} onAbrir={() => setConviteAberto(true)} />
      )}
    </div>
  );
}

// Removemos o getServerSideProps para evitar problemas de hidratação