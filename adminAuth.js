import {
    getAuth, signInWithEmailAndPassword,
    db, addDoc, collection,auth
} from "./fireBase.mjs";

const createAdminBtn = document.getElementById('createAdminBtn');
createAdminBtn.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const auth = getAuth();  

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Admin signed in:", user.email);
            addAdminData(email, password);  
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error signing in:", errorCode, errorMessage);
        });
});
    
const addAdminData = async (email, password) => {
    try {
        await addDoc(collection(db, "Admin"), {
            Name: "Admin",
            email: email,  
            password: password  
        });
        window.location.href = 'studentList.html';

    } catch (e) {
        console.error("Error adding admin data: ", e);
    }
};
