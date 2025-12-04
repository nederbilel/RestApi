# REST API with Express and Mongoose

A simple CRUD REST API for managing users, built with Express and Mongoose. Configuration is handled via dotenv in `config/.env`.

## Project Structure
- `server.js`: Express server, MongoDB connection, and CRUD routes
- `config/.env`: Environment variables (`PORT`, `MONGO_URI`)
- `models/User.js`: Mongoose User schema and model

## Prerequisites
- Node.js (v16+ recommended)
- MongoDB (local service or MongoDB Atlas URI)

## Setup
1. Install dependencies
```powershell
npm install
```
2. Configure environment variables in `config/.env` (already present):
```dotenv
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/restapi_db
```
3. Start MongoDB (local) if not already running.

## Run the Server
- Using Node directly:
```powershell
node server.js
```
- Using npm script (if you add it):
```powershell
npm start
```
Expected output includes a server listening message and a successful MongoDB connection.

## API Endpoints
Base URL: `http://localhost:3000`

- GET `/users`
  - Description: Return all users
  - Response: `200 OK` with an array of user documents

- POST `/users`
  - Description: Create a new user
  - Headers: `Content-Type: application/json`
  - Body example:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "age": 28
  }
  ```
  - Response: `201 Created` with created user document

- PUT `/users/:id`
  - Description: Update a user by id
  - Headers: `Content-Type: application/json`
  - Body example (partial updates allowed):
  ```json
  {
    "name": "Jane D.",
    "age": 29
  }
  ```
  - Response: `200 OK` with updated user or `404` if not found

- DELETE `/users/:id`
  - Description: Remove a user by id
  - Response: `200 OK` with deletion confirmation or `404` if not found

## Testing with Postman
1. Set base URL to `http://localhost:3000`.
2. Test in order:
   - `GET /users` (should return `[]` initially)
   - `POST /users` with JSON body (see example above)
   - Copy `_id` from the POST response
   - `PUT /users/:id` using that id
   - `DELETE /users/:id` using that id
3. Ensure `Content-Type: application/json` header is set for POST/PUT.

## Testing from PowerShell (optional)
```powershell
# GET all users
Invoke-RestMethod -Method GET http://localhost:3000/users

# CREATE a user
Invoke-RestMethod -Method POST http://localhost:3000/users -ContentType "application/json" -Body '{"name":"Jane","email":"jane@example.com","age":28}'

# UPDATE a user (replace <ID>)
Invoke-RestMethod -Method PUT http://localhost:3000/users/<ID> -ContentType "application/json" -Body '{"age":29}'

# DELETE a user (replace <ID>)
Invoke-RestMethod -Method DELETE http://localhost:3000/users/<ID>
```

## Verify in MongoDB
- MongoDB Compass:
  - Connect: `mongodb://127.0.0.1:27017`
  - DB: `restapi_db`
  - Collection: `users`
- mongosh:
```powershell
mongosh "mongodb://127.0.0.1:27017/restapi_db"
```
Then:
```javascript
db.users.find().pretty()
```

## Common Issues
- Connection error: Ensure MongoDB is running and `MONGO_URI` is correct.
- JSON errors: Check `express.json()` middleware and `Content-Type: application/json`.
- Validation errors: Make sure request bodies satisfy the `User` schema.

## Notes
- Code is commented to explain server setup, routes, and model.
- Consider adding npm scripts in `package.json`:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "node server.js"
  }
}
```
- Ensure `.gitignore` excludes `node_modules/` and `config/.env`.
