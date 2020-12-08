const {Router} = require('express');
const {
    getContactsController,
    createContactsController,
    getByIdContactController,
    deleteContactController,
    updateContactController
} = require('./contactsController')

// const Controllers = require('./controller');
// const { validateCreateContact, validateUpdateContact} = require('./validation')

const contactsRouter = Router();

contactsRouter.get('/', getContactsController)

contactsRouter.post('/',createContactsController )

contactsRouter.get('/:userId', getByIdContactController)

contactsRouter.delete('/:userId', deleteContactController)

contactsRouter.patch('/', updateContactController)

module.exports = contactsRouter;