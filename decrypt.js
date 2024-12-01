const CryptoJS = require("crypto-js");

// Replace with your actual encrypted password and secret key
const encryptedPassword = "U2FsdGVkX1+KLJlSzUqYauSqSJDnKf9g4bcTtu/NFGA=";
const secretKey = "secret123";

// Decrypt the password
const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

console.log("Decrypted Password:", originalPassword);
