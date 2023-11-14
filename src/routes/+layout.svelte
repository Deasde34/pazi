<script lang="ts">
  // import { onMount } from "svelte";
  import Sidebar from "$lib/components/Sidebar.svelte";
  import Footer from  "$lib/components/Footer.svelte"
</script>

<Sidebar />
<slot />
<Footer/>
