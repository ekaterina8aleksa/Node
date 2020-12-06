const Contacts = require('./contacts');

const listContactsController = async (req, res, next) => {
    try{
        const contacts = await Contacts.listContacts();
        return res.status(200).json(contacts);
    }
    catch (err) {
        next(err);
    }
};

const getContactByIdController = async (req, res, next) =>{
    const {id} = req.params;
    try{
        const contactById = await Contacts.getContactById(Number(id));
        if(contactById){
            return res.status(200).json(contactById);
        }
    }
    catch (err) {
        next(res.status(404).json({message: 'Not found'}));
    };
};

const addContactController =   async (req, res, next) => {
    const {name, email, phone} = req.body;
    try{
        const contactData = name && email && phone;
        if(contactData){
            const contact = await Contacts.addContact(name, email, phone);
            return res.status(201).json(contact);
        }
    }
    catch  (err) {
        next(res.status(400).json({message: 'missing required field'}));
    };
};

const removeContactController = async (req, res, next) => {
    const {id} = req.params;
    try{
        const contactById = await Contacts.getContactById(Number(id));
        if(contactById){
            const deleteContact = await Contacts.removeContact(Number(id));
            return res.status(200).json({message: 'contact deleted'});
            }
    }
    catch (err) {
        next(res.status(404).json({ message: 'Not found' }));
        };
};

const updateContactController = async (req, res, next) => {
    const {id} = req.params;
    try{
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
    }
    catch  (err) {
        next(res.status(404).json({ message: 'Not found' }));
    }
};

module.exports = {
    listContactsController,
    getContactByIdController,
    addContactController,
    removeContactController,
    updateContactController,
};