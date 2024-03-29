const Admin = require('../../../models/Admin');
const bcrypt = require('bcrypt');
const inquirer = require('inquirer');
const mongoose = require('mongoose');

require('dotenv').config({ path: '../../../.env' });
mongoose.connect(
  'mongodb+srv://bishal:OiPtAP9WytsGY42e@cluster0.klnbx.mongodb.net/?retryWrites=true&w=majority',
  (err) => {
    if (err) {
      return console.log(err);
    }
    console.log('Connected to db');
  }
);
const questions = [
  {
    type: 'input',
    name: 'name',
    message: 'Enter admin name.',
  },
  {
    type: 'input',
    name: 'email',
    message: 'Enter admin email.',
  },
  {
    type: 'input',
    name: 'password',
    message: 'Enter admin password.',
  },
];

//Registering new admin
const createADmin = async (name, email, plainPassword) => {
  const password = await bcrypt.hash(plainPassword, 10);
  const adminDB = await Admin.findOne({ email });
  if (adminDB) {
    console.log('Admin already registered');
  }

  const admin = new Admin({ name, email, password });
  try {
    const newAdmin = await admin.save();
    if (newAdmin) {
      console.log('New admin registered with following details.');
      console.log(newAdmin);
    }
  } catch (error) {
    console.log(error);
  }
};
// Reading values from terminal
createADmin('Bishal Niroula', 'niroulabishal199@gmail.com', 'password');
// inquirer.prompt(questions).then(({ name, email, password }) => {
// // console.log("name", name);
//   createADmin(name, email, password);
// });
