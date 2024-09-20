import { db, collection, getDocs, query, where } from "./fireBase.mjs";


const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const createAdminBtn = document.getElementById('createAdminBtn');

const handleLogin = async () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (email === "" || password === "") {
        alert("Please fill in all fields.");
        return;
    }

    try {
        const studentsRef = collection(db, "students");
        const q = query(studentsRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            alert("Account not found. Please create an account first.");
            window.location.href = 'createStudent.html'; 
        } else {
            querySnapshot.forEach((doc) => {
                const studentData = doc.data();
                if (studentData.password === password) {
                    window.location.href = `studentProfile.html?id=${doc.id}`; 
                } else {
                    alert("Incorrect password. Please try again.");
                }
            });
        }
    } catch (error) {
        console.error("Error checking student login: ", error);
    }
};


createAdminBtn.addEventListener('click', handleLogin);
