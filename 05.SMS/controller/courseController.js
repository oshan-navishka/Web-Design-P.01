// ------------------------ Course DB --------------------------
        let course_db = [];

// ------------------------ Selected Course Index --------------------------
        let selected_index = -1;


// ------------------------ Clean Course form --------------------------
        const clearForm = () => {
            $('#btnReset').click();
            selected_index = -1;
        };

// ------------------------ Get Data -------------------------------
        const getFormData = () => ({
            id: $('#courseId').val().trim(),
            name: $('#courseName').val().trim(),
            code: $('#courseCode').val().trim(),
            duration: $('#courseDuration').val().trim(),
            description: $('#courseDescription').val().trim()
        });

// ------------------------- Validation Data ------------------------------
        const isValidFormData = (data) => {
            if (data.id === '') {
                Swal.fire({ icon: 'error', title: 'Oops...', text: 'Course ID is required!' });
                return false;
            }
            if (data.code === '') {
                Swal.fire({ icon: 'error', title: 'Oops...', text: 'Course Code is required!' });
                return false;
            }
            if (data.name === '') {
                Swal.fire({ icon: 'error', title: 'Oops...', text: 'Course Name is required!' });
                return false;
            }
            if (data.duration === '') {
                Swal.fire({ icon: 'error', title: 'Oops...', text: 'Course Duration is required!' });
                return false;
            }
            if (data.description === '') {
                Swal.fire({ icon: 'error', title: 'Oops...', text: 'Course Description is required!' });
                return false;
            }
            return true;
        };

// ------------------------ Load Course Table -------------------------
        const loadCourseTbl = () => {
            $('#courseTableBody').empty();

            course_db.forEach((item) => {
                const new_row = `<tr><td>${item.id}</td><td>${item.name}</td><td>${item.code}</td><td>${item.duration}</td><td>${item.description}</td></tr>`;
                $('#courseTableBody').append(new_row);
            });
        };

// ------------------------ Click on course Row -------------------------
        $('#courseTableBody').on('click', 'tr', function () {
            selected_index = $(this).index();
            const selectedCourse = course_db[selected_index];

            $('#courseId').val(selectedCourse.id);
            $('#courseName').val(selectedCourse.name);
            $('#courseCode').val(selectedCourse.code);
            $('#courseDuration').val(selectedCourse.duration);
            $('#courseDescription').val(selectedCourse.description);
        });

// ------------------------ Start : Course Add Handler -------------------------    
        $('.btn-save').on('click', function () {
            const data = getFormData();

            if (!isValidFormData(data)) {
                return;
            }
            if (course_db.some(item => item.id === data.id)) {
                Swal.fire({ icon: 'error', title: 'Oops...', text: 'Course ID already exists!' });
                return;
            }
            if (course_db.some(item => item.code === data.code)) {
                Swal.fire({ icon: 'error', title: 'Oops...', text: 'Course Code already exists!' });
                return;
            }

            course_db.push(data);
            loadCourseTbl();
            Swal.fire({ position: 'center', icon: 'success', title: 'Course Added Successfully!', showConfirmButton: false, timer: 1500 });
            clearForm();
        });
// ------------------------ End : Course Add Handler -------------------------


// ------------------------ Start : Course Update Handler -------------------------
        $('.btn-update').on('click', function () {
            if (selected_index === -1) {
                Swal.fire({ icon: 'error', title: 'Oops...', text: 'Please select a course first!' });
                return;
            }

            const data = getFormData();
            if (!isValidFormData(data)) {
                return;
            }

            if (data.id !== course_db[selected_index].id && course_db.some(item => item.id === data.id)) {
                Swal.fire({ icon: 'error', title: 'Oops...', text: 'Course ID already exists!' });
                return;
            }
            if (data.code !== course_db[selected_index].code && course_db.some(item => item.code === data.code)) {
                Swal.fire({ icon: 'error', title: 'Oops...', text: 'Course Code already exists!' });
                return;
            }

            course_db[selected_index] = data;
            loadCourseTbl();
            Swal.fire({ position: 'center', icon: 'success', title: 'Course updated successfully!', showConfirmButton: false, timer: 1500 });
            clearForm();
        });
// ------------------------ End : Course Update Handler -------------------------


// ------------------------ Start : Course Delete Handler -------------------------
        $('.btn-delete').on('click', function () {
            if (selected_index === -1) {
                Swal.fire({ icon: 'error', title: 'Oops...', text: 'Please select a course first!' });
                return;
            }

            course_db.splice(selected_index, 1);
            loadCourseTbl();
            Swal.fire({ position: 'center', icon: 'success', title: 'Course deleted successfully!', showConfirmButton: false, timer: 1500 });
            clearForm();
        });
// ------------------------ End : Course Delete Handler -------------------------