import { db, doc, getDoc, updateDoc } from "./fireBase.mjs";

const fetchStudentData = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const studentId = urlParams.get('id'); 

    if (studentId) {
        try {
            const docRef = doc(db, "students", studentId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const student = docSnap.data();
                document.getElementById('updatefirstname').value = student.firstName;
                document.getElementById('updatelastname').value = student.lastName;
                document.getElementById('updatecnicn').value = student.cnic;
            } else {
                console.error("No such student document!");
            }
        } catch (error) {
            console.error("Error fetching student data: ", error);
        }
    } else {
        console.error("No student ID provided in URL.");
    }
};

const updateStudentData = async (studentId) => {
    const firstName = document.getElementById('updatefirstname').value;
    const lastName = document.getElementById('updatelastname').value;
    const cnic = document.getElementById('updatecnicn').value;

    if (firstName && lastName && cnic) {
        try {
            const docRef = doc(db, "students", studentId);
            await updateDoc(docRef, {
                firstName: firstName,
                lastName: lastName,
                cnic: cnic,
            });
            alert("Student details updated successfully!");
            setTimeout(() => {
                window.location.href = `studentProfile.html?id=${studentId}`; 
            }, 1000);
        } catch (error) {
            console.error("Error updating student data: ", error);
        }
    } else {
        alert("Please fill out all fields.");
    }
};

document.getElementById('uploadBtn').addEventListener('click', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const studentId = urlParams.get('id'); 
    if (studentId) {
        await updateStudentData(studentId);
    }
});

fetchStudentData();

