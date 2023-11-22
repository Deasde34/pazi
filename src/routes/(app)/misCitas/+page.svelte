
 <!-- src/routes/MiPagina.svelte -->

<script lang="ts">
  import { onMount } from 'svelte';
  import { createClient } from '@supabase/supabase-js';
  import type { DatosType } from '../../../types/tipos';

  let datos: DatosType[] = [];

  const supabase = createClient('https://cdvdlbqhqekbzleoppad.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkdmRsYnFocWVrYnpsZW9wcGFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkzODUwMTQsImV4cCI6MjAxNDk2MTAxNH0.48WDEdEHfASDPaf85QSts9LEaAu8upOLsPiN0mLQvRM');
    

  const obtenerDatosDesdeSupabase = async () => {
    try {
      // Obtén los datos de tu tabla en Supabase
      const { data, error } = await supabase
        .from('citas')
        .select('*')
        .limit(1);

      if (error) {
        console.error('Error al obtener datos:', error.message);
      } else {
        // Asigna los datos obtenidos a la variable datos
        if (data) {
          datos = data;
        }
      }
    } catch (error) {
      console.error('Error al conectar con Supabase:');
    }
  };

  onMount(() => {
    obtenerDatosDesdeSupabase();
  });
</script>

<style>
  /* Agrega estilos de Bootstrap según sea necesario */
  .container {
    margin-top: 4rem;
  }

  .citas-list {
    list-style-type: none;
    padding: 0;
  }

  .cita-item {
    margin-bottom: 1rem;
  }
</style>

<div class="container">
  <h2>Citas Próximas</h2>
  {#if datos.length > 0}
    <ul class="citas-list">
      {#each datos as dato (dato.nombre)}
        <li class="cita-item"><b>Paciente: </b>{dato.nombre} {dato.apellido}</li>
        <li class="cita-item"><b>Hora: </b>{dato.hora} PM</li>
        <li class="cita-item"><b>Fecha: </b>{dato.fecha}</li>
        <li class="cita-item"><b>Atiende: </b>María Broch</li>
        <li class="cita-item"><b>Área: </b>{dato.profesional}</li>
        <li class="cita-item"><b>Razón de Visita: </b>{dato.razonVisita}</li>
        <!-- Agrega otros campos según sea necesario -->
      {/each}
    </ul>
  {:else}
    <p>No hay datos para mostrar.</p>
  {/if}
</div>
