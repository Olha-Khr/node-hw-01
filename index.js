const argv = require("yargs").argv;
const { listContacts, getContactById, removeContact, addContact } = require("./contacts.js");


async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsList = await listContacts();
          console.table(contactsList);
      break;

    case "get":
      const getContact = await getContactById(id);
      console.log(getContact);
      break;

    case "add":
      const contactAdd = await addContact({ name, email, phone });
      console.table(contactAdd);
      break;

    case "remove":
      const contactRemove = await removeContact(id);
      console.log(contactRemove);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);