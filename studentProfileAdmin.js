import { db, doc, getDoc } from "./fireBase.mjs";

const afname = document.querySelector('.afname');
const alname = document.querySelector('.alname');
const aemail = document.querySelector('.aemail');
const apassword = document.querySelector('.apassword');
const acnic = document.querySelector('.acnic');
const acourse = document.querySelector('.acourse');
const atotalMarks = document.querySelector('.atotalmarks');
const aobtainedMarks = document.querySelector('.aobtainedmarks');
const astudentId = document.querySelector('.astudentid');
const agrade = document.querySelector('.agrade');


const urlParams = new URLSearchParams(window.location.search);
const studentId = urlParams.get('id');


const fetchStudentProfile = async (id) => {
  try {
  
    const docRef = doc(db, "students", id);
    const docSnap = await getDoc(docRef); 

    if (docSnap.exists()) {
      const student = docSnap.data();

      afname.textContent = student.firstName || "Data not available";
      alname.textContent = student.lastName || "Data not available";
      aemail.textContent = student.email || "Data not available";
      apassword.textContent = student.password || "Data not available";
      acnic.textContent = student.cnic || "Data not available";
      acourse.textContent = student.course || "Data not available";
      atotalMarks.textContent = student.totalMarks || "Data not available";
      aobtainedMarks.textContent = student.obtainedMarks || "Data not available";
      astudentId.textContent = student.studentId || "Data not available";
      agrade.textContent = student.grade || "Data not available";
    } else {
      console.error("No such student document found in Firestore!");
    }
  } catch (e) {
    console.error("Error retrieving student profile: ", e);
  }
};


if (studentId) {
  fetchStudentProfile(studentId);
}
