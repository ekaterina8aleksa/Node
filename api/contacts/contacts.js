const fs = require("fs").promises;
const path = require("path");
const Joi = require("joi");

class Contacts {
    constructor() {
        this.FILE_CONTACTS_PATH = path.resolve(
            __dirname,
            "../../db",
            "contacts.json"
        );
    }
    listContacts = async () => {
        try {
            const contactsData = await fs.readFile(this.FILE_CONTACTS_PATH, {
                encoding: "utf-8",
            });
            return JSON.parse(contactsData);
        } catch (err) {
            console.log("Error getting contacts", err);
        }
    };

    getContactById = async (contactId) => {
        try {
            const contactsData = await this.listContacts();
            return contactsData.find((contact) => contact.id === contactId);
        } catch (err) {
            console.log(`Error finding contact with id ${contactId}`, err);
        }
    };

    addContact = async (name, email, phone) => {
        try {
            const contactsData = await this.listContacts();
            const id = contactsData.length ? [...contactsData].pop().id + 1 : 1; // or contactsData.length + 1;nanoid();
            const newContact = { id, name, email, phone };
            await contactsData.push(newContact);
            const contactsDataJson = JSON.stringify(contactsData);
            await fs.writeFile(this.FILE_CONTACTS_PATH, contactsDataJson);
            return newContact;
        } catch (err) {
            console.log("Error adding new contact", err);
        }
    };
    removeContact = async (contactId) => {
        try {
            const contactsData = await this.listContacts();
            let result = await contactsData.filter(
                (contact) => contact.id !== contactId
            );
            await fs.writeFile(this.FILE_CONTACTS_PATH, JSON.stringify(result));
            return result;
        } catch (err) {
            console.log(`Error deleting contact with id ${contactId}`, err);
        }
    };

    updateContact = async (contactId, name, email, phone) => {
        try {
            const contactsData = await this.listContacts();
            let contact = await contactsData.find(
                contact => { 
                    if (contact.id === contactId) {
                    return contact;
                  }
                 });
                const updateContact = {
                ...contact,
                id: contactId,
                name: name,
                email: email,
                phone: phone,
            }
            await contactsData.push(updateContact);
            const contactsDataJson = JSON.stringify(contactsData);
            await fs.writeFile(this.FILE_CONTACTS_PATH, contactsDataJson);
            return updateContact;
        }
        catch (err) {
            console.log(`Error updating contact with id ${contactId}`, err);
        }
    }

}

module.exports = new Contacts();