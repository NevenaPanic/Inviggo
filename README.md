# Inviggo Ads Project

## Instructioin how to run

### Setup .env

IMPORTANT: The .env file is ignored by Git and is required for the application to run properly. Create a .env file in the root directory with the following content:
```
PORT=3000
DATABASE_URL=mongodb://localhost/inviggoDb
JWT_SECRET=3MnV9NR0fYZzNK0uH7m94DOLSqgMRCT3rHNS8ixyjGNjk2FPY3drOnU0JVSYI2z1
```

### Setup Database

1. A local MongoDB instance is required (database name should be inviggoDb).

2. Seed the database using the following JSON files:

    - inviggoDb.users.json  (Collection Name: users)

    - inviggoDb.ads.json    (Collection Name: ads)

### Run Backend ( express.js )

1. Navigate to the backend folder: ```cd inviggo-backend```

2. Install dependencies: ```npm install```

3. Start the server: ```npm run devStart```

4. The Express.js server will run on port 3000.

### Run Frontend ( React TS + Ant Design )

1. Navigate to the frontend folder: ```cd inviggo-frontend```

2. Install dependencies: ```npm install```

3. Start the React app: ```npm run dev```

4. The frontend will be available at http://localhost:4000.


## Note for DEMO purposes
- For demonstration purposes, all ads use the same image (image.png). However, image upload functionality is fully implemented and works correctly, including image updates.

- All users in the database share the same password for simplicity during the demo.

- You can use the following test credentials to log in:
```
username:nevena
password:pass123
```