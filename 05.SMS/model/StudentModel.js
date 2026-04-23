import { student_db } from "../db/db.js";

// ------------------------------ Add Student -------------------------------
const addStudentData = (studentId, studentName, studentNic, studentPhone, studentAddress) => {
    const new_student = {
        id: studentId,
        name: studentName,
        nic: studentNic,
        phone: studentPhone,
        address: studentAddress
    };

    student_db.push(new_student);
    return new_student;
};

//------------------------- Update Student -------------------------
const updateStudentData = (index, studentId, studentName, studentNic, studentPhone, studentAddress) => {
    const student_obj = student_db[index];

    student_obj.id = studentId;
    student_obj.name = studentName;
    student_obj.nic = studentNic;
    student_obj.phone = studentPhone;
    student_obj.address = studentAddress;
    return student_obj;
};

//------------------------- Delete Student -------------------------
const deleteStudentData = (index) => {
    student_db.splice(index, 1);
    return true;
};

//------------------------- Get Student -------------------------
const getStudentData = (index) => {
    return student_db[index];
};

//------------------------- Get All Students -------------------------
const getAllStudentData = () => {
    return student_db;
};

//------------------------- Get Student data by index -------------------------
const getStudentDataByIndex = (index) => {
    return student_db[index];
};

// ------------------------ Get Student data by Id -------------------------
const getStudentDataById = (studentId) => {
    return student_db.find(item => item.id === studentId);
};

export { addStudentData, updateStudentData, deleteStudentData, getStudentData, getAllStudentData, getStudentDataByIndex, getStudentDataById };
