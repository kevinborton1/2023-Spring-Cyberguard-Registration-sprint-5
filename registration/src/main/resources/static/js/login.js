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
      console.log(response)
      if (response === 'OK') {
        
        // Store student's email in localStorage
        localStorage.setItem('studentEmail', encodedEmail);

        $("#formMessage").hide()
          .text("Login successful.")
          .fadeIn(300)
          .delay(1000)
          .fadeOut(200, function () {
            window.location.href = "student-home.html";
          })
      } else {
        console.log(response)
        $("#formMessage")
        .hide()
        .text("Login failed.")
        .fadeIn(300)
      }
    },
    error: function (response) {
      console.log(response)
      $("#formMessage")
      .hide()
      .text("Login failed. Please check your email and password and try again.")
      .fadeIn(300)
    }
  });
}
function hoverEffects() {

  $(".studentBtns").hover(function () {
    $(this).stop(true, false).animate({ "opacity": "1", "font-weight": "bolder" }, 250);
  }, function () {
    $(this).stop(true, false).animate({ "opacity": ".8", "font-size": "1em" }, 250);
  });
}