<!-- Formulario.svelte -->

<script>
  import { createClient } from '@supabase/supabase-js';

  let nombre = "";
  let apellido = "";
  let fechaNacimiento = "";
  let profesional = "";
  let hora = "";
  let fecha = "";
  let razonVisita = "";

  const supabase = createClient('https://cdvdlbqhqekbzleoppad.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkdmRsYnFocWVrYnpsZW9wcGFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkzODUwMTQsImV4cCI6MjAxNDk2MTAxNH0.48WDEdEHfASDPaf85QSts9LEaAu8upOLsPiN0mLQvRM');

  const enviarFormulario = async () => {
    try {
      // Envía los datos a la tabla correspondiente en tu base de datos de Supabase
      const { data, error } = await supabase
        .from('citas')
        .upsert([
          {
            nombre,
            apellido,
            fechaNacimiento,
            profesional,
            hora,
            fecha,
            razonVisita,
          },
        ]);

      if (error) {
        console.error('Error al enviar los datos:', error.message);
      } else {
        console.log('Datos enviados correctamente:', data);
        // Puedes realizar acciones adicionales después de enviar los datos
      }
    } catch (error) {
      console.error('Error al conectar con Supabase:');
    }
  };
</script>

<style>
  /* Agrega estilos de Bootstrap según sea necesario */
</style>

<div class="container mt-4">
  <h2>Formulario de Visita</h2>
  <form on:submit|preventDefault={enviarFormulario}>
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre:</label>
        <input type="text" class="form-control" id="nombre" bind:value={nombre} />
      </div>
      <div class="mb-3">
        <label for="apellido" class="form-label">Apellido:</label>
        <input type="text" class="form-control" id="apellido" bind:value={apellido} />
      </div>
      <div class="mb-3">
        <label for="fechaNacimiento" class="form-label">Fecha de Nacimiento:</label>
        <input type="date" class="form-control" id="fechaNacimiento" bind:value={fechaNacimiento} />
      </div>
      <div class="mb-3">
        <label for="profesional" class="form-label">Profesional:</label>
        <select class="form-select" id="profesional" bind:value={profesional}>
          <option value="">Seleccionar</option>
          <option value="nutriologo">Nutriólogo</option>
          <option value="psicologo">Psicólogo</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="hora" class="form-label">Hora:</label>
        <input type="time" class="form-control" id="hora" step="1800" bind:value={hora} />
      </div>
      <div class="mb-3">
        <label for="fecha" class="form-label">Fecha:</label>
        <input type="date" class="form-control" id="fecha" bind:value={fecha} />
      </div>
      <div class="mb-3">
        <label for="razonVisita" class="form-label">Razón de Visita:</label>
        <textarea class="form-control" id="razonVisita" rows="3" bind:value={razonVisita}></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Aceptar</button>
    </form>
  </div>
  