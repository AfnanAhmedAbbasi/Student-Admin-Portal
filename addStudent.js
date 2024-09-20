import { db, addDoc, collection } from "./fireBase.mjs";
const firstName = document.getElementById('fname');
const lastName = document.getElementById('lname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const cnic = document.getElementById('cnic');
const addStudentBtn = document.getElementById('addStudentBtn');

const addStudentData = async () => {
  try {
    await addDoc(collection(db, "students"), {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      cnic: cnic.value,
    });

    console.log("Document successfully written!");
    window.location.href='studentList.html'
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

addStudentBtn.addEventListener('click', addStudentData);
