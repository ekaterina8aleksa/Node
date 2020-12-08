const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const contactsRouter = require('./api/contacts/router');
const mongoose = require('mongoose');
const authRouter = require('./api/auth/authRouter');

const runServer = async () => {
    try {
        await mongoose .connect(process.env.DB_URI, {useUnifiedTopology: true});
        console.log('Database connection successful');

        const app = express();
        app.use(express.json());
        app.use(cors());
        app.use(morgan('dev'));
        app.use(express.json());
        app.use('/auth', authRouter);
        app.use('/contacts', contactsRouter);
        app.listen(PORT, () => console.log(`Server running on port: ${PORT} `));
    }
    catch(err) {
        console.log('Database connection error', err);
        process.exit(1);
    }
};

runServer();

