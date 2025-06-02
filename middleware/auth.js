import { supabase } from '../lib/supabase'

export const checkAuth = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error) {
      console.error('Erro ao verificar sessão:', error)
      return { authenticated: false, user: null }
    }

    if (session && session.user) {
      return { authenticated: true, user: session.user }
    }

    return { authenticated: false, user: null }
  } catch (err) {
    console.error('Erro na verificação de auth:', err)
    return { authenticated: false, user: null }
  }
}

export const redirectIfNotAuthenticated = async () => {
  const { authenticated } = await checkAuth()
  
  if (!authenticated) {
    if (typeof window !== 'undefined') {
      window.location.href = '/'
    }
    return false
  }
  
  return true
}