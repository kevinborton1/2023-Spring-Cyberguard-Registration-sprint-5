$(document).ready(function() {
    $('#admin-loginBtn').click(async function() {
      const username = $('#username-input').val();
      const password = $('#password-input').val();
  
      // Perform input validation if necessary
  
      try {
        const response = await fetch('/admin/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
  
        if (response.ok) {
          const result = await response.json();
          // Handle successful login (e.g., hide the login form and show the "Find Student" form)
          $('#admin-login').hide();
          $('#find-student').show();
        } else {
          // Handle error (e.g., display an error message)
        }
      } catch (error) {
        console.error('Error:', error);
        // Handle fetch error (e.g., display an error message)
      }
    });
  });
  
  
//     // Add event listener for the "Find Student" form
//     $('#searchBtn').click(async function() {
//       const searchValue = $('#search').val();
//       // Perform input validation if necessary
  
//       try {
//         // Replace '/admin/search' with the appropriate endpoint in your application
//         const response = await fetch('/admin/search', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ search: searchValue }),
//         });
  
//         if (response.ok) {
//           const student = await response.json();
//           // Handle the search result (e.g., display the student information or show a "Student not found" message)
//         } else {
//           // Handle search error (e.g., display an error message)
//         }
//       } catch (error) {
//         console.error('Error:', error);
//         // Handle fetch error (e.g., display an error message)
//       }
//     });


//   $('#searchBtn').click(async function() {
//     const searchValue = $('#search').val();
//     // Perform input validation if necessary
  
//     try {
//       // Replace '/admin/search' with the appropriate endpoint in your application
//       const response = await fetch('/admin/search', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ search: searchValue }),
//       });
  
//       if (response.ok) {
//         const student = await response.json();
//         // Display the student information
//         $('#student-name').text(`Name: ${student.name}`);
//         $('#student-email').text(`Email: ${student.email}`);
//         // Update other fields as needed
//         $('#student-info').show();
//       } else {
//         console.log(response)
//         $("#formMessage")
//         .hide()
//         .text("Could not find student, please try again.")
//         .fadeIn(300)
//         // Handle search error (e.g., display an error message)
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       // Handle fetch error (e.g., display an error message)
//     }
//   });
   

//   // Event listener for the "Add Class" button
// $('#add-class-btn').click(async function() {
//     const courseId = $('#class-select').val();
//     const studentId = /* Get the student ID from the displayed information */;
    
//     // Perform input validation if necessary
  
//     try {
//       // Replace '/admin/add-class' with the appropriate endpoint in your application
//       const response = await fetch('/admin/add-class', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ studentId, courseId }),
//       });
  
//       if (response.ok) {
//         // Update the UI to reflect the added class (e.g., update the list of enrolled classes)
//       } else {
//         // Handle error (e.g., display an error message)
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       // Handle fetch error (e.g., display an error message)
//     }
//   });
  
  
//   // Event listener for the "Drop Class" button
//   $('#drop-class-btn').click(async function() {
//     // Similar logic as the "Add Class" button event listener, but for dropping a class
//   });
  
//   // Event listener for the "Assign Grade" button
//   $('#assign-grade-btn').click(async function() {
//     const completedClassId = $('#completed-class-select').val();
//     const grade = $('#grade-select').val();
//     const studentId = /* Get the student ID from the displayed information */;
    
//     // Perform input validation if necessary
    
//     try {
//       // Replace '/admin/assign-grade' with the appropriate endpoint in your application
//       const response = await fetch('/admin/assign-grade', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ studentId, completedClassId, grade }),
//       });
  
//       if (response.ok) {
//         // Update the UI to reflect the assigned grade (e.g., update the list of completed classes with grades)
  
