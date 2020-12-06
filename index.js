const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const contactsRouter = require('./api/contacts/router');
const mongoose = require('mongoose');


const runServer = async () => {
await mongoose .connect(process.env.DB_URI, {useUnifiedTopology: true});
console.log('Database connection successful');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/contacts', contactsRouter);

app.listen(PORT, () => console.log(`Server running on port: ${PORT} `));

};



// const Contacts = require("./contacts");
// const argv = require("yargs").argv;

// function invokeAction({ action, id, name, email, phone }) {
//     switch (action) {
//         case "list":
//             Contacts.listContacts().then((contacts) => console.table(contacts));
//             break;

//         case "get":
//             Contacts.getContactById(id).then((contact) =>
//                 console.table(contact)
//             );
//             break;

//         case "add":
//             Contacts.addContact(name, email, phone).then((contact) =>
//                 console.table(contact)
//             );
//             break;

//         case "remove":
//             Contacts.removeContact(id).then((contacts) =>
//                 console.table(contacts)
//             );
//             break;

//         default:
//             console.warn("\x1B[31m Unknown action type!");
//     }
// }

// invokeAction(argv);

