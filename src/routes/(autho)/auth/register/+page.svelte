<!-- // src/routes/auth/+page.svelte -->
<script lang="ts">
  import { goto } from '$app/navigation';

  export let data;

  let { supabase } = data;
  $: ({ supabase } = data);

  let email: string;
  let password: string;
  let password2: string;

  const handleSignUp = async () => {
    if (password !== password2) {
      alert("Passwords do not match");
      return;
    }

    await supabase.auth.signUp({
      email,
      password,
    });
    goto('/auth/verify')
  };

</script>

<div class="d-flex align-items-center py-4 bg-body-tertiary">
  <main class="form-signin w-100 m-auto">
    <form on:submit={handleSignUp}>
      <div class="d-flex">
        <img
          class="mb-4"
          src="/img/Pazi%20mindfit%20no%20bg.png"
          alt=""
          width="128"
          height="128"
        />
      </div>
      <h1 class="h3 mb-3 fw-normal">Please sign up</h1>

      <div class="form-floating">
        <input
          type="email"
          name="email"
          class="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          bind:value={email}
        />
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating">
        <input
          type="password"
          name="password"
          class="form-control"
          id="floatingPassword"
          placeholder="Password"
          bind:value={password}
        />
        <label for="floatingPassword">Password</label>
      </div>
      <div class="form-floating">
        <input
          type="password"
          name="password"
          class="form-control"
          id="floatingPassword"
          placeholder="Password"
          bind:value={password2}
        />
        <label for="floatingPassword">Confirm your password</label>
      </div>


      <button class="btn btn-primary w-100 py-2 mb-3" type="submit">Sign up</button>
      <a href="/auth" class="btn btn-primary w-100 py-2">Have an account? Sign in!</a>
      <p class="mt-5 mb-3 text-body-secondary">&copy; Pazi 2023</p>
    </form>
  </main>
</div>

<style>
  .form-signin {
    max-width: 330px;
    padding: 1rem;
  }

  .form-signin .form-floating:focus-within {
    z-index: 2;
  }
</style>
