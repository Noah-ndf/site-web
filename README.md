# psy_website

## Project Description

**psy_website** is a web application designed to facilitate connections between patients and psychologists. The site allows user account management (for both patients and psychologists), appointment scheduling, and access to relevant information through a modern and intuitive interface.

The project is based on a full-stack architecture, featuring a **React frontend** and a **Node.js/Express backend**.

## Setup and Run Instructions

### Prerequisites

- Node.js (v14 or higher recommended)
- npm
- **Thunder Client** extension (for API testing in VS Code)

### Cloning the Project

```bash
git clone <repo-url>
cd site-web
```

### Starting the Backend

```bash
cd site-psy/backend 
npm install
npm start
```

The backend runs at `http://localhost:5000`.

### Starting the Frontend

```bash
cd site-psy/frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173` (or another port depending on your Vite configuration).

### Creating a Psychologist Account (via Thunder Client)

Use Thunder Client in VS Code to send the following request:

- **Method**: `POST`
- **URL**: `http://localhost:5000/api/auth/register`
- **Body (JSON)**:

```json
{
  "nom": "Martin",
  "prenom": "Sophia",
  "email": "psy@example.com",
  "password": "azerty123",
  "telephone": "0600000000",
  "role": "psychologist"
}
```

## Team Roles

- **Axel Pineau**: Backend development 
- **Maxime Viti**: Frontend integration, 
- **Noah N'Diaye-Falcy**: React components development and routing 
- **Michael Yaghi**: UI/UX design
- **Clovis Le Floc'h**: Project coordination, functional testing
