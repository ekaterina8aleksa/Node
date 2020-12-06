const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const contactsRouter = require('./api/contacts/router');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/contacts', contactsRouter);

app.listen(PORT, () => console.log(`Server running on port: ${PORT} `));



