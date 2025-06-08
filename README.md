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

    - inviggoDb.users.json

    - inviggoDb.ads.json

### Run Backend

1. Navigate to the backend folder: ```cd inviggo-backend```

2. Install dependencies: ```npm install```

3. Start the server: ```npm run devStart```

4. The Express.js server will run on port 3000.

### Run Frontend

1. Navigate to the frontend folder: ```cd inviggo-frontend```

2. Install dependencies: ```npm install```

3. Start the React app: ```npm run dev```

4. The frontend will be available at http://localhost:4000.