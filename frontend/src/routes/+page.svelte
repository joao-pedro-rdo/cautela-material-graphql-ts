<script lang="ts">
  import { onMount } from 'svelte';
  import { client, GET_CAUTELAS, CREATE_CAUTELA, DEVOLVER_CAUTELA } from '$lib/graphql';

  // Tipos TypeScript
  interface Cautela {
    id: string;
    nomeCautelador: string;
    contatoCautelador: string;
    deOnde: string;
    motivoCautela: string;
    dataHoraCautela: string;
    previsaoRetorno: string;
    cauteladorResponsavel: string;
    devolvido: boolean;
    dataHoraDevolucao?: string;
    observacoes?: string;
  }

  // Estados reativos do Svelte
  let cautelas: Cautela[] = [];
  let loading = true;
  let showForm = false;
  let error = '';

  // Dados do formulário
  let formData = {
    nomeCautelador: '',
    contatoCautelador: '',
    deOnde: '',
    motivoCautela: '',
    previsaoRetorno: '',
    cauteladorResponsavel: '',
    observacoes: ''
  };

  // Função para buscar cautelas
  async function loadCautelas() {
    try {
      loading = true;
      error = '';
      const data = await client.request(GET_CAUTELAS);
      cautelas = data.cautelas;
    } catch (err) {
      console.error('Erro ao carregar cautelas:', err);
      error = 'Erro ao carregar cautelas. Verifique se o backend está rodando.';
    } finally {
      loading = false;
    }
  }

  // Função para criar nova cautela
  async function createCautela() {
    try {
      error = '';
      const variables = {
        input: {
          ...formData,
          previsaoRetorno: new Date(formData.previsaoRetorno).toISOString()
        }
      };
      
      await client.request(CREATE_CAUTELA, variables);
      
      // Limpar formulário e recarregar dados
      formData = {
        nomeCautelador: '',
        contatoCautelador: '',
        deOnde: '',
        motivoCautela: '',
        previsaoRetorno: '',
        cauteladorResponsavel: '',
        observacoes: ''
      };
      showForm = false;
      await loadCautelas();
    } catch (err) {
      console.error('Erro ao criar cautela:', err);
      error = 'Erro ao criar cautela. Verifique os dados e tente novamente.';
    }
  }

  // Função para devolver cautela
  async function devolverCautela(id: string) {
    try {
      error = '';
      const variables = {
        input: { id }
      };
      
      await client.request(DEVOLVER_CAUTELA, variables);
      await loadCautelas();
    } catch (err) {
      console.error('Erro ao devolver cautela:', err);
      error = 'Erro ao devolver cautela.';
    }
  }

  // Carregar dados quando o componente for montado
  onMount(() => {
    loadCautelas();
  });
</script>

