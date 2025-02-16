<script>
    import { goto } from "$app/navigation";
  </script>
  
  <main class="container">
    <h1>🔐 CipherVault</h1>
    <p>Your Secure Password Manager</p>
    <button on:click={() => goto('/login')}>Get Started</button>
  </main>
  
  <style>
    .container {
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
  