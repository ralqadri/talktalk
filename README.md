# talktalk

An anonymous textboard/forum project, based on Express.js.

## Running

0. **Copy and paste `config.example.json` to `config.json` and fill it with your desired port(s) for each backend and the frontend server(s).**

   To allow You can generate a valid hashed password by running `node generate_password.ts` in the `backend` directory. You should insert your hashed password to your config.json file afterwards.

1. **Install dependencies**

   Open the `backend` and `frontend` directory and install dependencies for each directory

```sh
cd backend
npm install
cd ../frontend
npm install
```

2. **Start the backend server**

   In the `backend` directory, start the Express server

```sh
node app.ts
```

3. **Start the frontend server**

   In the `frontend` directory, start the Vite/Svelte development server

```sh
npm run dev
```

4. **Access the application**

   Open your browser and navigate to `http://localhost:<FRONTEND_PORT>`

## To-dos

- [ ] Board: change board url to use `board_code` instead of using `id`
- [ ] Admin: create moderating privileges (delete/etc) if admin is logged in
- [ ] CSS fixes
