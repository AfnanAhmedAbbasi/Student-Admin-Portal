import { db, doc, getDoc, updateDoc } from "./fireBase.mjs";

const afname = document.querySelector('.afname');
const alname = document.querySelector('.alname');
const aemail = document.querySelector('.aemail');
const apassword = document.querySelector('.apassword');
const acnic = document.querySelector('.acnic');

const courseInput = document.getElementById('courseInput');
const obtainedMarksInput = document.getElementById('obtainedMarksInput');
const totalMarksInput = document.getElementById('totalMarksInput');
const studentIdInput = document.getElementById('studentIdInput');
const gradeInput = document.getElementById('gradeInput');
const uploadBtn = document.getElementById('uploadBtn');

const inputs = [courseInput, obtainedMarksInput, totalMarksInput, studentIdInput, gradeInput];

const urlParams = new URLSearchParams(window.location.search);
const studentId = urlParams.get('id');

const fetchStudentProfile = async (id) => {
  try {
    const docRef = doc(db, "students", id); 
    const docSnap = await getDoc(docRef); 

    if (docSnap.exists()) {
      const student = docSnap.data();   
      afname.textContent = student.firstName;
      alname.textContent = student.lastName;
      aemail.textContent = student.email;
      apassword.textContent = student.password;
      acnic.textContent = student.cnic;
    } else {
      console.error("No such student document!");
    }
  } catch (e) {
    console.error("Error retrieving student profile: ", e);
  }
};

const updateStudentDetails = async () => {
  try {
    const docRef = doc(db, "students", studentId);
    await updateDoc(docRef, {
      course: courseInput.value,
      obtainedMarks: obtainedMarksInput.value,
      totalMarks: totalMarksInput.value,
      grade: gradeInput.value
    });
    alert('Student details uploaded successfully');
  } catch (e) {
    console.error("Error updating student details: ", e);
  }
};


if (studentId) {
  fetchStudentProfile(studentId);
}
uploadBtn.addEventListener('click', async () => {
  const allFilled = inputs.every(input => input.value.trim() !== '');

  if (allFilled) {
    await updateStudentDetails();
    
    inputs.forEach(input => {
      input.value = '';
      input.disabled = false;
    });
    uploadBtn.disabled = false;

    console.log('All details uploaded and fields reset');
  } else {
    alert('Please fill all fields before uploading.');
  }
});
