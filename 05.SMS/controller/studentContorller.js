import { student_db } from "../db/db";
    // ------------------------ Selected Student Index --------------------------
        let selected_index = -1;

    // ------------------------ Regex --------------------------
        const nic_regex = new RegExp("^(([5,6,7,8,9]{1})([0-9]{1})([0,1,2,3,5,6,7,8]{1})([0-9]{6})([v|V|x|X]))|(([1,2]{1})([0,9]{1})([0-9]{2})([0,1,2,3,5,6,7,8]{1})([0-9]{7}))$");
        const phone_number_regex = new RegExp("^([0]{1}[7]{1}[01245678]{1}[0-9]{7}$)");

    // ------------------------ Clean Student form --------------------------
        const clearForm = () => {
            $('#btnReset').click();
            selected_index = -1;
        }

    // ------------------------ Load Student Table -------------------------
        const loadStudentTbl = () => {

            $('#studentTableBody').empty();

            student_db.map(item => {
                let data = `${item.id},${item.name},${item.nic},${item.phone},${item.address}`;
                let new_row = `<tr data-index="${data}"> <td>${item.id}</td> <td>${item.name}</td> <td>${item.nic}</td> <td>${item.phone}</td> <td>${item.address}</td> </tr>`;
                $('#studentTableBody').append(new_row);
            });

        }

    // ------------------------ Click on student Row -------------------------
        $('#studentTableBody').on('click', 'tr', function() {

            let index = $(this).index();
            selected_index = index;
            let student_obj = student_db[index];        // let student_obj = student_db[$(this).index()];    meham optimise karala dnn apuluwan

            $('#studentId').val(student_obj.id);        // $('#studentId').val(student_db[$(this).index()].id);   meham optimise karala dnn apuluwan
            $('#studentName').val(student_obj.name);
            $('#studentNic').val(student_obj.nic);
            $('#studentPhone').val(student_obj.phone);
            $('#studentAddress').val(student_obj.address);        
        });

    // ------------------------ Start : Student Add Handler -------------------------
        $('.btn-save').on('click', function () {

            

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
            if (student_db.some(item => item.id === studentId)) {
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
            if (!nic_regex.test(studentNic)) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Invalid NIC Number!",
                });
                return;
            }
            if (!phone_number_regex.test(studentPhone)) {
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

            const addStudebtData = (studentId, studentName, studentNic, studentPhone, studentAddress) => {
                let new_student = {
                    id: studentId,
                    name: studentName,
                    nic: studentNic,
                    phone: studentPhone,
                    address: studentAddress
                };
                student_db.push(new_student);
                loadStudentTbl();
            }

            // data tika array ekakin dna widiha
            addStudebtData(studentId, studentName, studentNic, studentPhone, studentAddress);
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
    $('.btn-update').on('click', function () {

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
        

        // error showing
        if (studentId == "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "ID is required!",
            });
            return;
        }
        if (studentId !== student_db[selected_index].id) {
            if (student_db.some(item => item.id === studentId)) {
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
        if (!nic_regex.test(studentNic)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Invalid NIC Number!",
            });
            return;
        }
        if (!phone_number_regex.test(studentPhone)) {
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

        let student_obj = student_db[selected_index];

        student_obj.id = studentId;
        student_obj.name = studentName;
        student_obj.nic = studentNic;
        student_obj.phone = studentPhone;
        student_obj.address = studentAddress;

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
    $('.btn-delete').on('click', function () {

        if (selected_index === -1) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please select a student first!",
            });
            return;
        }

        student_db.splice(selected_index, 1);
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
