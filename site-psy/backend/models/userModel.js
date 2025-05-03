// backend/models/userModel.js

export const users = []; // Temporaire, remplacé plus tard par la base de données

export class User {
  constructor({ id, name, email, password }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password; // Hashed
  }
}
