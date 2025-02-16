<script>
  import { onMount } from "svelte";
  import { decryptPassword, getPasswords, storePassword } from "$lib/password";
  import { checkPasswordBreach } from "$lib/breachCheck";  
  import './passwordVault.css';
  /**
   * @type {any[]}
   */
  let passwords = [];
  let site = "";
  let username = "";
  let email = "";
  let password = "";
  let category = "Uncategorized";  // Default category
  let breachWarning = "";
  let searchQuery = "";
  let sortCategory = "All";  // Default sorting option
  /** @type {{ [key: string]: boolean | string }} */
  let showPasswords = {};

  // Load passwords on mount
  onMount(async () => {
    passwords = await getPasswords("user-id");  // Replace with actual user ID
  });

  // Function to add new password entry
  async function addPassword() {
    const isLeaked = await checkPasswordBreach(password);
    if (isLeaked) {
      breachWarning = "⚠️ This password was found in a breach! Change it ASAP.";
    } else {
      breachWarning = "";
      await storePassword("user-id", site, username, email, password, category);
      passwords = await getPasswords("user-id");  // Refresh stored passwords
      site = username = email = password = "";
      category = "Uncategorized"; // Reset category
    }
  }

  // Toggle password visibility
  /**
   * @param {string | number} id
   * @param {any} encryptedPassword
   */
  function togglePassword(id, encryptedPassword) {
    if (showPasswords[id]) {
      showPasswords[id] = false;
    } else {
      showPasswords[id] = decryptPassword(encryptedPassword);
    }
  }

  // Computed filtered & sorted passwords based on search query & selected category
  $: filteredPasswords = passwords
  .filter(p => 
    (p.site?.toLowerCase()?.includes(searchQuery.toLowerCase()) || 
    p.username?.toLowerCase()?.includes(searchQuery.toLowerCase()) || 
    p.email?.toLowerCase()?.includes(searchQuery.toLowerCase()) || 
    p.category?.toLowerCase()?.includes(searchQuery.toLowerCase()))
  )
  .filter(p => sortCategory === "All" || p.category === sortCategory);

</script>

<h1>Password Vault</h1>

<!-- Add Password Form -->
<form on:submit|preventDefault={addPassword}>
  <input type="text" placeholder="Website/App" bind:value={site} required />
  <input type="text" placeholder="Username" bind:value={username} required />
  <input type="email" placeholder="Email" bind:value={email} required />
  <input type="password" placeholder="Password" bind:value={password} required />
  
  <!-- Category Dropdown -->
  <select bind:value={category}>
    <option value="Social">Social</option>
    <option value="Banking">Banking</option>
    <option value="Work">Work</option>
    <option value="Gaming">Gaming</option>
    <option value="Uncategorized">Uncategorized</option>
  </select>

  <button type="submit">Save Password</button>
</form>

<!-- Breach Warning -->
{#if breachWarning}
  <p style="color: red;">{breachWarning}</p>
{/if}

<h2>Stored Passwords</h2>

<!-- Search & Sort -->
<div style="display: flex; gap: 10px; align-items: center;">
  <input type="text" placeholder="Search..." bind:value={searchQuery} />

  <!-- Sort by Category -->
  <select bind:value={sortCategory}>
    <option value="All">All Categories</option>
    <option value="Social">Social</option>
    <option value="Banking">Banking</option>
    <option value="Work">Work</option>
    <option value="Gaming">Gaming</option>
    <option value="Uncategorized">Uncategorized</option>
  </select>
</div>

<!-- Display Password List -->
<ul>
  {#each filteredPasswords as p (p.id)}
    <li>
      <strong>{p.site}</strong> ({p.category})  
      <br />
      <span>👤 Username: {p.username}</span>  
      <br />
      <span>📧 Email: {p.email}</span>  
      <br />
      <span>🔑 Password: 
        {#if showPasswords[p.id]}
          {showPasswords[p.id]}  
        {:else}
          🔒 Encrypted
        {/if}
      </span>
      <br />
      <button on:click={() => togglePassword(p.id, p.password)}>
        {showPasswords[p.id] ? "Hide" : "View"}
      </button>
    </li>
  {/each}
</ul>


<!-- No Results Message -->
{#if filteredPasswords.length === 0}
  <p>No passwords found.</p>
{/if}
