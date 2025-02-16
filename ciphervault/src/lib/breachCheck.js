import CryptoJS from "crypto-js";

/**
 * @param {string | CryptoJS.lib.WordArray} password
 */
export async function checkPasswordBreach(password) {
  const hash = CryptoJS.SHA1(password).toString().toUpperCase();
  const prefix = hash.substring(0, 5);

  const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
  const data = await response.text();

  return data.includes(hash.substring(5));  // ✅ Returns true if password was leaked
}
