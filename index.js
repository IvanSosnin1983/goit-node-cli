import { program } from 'commander';
import { addContact, getContactById, listContacts, removeContact } from './contacts.js';
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const allContacts = await listContacts();
      console.table(allContacts);
      break;

    case 'get':
      const searchContact = await getContactById(id);
      console.log(searchContact);
      break;

    case 'add':
      const addedContact = await addContact(name, email, phone);
      console.log(addedContact);
      break;

    case 'remove':
      const delContact = await removeContact(id);
      console.log(delContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(options);
