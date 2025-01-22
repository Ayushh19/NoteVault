# Notes App API

This is a notes app API that allows users to authenticate and manage their notes. It is built using Node.js, Express, and MongoDB. This backend is for the frontend available [here](https://github.com/BiAksoy/notes-app-frontend).

## Getting Started

### Requirements

- Node.js
- MongoDB

### Installation

1. Install the dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory and add the following environment variables:

   ```bash
   PORT=8000
   CONNECTION_STRING=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

3. Start the server:

   ```bash
   npm start
   ```

   The server will start on `http://localhost:8000`.

## API Documentation

### User Endpoints

#### POST /users/signup

- **Description:** Register a new user.
- **Body Parameters:**
  - `name` (string, required)
  - `email` (string, required)
  - `password` (string, required)

#### POST /users/login

- **Description:** Login a user.
- **Body Parameters:**
  - `email` (string, required)
  - `password` (string, required)

#### GET /users/me

- **Description:** Get the user profile.
- **Headers:**
  - `Authorization`: Bearer `<token>`

### Note Endpoints

#### POST /notes

- **Description:** Create a new note.
- **Headers:**
  - `Authorization`: Bearer `<token>`
- **Body Parameters:**
  - `title` (string, required)
  - `content` (string, required)

#### PUT /notes/:noteId

- **Description:** Update a note.
- **Headers:**
  - `Authorization`: Bearer `<token>`
- **Body Parameters:**
  - `title` (string, optional)
  - `content` (string, optional)
  - `tags` (array of strings, optional)
  - `isPinned` (boolean, optional)

#### GET /notes

- **Description:** Get all notes.
- **Headers:**
  - `Authorization`: Bearer `<token>`

#### DELETE /notes/:noteId

- **Description:** Delete a note.
- **Headers:**
  - `Authorization`: Bearer `<token>`

#### PUT /notes/:noteId/pin

- **Description:** Pin a note.
- **Headers:**
  - `Authorization`: Bearer `<token>`

#### GET /notes/search

- **Description:** Search notes by title or content.
- **Headers:**
  - `Authorization`: Bearer `<token>`
- **Query Parameters:**
  - `query` (string, required)
