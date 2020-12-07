const {Router} = require('express');
const Controllers = require('./controller');
const { validateCreateContact, validateUpdateContact} = require('./validation')

const contactsRouter = Router();

contactsRouter.get('/', Controllers.listContactsController)

contactsRouter.post('/', validateCreateContact, Controllers.addContactController)

contactsRouter.get('/:id', Controllers.getContactByIdController)

contactsRouter.delete('/:id', Controllers.removeContactController)

contactsRouter.put('/:id', validateUpdateContact, Controllers.updateContactController)

module.exports = contactsRouter;
