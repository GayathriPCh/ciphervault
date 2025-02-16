import { db } from "./firebase";
import { collection, addDoc, query, getDocs, where } from "firebase/firestore";
import bcrypt from "bcryptjs";
import CryptoJS from "crypto-js";

const SECRET_KEY = "super_secret_key";  // Change this for better security

/**
 * Store password securely
 * @param {string} userId
 * @param {string} site
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @param {string} category
 */
export async function storePassword(userId, site, username, email, password, category) {
  const hashedPass = bcrypt.hashSync(password, 10);
  const encryptedPass = CryptoJS.AES.encrypt(password, SECRET_KEY).toString();

  await addDoc(collection(db, "passwords"), {
    userId,
    site,
    username,
    email,
    password: encryptedPass,
    hashedPass,
    category,
    createdAt: new Date(),
  });
}

/**
 * Retrieve all stored passwords for a user
 * @param {string} userId
 */
export async function getPasswords(userId) {
  const q = query(collection(db, "passwords"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

/**
 * Decrypt password
 * @param {string} encryptedPassword
 * @returns {string} Decrypted password
 */
export function decryptPassword(encryptedPassword) {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Decryption failed:", error);
    return "Error decrypting";
  }
}
