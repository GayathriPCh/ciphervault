<script>
    import { signInWithGoogle } from "$lib/firebase";
    import { goto } from "$app/navigation";
  
    async function login() {
      const user = await signInWithGoogle();
      if (user) goto('/dashboard'); // Redirect only if login is successful
    }
  </script>
  
  <main class="login-container">
    <h2>Login to CipherVault</h2>
    <button on:click={login}>Sign in with Google</button>
  </main>
  
  <style>
    .login-container {
      text-align: center;
      padding: 2rem;
    }
    button {
      padding: 10px 20px;
      background: #007aff;
      color: white;
      border: none;
      cursor: pointer;
      border-radius: 5px;
    }
  </style>
  