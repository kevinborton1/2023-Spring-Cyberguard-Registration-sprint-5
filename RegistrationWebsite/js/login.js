$(document).ready(function () {
  $("#login").fadeIn(300, function () {
    hoverEffects();

    $("#loginBtn").on('click', function () {
      handleLogin();
    });

    $("#newStudentBtn").on('click', function () {
      $("#login").fadeOut(300, function () {
        window.location.href = "new-student.html";
      });
    });
  });
});

function handleLogin() {
  const email = document.getElementById("username").value;
  var encodedEmail = encodeURIComponent(email);
  const password = document.getElementById("password").value;
  $.ajax({
    url: "http://localhost:8080/studentVerify",
    method: "POST",
    data: JSON.stringify({ email: encodedEmail, password: password }),
    contentType: 'application/json',
    success: function (response) {
      console.log(response);
      if (response === 'OK') {
        // Store student's email in localStorage
        localStorage.setItem('studentEmail', encodedEmail);

        // Call loadStudent with Promise to display students name
        loadStudent(encodedEmail)
          .then((studentName) => {
            $("#formMessage").hide()
              .text("Login successful.")
              .fadeIn(300)
              .delay(2000)
              .fadeOut(150, function () {
                $("#login-form").fadeOut(150, function () {
                  $("#welcome")
                    .empty()
                    .append("<h1>Welcome back, " + studentName + "!</h1>")
                    .fadeIn(300)
                    .delay(3000)
                    .fadeOut(300, function () {
                      window.location.href = "student-home.html";
                    });
                });
              });
          })
          .catch((err) => {
            console.error("Error loading student:", err);
          });
      } else {
        console.log(response);
        $("#formMessage")
          .hide()
          .text("Login failed.")
          .fadeIn(300);
      }
    },
    error: function (response) {
      console.log(response);
      $("#formMessage")
        .hide()
        .text("Login failed. Please check your email and password and try again.")
        .fadeIn(300);
    },
  });
}

function hoverEffects() {
  $(".studentBtns").hover(function () {
    $(this).stop(true, false).animate({ "opacity": "1", "font-weight": "bolder" }, 250);
  }, function () {
    $(this).stop(true, false).animate({ "opacity": ".8", "font-size": "1em" }, 250);
  });
}

//loads a student with a promise in order to get the value of the students name to display. 
function loadStudent(studentEmail) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "http://localhost:8080/load/" + studentEmail,
      method: "GET",
      success: function (student) {
        resolve(student.firstName);
      },
      error: function (response) {
        console.log(response);
        reject(response);
      },
    });
  });
}