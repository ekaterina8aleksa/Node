const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const contactsRouter = require('./api/contacts/router');
const mongoose = require('mongoose');
const authRouter = require('./api/auth/authRouter');
const userRouter = require('./api/user/userRouter');
const path = require('path');

const runServer = async () => {
    try {
        await mongoose .connect(process.env.DB_URI, {useUnifiedTopology: true});
        console.log('Database connection successful');

        const app = express();

        app.use(express.static(path.resolve(__dirname, 'public')))

        app.use(express.json());
        app.use(cors());
        app.use(morgan('dev'));
        app.use(express.json());
        app.use('/auth', authRouter);
        app.use('/contacts', contactsRouter);
        app.use('/users', userRouter);

        app.use(async (err, req, res, next) => {
            if (err) {
            let logs = await fs.readFile('errors.logs.json', { encoding: 'utf-8' });
            logs = JSON.parse(logs);
            logs.push({
                date: new Date().toISOString(),
                method: req.method,
                originalUrl: req.originalUrl,
                name: err.message,
            });
            logs = JSON.stringify(logs);
            console.error(err);
            res.status(500).send(err.message);
            return await fs.writeFile('errors.logs.json', logs);
            }
            console.log('No error');
        });

        app.listen(PORT, () => console.log(`Server running on port: ${PORT} `));
    }
    catch(err) {
        console.log('Database connection error', err);
        process.exit(1);
    }
};

runServer();

