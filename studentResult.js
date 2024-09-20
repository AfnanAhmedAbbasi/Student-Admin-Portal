import { db, doc, getDoc } from "./fireBase.mjs";

const fetchStudentData = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const studentId = urlParams.get('id');

    if (studentId) {
        try {
            const docRef = doc(db, "students", studentId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const student = docSnap.data();
                
                if (student.totalMarks) {
                    document.getElementById('totalMarks').value = student.totalMarks;
                }

                if (student.obtainedMarks) {
                    document.getElementById('obtainedMarks').value = student.obtainedMarks;
                }
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

const calculateResult = () => {
    const totalMarks = parseFloat(document.getElementById('totalMarks').value);
    const obtainedMarks = parseFloat(document.getElementById('obtainedMarks').value);
    
    if (!isNaN(totalMarks) && !isNaN(obtainedMarks)) {
        const percentage = (obtainedMarks / totalMarks) * 100;
        document.getElementById('actualResult').value = percentage.toFixed(2) + '%';
    } else {
        alert("Please enter valid marks.");
    }
};

document.getElementById('calculateBtn').addEventListener('click', calculateResult);
fetchStudentData();
