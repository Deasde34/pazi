<script lang="ts">
  import Sidebar from "$lib/components/Sidebar.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import { goto, invalidate } from "$app/navigation";
  import { onMount } from "svelte";
  import Navbar from "$lib/components/Navbar.svelte";

  export let data;

  let { supabase, session } = data;
  $: ({ supabase, session } = data);

  onMount(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, _session) => {
      if (_session?.expires_at !== session?.expires_at) {
        invalidate("supabase:auth");
      }
    });

    console.log(session);

    if (session) {
      goto("/dashboard");
    }

    return () => subscription.unsubscribe();
  });
</script>

{#if session}
  <Sidebar />
{:else}
  <Navbar />
{/if}
<slot />
<Footer />
