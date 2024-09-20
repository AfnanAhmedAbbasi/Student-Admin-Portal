import { db, collection, addDoc } from "./fireBase.mjs";

const fnameInput = document.getElementById('fname');
const lnameInput = document.getElementById('lname');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const cnicInput = document.getElementById('cnic');

const addStudentBtn = document.getElementById('addStudentBtn3');

const addStudentToFirestore = async () => {
  try {
    const studentData = {
      firstName: fnameInput.value,
      lastName: lnameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
      cnic: cnicInput.value
    };

    await addDoc(collection(db, "students"), studentData);

    alert('Student account created successfully.');

    // window.location.href = 'studentList.html'; // Uncomment if you want to redirect
    fnameInput.value = '';
    lnameInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';
    cnicInput.value = '';

  } catch (e) {
    console.error("Error adding student to Firestore: ", e);
  }
};

addStudentBtn.addEventListener('click', addStudentToFirestore);


const loginStudentBtn=document.getElementById('loginStudentBtn');
loginStudentBtn.addEventListener('click',()=>{
    window.location.href='loginStudent.html'
})
