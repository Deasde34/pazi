<script lang="ts">
  export let key: string;
  export let title: string;
  export let buttonText: string;
  export let closeText: string;
  export let saveText: string;
  export let buttonClasses: string | null = null;
  export let onSave: () => void;
</script>

<!-- Button trigger modal -->
<div
  class={buttonClasses ?? "btn btn-primary"}
  data-bs-toggle="modal"
  data-bs-target="#{key}"
>
  {buttonText}
</div>

<!-- Modal -->
<div
  class="modal fade"
  id={key}
  tabindex="-1"
  aria-labelledby="{key}Label"
  aria-hidden="true"
>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="{key}Label">{title}</h1>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        />
      </div>
      <div class="modal-body">
        <slot />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
          >{closeText}</button
        >
        <button type="button" class="btn btn-primary" on:click={onSave}
          >{saveText}</button
        >
      </div>
    </div>
  </div>
</div>
