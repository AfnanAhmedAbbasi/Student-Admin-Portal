import { db, collection, getDocs, signOut, auth, onAuthStateChanged } from "./fireBase.mjs";

const tableBody = document.querySelector('tbody');

const fetchStudentData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "students"));
    let index = 1;
    
    querySnapshot.forEach((doc) => {
      const student = doc.data();
      const row = document.createElement('tr');
      row.innerHTML = `
        <th scope="row">${index++}</th>
        <td>${student.firstName}</td>
        <td>${student.lastName}</td>
        <td>${student.email}</td>
        <td>
          <button class="qwerty" data-id="${doc.id}">Student Profile</button>
          <button class="uploadMarksBtn" data-id="${doc.id}">Upload Marks</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  } catch (e) {
    console.error("Error retrieving student data: ", e);
  }
};


onAuthStateChanged(auth, (user) => {
  if (user) {
    fetchStudentData();
  } else {
    window.location.href = 'index.html';
  }
});


const signout = () => {
  signOut(auth)
    .then(() => {
      window.location.href = 'index.html'; 
    })
    .catch((error) => {
      console.log("Error=====>", error);
    });
};


const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', signout);
}


const addStudentBtn = document.getElementById('addStudentBtn2');
if (addStudentBtn) {
  addStudentBtn.addEventListener('click', () => {
    window.location.href = 'addStudent.html';
  });
}

tableBody.addEventListener('click', (event) => {
  if (event.target.classList.contains('qwerty')) {
    const studentId = event.target.getAttribute('data-id');
    window.location.href = `studentProfileAdmin.html?id=${studentId}`;
  } else if (event.target.classList.contains('uploadMarksBtn')) {
    const studentId = event.target.getAttribute('data-id');
    window.location.href = `uploadMarksAdmin.html?id=${studentId}`;
  }
});
