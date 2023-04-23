$(document).ready(function () {
    // Get the student's email from localStorage
    const studentEmail = localStorage.getItem('studentEmail');
    // Use the student's email to load the appropriate data for that student
    loadStudent(studentEmail);
});

function loadStudent(studentEmail) {
    // Make an AJAX request to load the student's data based on their email
    $.ajax({
        url: "http://localhost:8080/load/" + studentEmail,
        method: "GET",
        success: function (student) {
            const studentId = student.studentId;
            const firstName = student.firstName;
            const lastName = student.lastName;
            const email = student.email;
            const majorId = student.majorId;
            const majorName = student.majorName;
            const enrolledCourseIds = student.enrolledCourseIds;
            const takenCourseIds = student.takenCourseIds;
            const neededCourseIds = student.neededCourseIds;
            const enrolledSections = student.enrolledSections;

            $('.student-id').text(studentId);
            $('#student-first-name').text(firstName);
            $('#student-last-name').text(lastName);
            $('#student-email').text(email);
            $('.student-major-id').text(majorId);
            $('.student-major-name').text(majorName);

            const enrolledCourses = enrolledCourseIds.split(",");
            const takenCourses = takenCourseIds ? takenCourseIds.split(",") : [];
            const neededCourses = neededCourseIds.split(",");
            const tableBody = $('#courses-table tbody');
                enrolledCourses.forEach(function (courseId) {
                const row = $('<tr>');
                row.append($('<td>').text(courseId));
                $('.enrolled-courses').append(row);
            });

            takenCourses.forEach(function (courseId) {
                const row = $('<tr>');
                row.append($('<td>').text(courseId));
                $('.taken-courses').append(row);
            });

            neededCourses.forEach(function (courseId) {
                const row = $('<tr>');
                row.append($('<td>').text(courseId));
                $('.needed-courses').append(row);
            });
            $('#student-enrolled-courses').text(enrolledCourses.length);
            $.ajax({
              url: "http://localhost:8080/loaduser/" + studentEmail,
              type: 'GET',
              success: function(data) {
                console.log(data);
                const responseObj = JSON.parse(data);
                const enrolledSections = responseObj.enrolledSections;
                const tableBody = $('#test-table-body');
                tableBody.empty();
                enrolledSections.forEach(section => {
                  const courseBuilding = section.courseBuilding;
                  const newRow = $('<tr>');
                  
                  const summary = $('<summary>').text(`Semester: ${section.semester} Section: ${section.courseId} `);
                  const details = $('<details>').append(summary);
                  
                  const courseRoom = $('<p>').text(`Course Room: ${section.courseRoom}`);
                  const courseCampus = $('<p>').text(`Campus: ${section.courseCampus}`);
                  const courseDates = $('<p>').text(`Course Dates: ${section.courseDates}`);
                  const courseDays = $('<p>').text(`Course Days: ${section.courseDays}`);
                  const courseTimes = $('<p>').text(`Course Times: ${section.courseTimes}`);
                  const courseType = $('<p>').text(`Course Type: ${section.courseType}`);
                  details.append(courseCampus,courseRoom,
                    courseDates, courseDays, courseTimes, courseType);
                  
                  const newCell = $('<td>').append(details);
                  
                  const dropButton = $('<button>').text('DROP').addClass('drop-button');
                  dropButton.on('click', function() {
                    const sectionId = section.sectionId;
                    const confirmMessage = `Are you sure you want to drop section ${section.courseId}?`;
                    if (confirm(confirmMessage)) {
                      $.ajax({
                        url: "http://localhost:8080/drop/" + studentEmail + "/" +sectionId,
                        method: 'GET',
                        success: function(response) {
                          window.location.href="user.html";
                        },
                        error: function(error) {
                          // handle error
                        }
                      });
                    }
                  });
                  
                  newCell.append(dropButton);
                  newRow.append(newCell);
                  tableBody.append(newRow);
                });
              },
              error: function(error) {
                // handle errors
              }
            });
        }
    });
}
