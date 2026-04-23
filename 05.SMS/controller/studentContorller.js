import { check_nic, check_phone_number } from "../util/regex_util.js";
import { addStudentData, updateStudentData, deleteStudentData, getAllStudentData, getStudentDataByIndex, getStudentDataById } from "../model/StudentModel.js";

const studentScope = $('#studentSection').length ? '#studentSection ' : '';
const studentResetButton = $('#studentSection').length ? '#student_btnReset' : '#btnReset';

    // ------------------------ Selected Student Index --------------------------
        let selected_index = -1;

    // ------------------------ Clean Student form --------------------------
        const clearForm = () => {
            $(studentResetButton).click();
            selected_index = -1;
        }

    // ------------------------ Load Student Table -------------------------
        const loadStudentTbl = () => {

            $('#studentTableBody').empty();

            getAllStudentData().map(item => {
                let data = `${item.id},${item.name},${item.nic},${item.phone},${item.address}`;
                let new_row = `<tr data-index="${data}"> <td>${item.id}</td> <td>${item.name}</td> <td>${item.nic}</td> <td>${item.phone}</td> <td>${item.address}</td> </tr>`;
                $('#studentTableBody').append(new_row);
            });

        }

    // ------------------------ Click on student Row -------------------------
        $('#studentTableBody').on('click', 'tr', function() {

            const index = $(this).index();
            selected_index = index;
            const student_obj = getStudentDataByIndex(index);

            if (!student_obj) {
                return;
            }

            $('#studentId').val(student_obj.id);
            $('#studentName').val(student_obj.name);
            $('#studentNic').val(student_obj.nic);
            $('#studentPhone').val(student_obj.phone);
            $('#studentAddress').val(student_obj.address);        
        });

    // ------------------------ Start : Student Add Handler -------------------------
        $(`${studentScope}.btn-save`).on('click', function () {

            // Get form values
            const studentId = $('#studentId').val();
            const studentName = $('#studentName').val();
            const studentNic = $('#studentNic').val();
            const studentPhone = $('#studentPhone').val();
            const studentAddress = $('#studentAddress').val();


            // error showing
            if (studentId == "") {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "ID is required!",
                });
                return;
            }
            if (getStudentDataById(studentId)) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "ID already exists!",
                });
                return;
            }
            if (studentName == "") {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Name is required!",
                });
                return;
            }
            if (studentNic == "") {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "NIC is required!",
                });
                return;
            }
            if (studentPhone == "") {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Phone is required!",
                });
                return;
            }
            if (!check_nic(studentNic)) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Invalid NIC Number!",
                });
                return;
            }
            if (!check_phone_number(studentPhone)) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Invalid Phone Number!",
                });
                return;
            }
            if (studentAddress == "") {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Address is required!",
                });
                return;
            }

            // data tika array ekakin dna widiha
            addStudentData(studentId, studentName, studentNic, studentPhone, studentAddress);
            loadStudentTbl();
            Swal.fire({
                position: "justify-center",
                icon: "success",
                title: "Student Added Successfully!",
                showConfirmButton: false,
                timer: 1500
            });
            clearForm(); 
        });
    // ------------------------ End : Student Add Handler -----------------------------


    // ------------------------ Start : Student Update Handler -------------------------
    $(`${studentScope}.btn-update`).on('click', function () {

        if (selected_index === -1) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please select a student first!",
            });
            return;
        }

        // Get form values
        const studentId = $('#studentId').val();
        const studentName = $('#studentName').val();
        const studentNic = $('#studentNic').val();
        const studentPhone = $('#studentPhone').val();
        const studentAddress = $('#studentAddress').val();

        const currentStudent = getStudentDataByIndex(selected_index);
        

        // error showing
        if (studentId == "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "ID is required!",
            });
            return;
        }
        if (studentId !== currentStudent.id) {
            if (getStudentDataById(studentId)) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "ID already exists!",
                });
                return;
            }
        }
        if (studentName == "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Name is required!",
            });
            return;
        }
        if (!check_nic(studentNic)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Invalid NIC Number!",
            });
            return;
        }
        if (!check_phone_number(studentPhone)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Invalid Phone Number!",
            });
            return;
        }
        if (studentAddress == "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Address is required!",
            });
            return;
        }

        updateStudentData(selected_index, studentId, studentName, studentNic, studentPhone, studentAddress);
        loadStudentTbl();
        Swal.fire({
            position: "justify-center",
            icon: "success",
            title: "Student updated successfully!",
            showConfirmButton: false,
            timer: 1500
        });
        clearForm();
    });
    // ------------------------ End : Student Update Handler --------------------------

    
    // ------------------------ Start : Student Delete Handler -------------------------
    $(`${studentScope}.btn-delete`).on('click', function () {

        if (selected_index === -1) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please select a student first!",
            });
            return;
        }

        deleteStudentData(selected_index);
        loadStudentTbl();
        Swal.fire({
            position: "justify-center",
            icon: "success",
            title: "Student Deleted Successfully!",
            showConfirmButton: false,
            timer: 1500
        });
        clearForm();
    });
    // ------------------------ End : Student Delete Handler ---------------------------
