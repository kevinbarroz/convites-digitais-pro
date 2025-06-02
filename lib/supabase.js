import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mrzwrfeyuesnlviwnkhz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yendyZmV5dWVzbmx2aXdua2h6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4MDUxMDcsImV4cCI6MjA2NDM4MTEwN30.5jX9gMP1CxO1AmfekD9Fq6J19QAHqmex6_AXp3DXNgw'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Função para testar conexão
export const testConnection = async () => {
  try {
    const { data, error } = await supabase.from('convites').select('count').limit(1)
    if (error) throw error
    return true
  } catch (error) {
    throw new Error('Erro na conexão: ' + error.message)
  }
}

// Função para analytics
export const trackEvent = async (tipo, conviteId = null, slug = null) => {
  try {
    await supabase.from('analytics').insert({
      tipo,
      convite_id: conviteId,
      slug,
      created_at: new Date().toISOString()
    })
  } catch (error) {
    console.error('Erro ao rastrear evento:', error)
  }
}
