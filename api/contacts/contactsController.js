const ContactModel = require('./schema');

const getAllContactsController = async (req, res, next) => {
    try{
        const contacts = await ContactModel.getAllContacts();
        res.json(contacts);
    } catch (err){
        next(err);
    }
}

const createContactsController = async (req, res, next) => {
    try{
        const {body} = req;
        const newContact = await ContactModel.createContact(body);
        res.status(201).json(newContact);
    } catch (err){
        next(err);
    }
}

const getByIdContactController = async (req, res, next) => {
    try{
        const {id} = req.params;
        const byIdContact = await ContactModel.getByIdContact(id);
        res.status(200).json(byIdContact);
    } catch (err){
        next(err);
    }
}

const deleteContactController = async (req, res, next) => {
    try{
        const {id} = req.params;
        const deletedContact = await ContactModel.deleteContact(id);
        res.status(200).json({message: 'contact deleted'});
    } catch (err){
        next(err);
    }
}

const updateContactController = async (req, res, next) => {
    try{
        const {id, ...data} = req.body;
        const updatedContact = await ContactModel.updateContact(id, data);
        res.status(200).json(updatedContact);
    } catch (err){
        next(err);
    }
}

module.exports = {
    getAllContactsController, 
    createContactsController,
    getByIdContactController,
    deleteContactController,
    updateContactController
}