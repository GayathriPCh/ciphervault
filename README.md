# Password Vault - Svelte App 🔐

## Overview
This is a **Svelte-based Password Vault** that securely stores, categorizes, and manages user credentials. It also checks for **password breaches** and allows users to view encrypted passwords securely via AES (Advanced Encryption Standard).
![Screenshot 2025-02-16 143101](https://github.com/user-attachments/assets/a11e71e9-815b-438e-a400-9a6dc6298696)

## Features 🌟
- **Add New Passwords**: Store website, username, email, and password.
- **Password Breach Check**: Warns if a password has been exposed in a data breach.
- **Category Sorting**: Organize passwords into `Social`, `Banking`, `Work`, `Gaming`, etc.
- **Search Functionality**: Find passwords quickly based on website, username, or email.
- **Secure Password Encryption**: Passwords remain encrypted unless toggled.
- **Password Visibility Toggle**: Decrypt and view passwords securely.

## Installation & Setup ⚙️

### **1. Clone the Repository**
```sh
$ git clone https://github.com/your-username/password-vault-svelte.git
$ cd password-vault-svelte
```

### **2. Install Dependencies**
```sh
$ npm install
```

### **3. Run the Development Server**
```sh
$ npm run dev
```
Then, open `http://localhost:5173/` in your browser.

## File Structure 📂
```
/password-vault-svelte
│── src
│   ├── lib
│   │   ├── password.js  # Handles password encryption/decryption, storage, and retrieval
│   │   ├── breachCheck.js  # Checks if a password is leaked in a breach
│   ├── routes
│   │   ├── passwordVault.svelte  # Main component managing passwords
│   ├── styles
│   │   ├── passwordVault.css  # Styling for the password vault
│── README.md  # Documentation (this file)
│── package.json  # Project dependencies
│── svelte.config.js  # Svelte configuration
```

## Usage 📖

### **Adding a New Password**
1. Enter **Website/App Name**, **Username**, **Email**, and **Password**.
2. Select a **Category** (e.g., Social, Banking, Work, etc.).
3. Click **Save Password**.
4. If the password is leaked, a warning appears; otherwise, it's securely stored.

### **Viewing Stored Passwords**
- Use the **Search Bar** to filter passwords by site, username, or email.
- Use the **Sort Dropdown** to filter by category.
- Click **View** to decrypt and reveal the password.
- Click **Hide** to encrypt it again.

