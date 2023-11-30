##  🏁 Getting Started

1. Move into an empty directory where you want the code to clone:
```
cd /directory_name
```

2. Git clone the repository into the directory you just created:

```
For SSH: 
git clone git@github.com:2309-te4m-supreme/Craftify.git

For HTTPS:
https://github.com/2309-te4m-supreme/Craftify.git
```

3. Move into newly created folder and install packages

```bash
cd Craftify
npm i
```

4. Add a `.env` file with your secret value for auth
```
JWT_SECRET='craftopia'
```

5. Create the database

```bash
createdb craftify
```

7. Seed the database
```bash
npm run seed
```

8. Start the server
```bash
npm run dev
```

9. Open your browser at `http://localhost:3000`

10. Build something cool! 😎