<main class="container">
  <h1>Sistema de Controle de Cautela de Material</h1>
  
  {#if error}
    <div class="error">
      {error}
    </div>
  {/if}
  
  <div class="actions">
    <button on:click={() => showForm = !showForm} class="btn-primary">
      {showForm ? 'Cancelar' : 'Nova Cautela'}
    </button>
    <button on:click={loadCautelas} class="btn-secondary">
      Atualizar Lista
    </button>
  </div>

  {#if showForm}
    <form on:submit|preventDefault={createCautela} class="cautela-form">
      <h2>Nova Cautela</h2>
      
      <label>
        Nome do Cautelador:
        <input type="text" bind:value={formData.nomeCautelador} required />
      </label>

      <label>
        Contato:
        <input type="text" bind:value={formData.contatoCautelador} required />
      </label>

      <label>
        De Onde:
        <input type="text" bind:value={formData.deOnde} required />
      </label>

      <label>
        Motivo da Cautela:
        <textarea bind:value={formData.motivoCautela} required></textarea>
      </label>

      <label>
        Previsão de Retorno:
        <input type="datetime-local" bind:value={formData.previsaoRetorno} required />
      </label>

      <label>
        Responsável pela Cautela:
        <input type="text" bind:value={formData.cauteladorResponsavel} required />
      </label>

      <label>
        Observações:
        <textarea bind:value={formData.observacoes}></textarea>
      </label>

      <button type="submit" class="btn-primary">Criar Cautela</button>
    </form>
  {/if}

  {#if loading}
    <div class="loading">Carregando...</div>
  {:else}
    <div class="cautelas-list">
      <h2>Cautelas Registradas ({cautelas.length})</h2>
      
      {#each cautelas as cautela}
        <div class="cautela-card" class:devolvida={cautela.devolvido}>
          <div class="cautela-header">
            <h3>{cautela.nomeCautelador}</h3>
            <div class="actions">
              <span class="status">
                {cautela.devolvido ? '✅ Devolvido' : '⏰ Em aberto'}
              </span>
              {#if !cautela.devolvido}
                <button 
                  on:click={() => devolverCautela(cautela.id)} 
                  class="btn-success"
                >
                  Devolver
                </button>
              {/if}
            </div>
          </div>
          
          <div class="cautela-details">
            <p><strong>Contato:</strong> {cautela.contatoCautelador}</p>
            <p><strong>De onde:</strong> {cautela.deOnde}</p>
            <p><strong>Motivo:</strong> {cautela.motivoCautela}</p>
            <p><strong>Responsável:</strong> {cautela.cauteladorResponsavel}</p>
            <p><strong>Data/Hora:</strong> {new Date(cautela.dataHoraCautela).toLocaleString('pt-BR')}</p>
            <p><strong>Previsão retorno:</strong> {new Date(cautela.previsaoRetorno).toLocaleString('pt-BR')}</p>
            
            {#if cautela.observacoes}
              <p><strong>Observações:</strong> {cautela.observacoes}</p>
            {/if}
            
            {#if cautela.devolvido && cautela.dataHoraDevolucao}
              <p><strong>Devolvido em:</strong> {new Date(cautela.dataHoraDevolucao).toLocaleString('pt-BR')}</p>
            {/if}
          </div>
        </div>
      {/each}
      
      {#if cautelas.length === 0}
        <p class="empty-state">Nenhuma cautela registrada ainda.</p>
      {/if}
    </div>
  {/if}
</main>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  .error {
    background: #f8d7da;
    color: #721c24;
    padding: 1rem;
    border-radius: 4px;
    margin: 1rem 0;
    border: 1px solid #f5c6cb;
  }

  .loading {
    text-align: center;
    padding: 2rem;
    font-size: 1.2rem;
    color: #666;
  }

  .actions {
    margin: 2rem 0;
    display: flex;
    gap: 1rem;
  }

  .btn-primary, .btn-secondary, .btn-success {
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.2s;
  }

  .btn-primary {
    background: #007bff;
    color: white;
  }

  .btn-primary:hover {
    background: #0056b3;
  }

  .btn-secondary {
    background: #6c757d;
    color: white;
  }

  .btn-secondary:hover {
    background: #545b62;
  }

  .btn-success {
    background: #28a745;
    color: white;
    font-size: 0.875rem;
    padding: 0.5rem 1rem;
  }

  .btn-success:hover {
    background: #1e7e34;
  }

  .cautela-form {
    background: #f8f9fa;
    padding: 2rem;
    border-radius: 8px;
    margin: 2rem 0;
  }

  .cautela-form label {
    display: block;
    margin-bottom: 1rem;
    font-weight: bold;
  }

  .cautela-form input,
  .cautela-form textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-top: 0.25rem;
  }

  .cautela-form textarea {
    min-height: 80px;
    resize: vertical;
  }

  .cautelas-list {
    margin-top: 2rem;
  }

  .cautela-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 1rem;
    background: white;
  }

  .cautela-card.devolvida {
    background: #f0f8f0;
    border-color: #28a745;
  }

  .cautela-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .cautela-header .actions {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 0;
  }

  .cautela-header h3 {
    margin: 0;
    color: #333;
  }

  .status {
    font-weight: bold;
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
    font-size: 0.875rem;
  }

  .cautela-details p {
    margin: 0.5rem 0;
  }

  .empty-state {
    text-align: center;
    color: #666;
    font-style: italic;
    padding: 2rem;
  }
</style>
