<!-- // src/routes/auth/+page.svelte -->
<script lang="ts">
    import { goto } from '$app/navigation';

  export let data;
  let { supabase } = data;
  $: ({ supabase } = data);

  let email: string;
  let password: string;


  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    goto('/dashboard')
  };

  // const handleSignOut = async () => {
  //   await supabase.auth.signOut();
  // };
</script>

<div class="d-flex align-items-center py-4 bg-body-tertiary">
  <main class="form-signin w-100 m-auto">
    <form on:submit={handleSignIn}>
      <div class="d-flex">
        <img
          class="mb-4"
          src="/img/Pazi%20mindfit%20no%20bg.png"
          alt=""
          width="128"
          height="128"
        />
      </div>
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

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

      <div class="form-check text-start my-3">
        <input
          class="form-check-input"
          type="checkbox"
          value="remember-me"
          id="flexCheckDefault"
        />
        <label class="form-check-label" for="flexCheckDefault">
          Remember me
        </label>
      </div>
      <button class="btn btn-primary w-100 py-2 mb-3" type="submit">Sign in</button>
      <a href="/auth/register" class="btn btn-primary w-100 py-2">Don't have an account? Sign up!</a>
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

  .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
</style>
