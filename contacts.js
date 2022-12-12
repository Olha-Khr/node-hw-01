const fs = require("fs/promises");
const path = require("path");


const contactsPath = path.join("./db", 'contacts.json')

const listContacts = async () => {
    const result = await fs.readFile(contactsPath);
    return JSON.parse(result);
}

const getContactById = async (contactId) => {
    console.log(contactId);
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    return result || null
}


const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId)
    if (index === -1) {
        return null
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return result
}

const addContact = async (name, email, phone) => {
    const contacts = await listContacts();
    const newContact = {
        id: uuidv4(),
        name,
        email,
        phone,
    }
    const contactList = JSON.stringify([...contacts, newContact], null, 2)
    await fs.writeFile(contactsPath, contactList)
    return newContact
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}