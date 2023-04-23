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
            displayStudentHome(student);
        },
        error: function (response) {
            console.log(response)
        }
    });
}

function displayStudentHome(student) {
    $("#welcome")
        .empty()
        .append("<h1>Welcome back, " + student.firstName + "!</h1>")
        .fadeIn(300)
        .delay(3000)
        .fadeOut(300, function () {
            $("#navTitle")
                .empty()
                .hide()
                .append(student.firstName + " " + student.lastName + "'s Student Home")
                .fadeIn(200);
            $("#studentHome")
                .hide();
            $("<button>")
                .text("My Schedule")
                .addClass("homeBtn btn-primary")
                .attr("id", "Fall")
                .appendTo($("#myPlanner"));
            $("<button>")
                .text("Fall Enrollment")
                .addClass("homeBtn btn-primary")
                .attr("id", "enrollment")
                .appendTo($("#myPlanner"));
            $("#currentMajor")
            .empty()
            .append("<h2>Current Major: " + student.majorName +"</h2>");
            $("#studentHome").fadeIn(200, function(){
                enableHoverEffects();
                $("#enrollment").on('click', function () {
                    $("#container").fadeOut(300, function () {
                        window.location.href = "enrollment.html";
                      });
                  });
            })
        });
}

function enableHoverEffects() {
    $(".homeBtn").animate({ "opacity": ".8", "font-size": "1.5em" }, 250);

    $(".homeBtn").hover(function () {
        $(this).stop(true, false).animate({ "opacity": "1", "font-size": "1.8em" }, 250);
    }, function () {
        $(this).stop(true, false).animate({ "opacity": ".8", "font-size": "1.5em" }, 250);
    });
}