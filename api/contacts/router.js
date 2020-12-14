const {Router} = require('express');

const {
    getAllContactsController,
    createContactsController,
    getByIdContactController,
    deleteContactController,
    updateContactController
} = require('./contactsController');

const contactsRouter = Router();

contactsRouter.get('/', getAllContactsController)

contactsRouter.post('/', createContactsController )

contactsRouter.get('/:id', getByIdContactController)

contactsRouter.delete('/:id', deleteContactController)

contactsRouter.patch('/', updateContactController)

module.exports = contactsRouter;

