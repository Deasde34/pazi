<script lang="ts">
  import { onMount } from "svelte";
  import Modal from "../Modal.svelte";
  import type { Emocion } from "$lib/types";
  import { EmocionesService } from "$lib/services/Emociones.service";

  let nombre = "Hermenegildo";
  let apellido = "Juarez";
  let motivo = "";
  let horario = "";
  let emocion = "";

  let emociones: Emocion[] = [];

  onMount(async () => {
    emociones = await EmocionesService.getAllEmociones();
  });

  async function onSave() {
    alert("asd")
  }
</script>

<Modal
  key="assignarCita"
  title="Asignar cita"
  buttonText="Asignar cita"
  closeText="Cancelar"
  saveText="Guardar"
  buttonClasses="event bg-success"
  onSave={onSave}
>
  <div class="mb-3">
    <label for="name">Nombre: </label>
    <input name="name" type="text" bind:value={nombre} />
  </div>
  <div class="mb-3">
    <label for="lastName">Apellido: </label>
    <input name="lastName" type="text" bind:value={apellido} />
  </div>
  <div class="mb-3">
    <label for="motive">Motivo de la visita: </label>
    <textarea
      id="textArea"
      rows="4"
      cols="40"
      spellcheck="false"
      name="motive"
    />
  </div>

  <label for="hora">Seleccione un horario:</label>
  <select name="hora" id="hora" bind:value={horario}>
    <option value="1">1:00 P.M.</option>
    <option value="2">2:00 P.M.</option>
    <option value="3">4:00 P.M.</option>
    <option value="4">5:00 P.M.</option>
    <option value="5">6:00 P.M.</option>
  </select>

  <div class="mb-3">
    <label for="vehicle1">
      En los últimos días, ha sentido alguna de las siguientes emociones:</label
    >

    {#each emociones as emocion}
      <input
        type="checkbox"
        id={`emocion${emocion.id}`}
        name={emocion.nombre}
        value={emocion.nombre}
      />
      <label for={emocion.nombre}>{emocion.nombre}</label>
    {/each}
    <input type="checkbox" id="emocionOtro" name="emocionOtro" value="Otro" />
    <label for="emocionOtro">Otro</label>
  </div>
</Modal>
