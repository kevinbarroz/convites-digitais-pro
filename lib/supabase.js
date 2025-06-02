import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mrzwrfeyuesnlviwnkhz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yendyZmV5dWVzbmx2aXdua2h6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4MDUxMDcsImV4cCI6MjA2NDM4MTEwN30.5jX9gMP1CxO1AmfekD9Fq6J19QAHqmex6_AXp3DXNgw'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Criar convite
export const criarConvite = async (dados) => {
  try {
    // Validar dados obrigatórios
    const camposObrigatorios = ['nomeFesta', 'dataEvento', 'horaEvento', 'localizacaoNome', 'slug']
    const camposFaltando = camposObrigatorios.filter(campo => !dados[campo] || dados[campo].trim() === '')
    
    if (camposFaltando.length > 0) {
      throw new Error(`Campos obrigatórios não preenchidos: ${camposFaltando.join(', ')}`)
    }

    // Combinar data e hora
    const dataHora = `${dados.dataEvento}T${dados.horaEvento}:00`
    
    // Processar URL de redirecionamento
    const redirectUrl = dados.redirectUrl && dados.redirectUrl.trim() ? dados.redirectUrl.trim() : null
    
    // Preparar dados para inserção
    const conviteData = {
      nome_festa: dados.nomeFesta.trim(),
      titulo: dados.nomeFesta.trim(),
      data_evento: dataHora,
      hora_evento: dados.horaEvento.trim(),
      localizacao_nome: dados.localizacaoNome.trim(),
      endereco: dados.localizacaoMapsUrl?.trim() || null,
      slug: dados.slug.trim(),
      redirect_url: redirectUrl,
      background_mobile_url: dados.backgroundMobile || null,
      background_desktop_url: dados.backgroundDesktop || null,
      background_mobile_aberto_url: dados.backgroundMobileAberto || null,
      background_desktop_aberto_url: dados.backgroundDesktopAberto || null,
      visualizacoes: 0,
      confirmacoes: 0,
      criado_em: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('convites')
      .insert([conviteData])
      .select()

    if (error) throw error
    
    return data[0]
  } catch (error) {
    console.error('Erro ao criar convite:', error)
    throw error
  }
}

// Editar convite
export const editarConvite = async (id, dados) => {
  try {
    // Validar dados obrigatórios
    const camposObrigatorios = ['nomeFesta', 'dataEvento', 'horaEvento', 'localizacaoNome', 'slug']
    const camposFaltando = camposObrigatorios.filter(campo => !dados[campo] || dados[campo].trim() === '')
    
    if (camposFaltando.length > 0) {
      throw new Error(`Campos obrigatórios não preenchidos: ${camposFaltando.join(', ')}`)
    }

    // Combinar data e hora
    const dataHora = `${dados.dataEvento}T${dados.horaEvento}:00`
    
    // Processar URL de redirecionamento
    const redirectUrl = dados.redirectUrl && dados.redirectUrl.trim() ? dados.redirectUrl.trim() : null
    
    // Preparar dados para atualização
    const conviteData = {
      nome_festa: dados.nomeFesta.trim(),
      titulo: dados.nomeFesta.trim(),
      data_evento: dataHora,
      hora_evento: dados.horaEvento.trim(),
      localizacao_nome: dados.localizacaoNome.trim(),
      endereco: dados.localizacaoMapsUrl?.trim() || null,
      slug: dados.slug.trim(),
      redirect_url: redirectUrl,
      background_mobile_url: dados.backgroundMobile || null,
      background_desktop_url: dados.backgroundDesktop || null,
      background_mobile_aberto_url: dados.backgroundMobileAberto || null,
      background_desktop_aberto_url: dados.backgroundDesktopAberto || null,
      atualizado_em: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('convites')
      .update(conviteData)
      .eq('id', id)
      .select()

    if (error) throw error
    
    return data[0]
  } catch (error) {
    console.error('Erro ao editar convite:', error)
    throw error
  }
}

// Excluir convite (soft delete - preserva analytics)
export const excluirConvite = async (id) => {
  try {
    // 1. Buscar dados do convite antes de excluir
    const { data: convite, error: errorBusca } = await supabase
      .from('convites')
      .select('*')
      .eq('id', id)
      .single()

    if (errorBusca) throw errorBusca

    // 2. Criar backup na tabela convites_excluidos (preservando analytics)
    const conviteBackup = {
      convite_id_original: convite.id,
      nome_festa: convite.nome_festa,
      slug: convite.slug,
      data_evento: convite.data_evento,
      localizacao_nome: convite.localizacao_nome,
      visualizacoes: convite.visualizacoes || 0,
      confirmacoes: convite.confirmacoes || 0,
      criado_em: convite.criado_em,
      excluido_em: new Date().toISOString(),
      // Removemos as imagens para economizar espaço
      motivo_exclusao: 'Excluído pelo administrador'
    }

    const { error: errorBackup } = await supabase
      .from('convites_excluidos')
      .insert([conviteBackup])

    if (errorBackup) {
      console.error('Erro ao criar backup, mas continuando com exclusão:', errorBackup)
    }

    // 3. Excluir o convite da tabela principal
    const { error: errorExclusao } = await supabase
      .from('convites')
      .delete()
      .eq('id', id)

    if (errorExclusao) throw errorExclusao

    return { success: true, message: 'Convite excluído com sucesso. Analytics preservados no histórico.' }
  } catch (error) {
    console.error('Erro ao excluir convite:', error)
    throw error
  }
}

// Buscar convite por slug
export const buscarConvitePorSlug = async (slug) => {
  try {
    const { data, error } = await supabase
      .from('convites')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Erro ao buscar convite:', error)
    throw error
  }
}

// Confirmar presença
export const confirmarPresenca = async (conviteId, nome, telefone) => {
  try {
    // Inserir confirmação
    const { error: errorConfirmacao } = await supabase
      .from('confirmacoes')
      .insert([{
        convite_id: conviteId,
        nome: nome.trim(),
        telefone: telefone.trim(),
        criado_em: new Date().toISOString()
      }])

    if (errorConfirmacao) throw errorConfirmacao

    // Incrementar contador de confirmações
    const { data: conviteAtual, error: errorBusca } = await supabase
      .from('convites')
      .select('confirmacoes')
      .eq('id', conviteId)
      .single()

    if (errorBusca) throw errorBusca

    const novoContador = (conviteAtual.confirmacoes || 0) + 1

    const { error: errorUpdate } = await supabase
      .from('convites')
      .update({ confirmacoes: novoContador })
      .eq('id', conviteId)

    if (errorUpdate) throw errorUpdate

    return { success: true }
  } catch (error) {
    console.error('Erro ao confirmar presença:', error)
    throw error
  }
}

// Incrementar visualizações
export const incrementarVisualizacoes = async (conviteId) => {
  try {
    const { data: conviteAtual, error: errorBusca } = await supabase
      .from('convites')
      .select('visualizacoes')
      .eq('id', conviteId)
      .single()

    if (errorBusca) throw errorBusca

    const novasVisualizacoes = (conviteAtual.visualizacoes || 0) + 1

    const { error: errorUpdate } = await supabase
      .from('convites')
      .update({ visualizacoes: novasVisualizacoes })
      .eq('id', conviteId)

    if (errorUpdate) throw errorUpdate

    return { success: true }
  } catch (error) {
    console.error('Erro ao incrementar visualizações:', error)
    throw error
  }
}

// Buscar dados para analytics
export const buscarDadosAnalytics = async () => {
  try {
    // Buscar convites ativos
    const { data: convitesAtivos, error: errorConvites } = await supabase
      .from('convites')
      .select('*')
      .order('criado_em', { ascending: false })

    if (errorConvites) throw errorConvites

    // Buscar confirmações com dados do convite
    const { data: confirmacoes, error: errorConfirmacoes } = await supabase
      .from('confirmacoes')
      .select(`
        *,
        convites:convite_id (
          nome_festa,
          slug
        )
      `)
      .order('criado_em', { ascending: false })

    if (errorConfirmacoes) throw errorConfirmacoes

    // Buscar convites excluídos
    const { data: convitesExcluidos, error: errorExcluidos } = await supabase
      .from('convites_excluidos')
      .select('*')
      .order('excluido_em', { ascending: false })
      .limit(50)

    return {
      convitesAtivos: convitesAtivos || [],
      confirmacoes: confirmacoes || [],
      convitesExcluidos: convitesExcluidos || []
    }
  } catch (error) {
    console.error('Erro ao buscar dados analytics:', error)
    throw error
  }
}

// Testar conexão
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