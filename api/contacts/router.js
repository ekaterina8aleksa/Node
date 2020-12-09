const {Router} = require('express');
const {
    getContactsController,
    createContactsController,
    getByIdContactController,
    deleteContactController,
    updateContactController
} = require('./contactsController')

const contactsRouter = Router();

contactsRouter.get('/', getContactsController)

contactsRouter.post('/',createContactsController )

contactsRouter.get('/:id', getByIdContactController)

contactsRouter.delete('/:id', deleteContactController)

contactsRouter.patch('/', updateContactController)

module.exports = contactsRouter;

