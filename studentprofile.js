import { db, doc, getDoc ,signOut,auth} from "./fireBase.mjs";

const fetchStudentData = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const studentId = urlParams.get('id');

    if (studentId) {
        try {
            const docRef = doc(db, "students", studentId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const student = docSnap.data();
                document.getElementById('studentName').textContent = `${student.firstName} ${student.lastName}`;
                document.getElementById('greetingName').textContent = `${student.firstName} ${student.lastName}`;

                const editProfile = document.getElementById('editProfile');
                editProfile.addEventListener('click', () => {
                    window.location.href = `studentEditProfile.html?id=${studentId}`; 
                });
            } else {
                console.error("No such student document!");
            }
        } catch (error) {
            console.error("Error fetching student data: ", error);
        }
    } else {
        console.error("No student ID provided in URL.");
    }
    const seeResult=document.getElementById('seeResult');
    seeResult.addEventListener('click',()=>{
        window.location.href = `studentResult.html?id=${studentId}`;
    });
};
fetchStudentData();


const signoutfunction = () => {
    signOut(auth)
      .then(() => {
        window.location.href = 'index.html'; 
      })
      .catch((error) => {
        console.log("Error=====>", error);
      });
  };
  
  
  const logoutBtn = document.getElementById('seeResultlogot');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', signoutfunction);
  }

