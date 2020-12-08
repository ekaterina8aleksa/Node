const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    phone: {
        type: String,
        require: true,
        unique: true,
    },

}, {versionKey: false});

class ContactModel {
    constructor(){
        this.db =  mongoose.model('Contact', contactSchema);
    }
    getContacts = async () => {
        return await this.db.find();
    }
    createContact = async contactData => {
        return await this.db.create(contactData);
    }
    getByIdContact =  async contactId => {
        return await this.db.findById(contactId);
    }
    deleteContact = async contactId => {
        return await this.db.findByIdAndRemove(contactId);
    }
    updateContact = async (contactId, contactNewData) => {
        return await this.db.findByIdAndUpdate(contactId, contactNewData, {new: true});
    }
}

// const ContactModel =  mongoose.model('Contact', contactSchema);

module.exports = new ContactModel;