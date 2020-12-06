const {Router} = require('express');
const Contacts = require('./contacts');

const contactsRouter = Router();

contactsRouter.get('/', async (req, res, next) =>{
    const contacts = await Contacts.listContacts();
    return res.status(200).json(contacts);
})

contactsRouter.post('/', async (req, res, next) =>{

  const {name, email, phone} = req.body;
  const contactData = name && email && phone;
    if(contactData){
      const contact = await Contacts.addContact(name, email, phone);
      return res.status(201).json(contact);
    }
    else {
      return res.status(400).json({message: 'missing required field'})
  };
    
})

contactsRouter.get('/:id',async (req, res, next) =>{

  const {id} = req.params;

  const contactById = await Contacts.getContactById(Number(id));
    if(contactById){
      return res.status(200).json(contactById);
    }
    else{
      return res.status(404).json({message: 'Not found'});
    };
})

contactsRouter.delete('/:id', async (req, res, next) =>{

  const {id} = req.params;
  const contactById = await Contacts.getContactById(Number(id));
    if(contactById){
        const deleteContact = await Contacts.removeContact(Number(id));
        return res.status(200).json({message: 'contact deleted'});
      }
    else{
        return res.status(404).json({message: 'Not found'});
      };
})

contactsRouter.put('/:id', async (req, res, next) =>{

  const {id} = req.params;
  const contactById = await Contacts.getContactById(Number(id));
    if(contactById){
      const contactBody = Object.keys(req.body).length;
        if(contactBody === 0) {
          return res.status(400).json({ message: 'missing fields' })
        }
        else{
          const updateContact = await Contacts.updateContact(contactById, req.body);
          return res.status(200).json(updateContact);
        }
    }

    else {
      return res.status(404).json({ message: 'Not found' })
    }
})

module.exports = contactsRouter;
