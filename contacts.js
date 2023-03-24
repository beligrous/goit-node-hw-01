const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    return error;
  }
}

async function getContactById(contactId) {
  const data = await listContacts();
  const contactIndex = data.findIndex((item) => item.id === contactId);
  if (contactIndex === -1) {
    console.log("There is no contact with such id !");
  }
  return data[contactIndex];
}

async function removeContact(contactId) {
  const data = await listContacts();
  const contactIndex = data.findIndex((item) => item.id === contactId);
  if (contactIndex === -1) {
    console.log("There is no contact with such id !");
  }
  const [result] = data.splice(contactIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 1));
  return result;
}

async function addContact(name, email, phone) {
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  const data = await listContacts();
  data.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 1));
  return newContact;
}

module.exports = { listContacts, removeContact, getContactById, addContact };
