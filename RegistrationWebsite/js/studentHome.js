$(document).ready(function () {
    $("body").addClass("studentHome");
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
    $("#navTitle").hide();
    $("#navTitle").text(student.firstName + "'s Home");
    $("#navTitle").fadeIn(300);
    $("#studentHome")
        .hide();
    $("<button>")
        .text("Spring 2023 Enrollment")
        .addClass("homeBtn btn-primary")
        .attr("id", "spring")
        .appendTo($("#myPlanner"));
    $("<button>")
        .text("Maymester 2023")
        .addClass("homeBtn btn-primary")
        .attr("id", "maymester")
        .appendTo($("#myPlanner"));
    $("<button>")
        .text("Summer 2023 Enrollment")
        .addClass("homeBtn btn-primary")
        .attr("id", "summer")
        .appendTo($("#myPlanner"));
    $("<button>")
        .text("Fall 2023 Enrollment")
        .addClass("homeBtn btn-primary")
        .attr("id", "fall")
        .appendTo($("#myPlanner"));
    $("<button>")
        .text("User Page")
        .addClass("homeBtn btn-primary")
        .attr("id", "user")
        .appendTo($("#myPlanner"));
    $("#currentMajor")
        .empty()
        .append("<h2>Current Major: " + student.majorName + "</h2>");
    $("#studentHome").fadeIn(200, function () {
        enableHoverEffectsHome();
        $("#spring").on('click', function () {
            $("#myPlanner").fadeOut(300, function () {
                $("#navTitle").fadeOut(100);
                $("#navTitle").text("Spring Enrollment");
                $("#navTitle").fadeIn(300);
                $("body").addClass("spring");
                $("#myPlanner").empty();
                $("<button>")
                    .text("Spring 1/ Spring 2")
                    .addClass("filterBtn btn-primary")
                    .attr("id", "springOneTwo")
                    .appendTo($("#myPlanner"));
                $("<button>")
                    .text("Spring Full")
                    .addClass("filterBtn btn-primary")
                    .attr("id", "springFull")
                    .appendTo($("#myPlanner"));
                $("#myPlanner").fadeIn(300, function () {
                    enableHoverEffectsFilter();
                    $("#springOneTwo").on('click', function () {
                        $("#container").fadeOut(300, function () {
                            localStorage.setItem('selectedSemester', 'spring');
                            window.location.href = "enrollment.html";
                        });
                    });
                    $("#springFull").on('click', function () {
                        $("#container").fadeOut(300, function () {
                            localStorage.setItem('selectedSemester', 'springFull');
                            window.location.href = "enrollment.html";
                        });
                    });
                })
            });
        });
        $("#maymester").on('click', function () {
            $("#container").fadeOut(300, function () {
                localStorage.setItem('selectedSemester', 'maymester');
                window.location.href = "enrollment.html";
            });
        });
        $("#summer").on('click', function () {
            $("#myPlanner").fadeOut(300, function () {
                $("#navTitle").fadeOut(100);
                $("#navTitle").text("Summer Enrollment");
                $("#navTitle").fadeIn(300);
                $("body").addClass("summer");
                $("#myPlanner").empty();
                $("<button>")
                    .text("Summer 1/ Summer 2")
                    .addClass("filterBtn btn-primary")
                    .attr("id", "summerOneTwo")
                    .appendTo($("#myPlanner"));
                $("<button>")
                    .text("Summer Full")
                    .addClass("filterBtn btn-primary")
                    .attr("id", "summerFull")
                    .appendTo($("#myPlanner"));
                $("#myPlanner").fadeIn(300, function () {
                    enableHoverEffectsFilter();
                    $("#summerOneTwo").on('click', function () {
                        $("#container").fadeOut(300, function () {
                            localStorage.setItem('selectedSemester', 'summer');
                            window.location.href = "enrollment.html";
                        });
                    });
                    $("#summerFull").on('click', function () {
                        $("#container").fadeOut(300, function () {
                            localStorage.setItem('selectedSemester', 'summerFull');
                            window.location.href = "enrollment.html";
                        });
                    });
                })
            });
        });
        $("#fall").on('click', function () {
            $("#myPlanner").fadeOut(300, function () {
                $("#navTitle").fadeOut(100);
                $("#navTitle").text("Fall Enrollment");
                $("#navTitle").fadeIn(300);
                $("body").addClass("fall");
                $("#myPlanner").empty();
                $("<button>")
                    .text("Fall 1/ Fall 2")
                    .addClass("filterBtn btn-primary")
                    .attr("id", "fallOneTwo")
                    .appendTo($("#myPlanner"));
                $("<button>")
                    .text("Fall Full")
                    .addClass("filterBtn btn-primary")
                    .attr("id", "fallFull")
                    .appendTo($("#myPlanner"));
                $("#myPlanner").fadeIn(300, function () {
                    enableHoverEffectsFilter();
                    $("#fallOneTwo").on('click', function () {
                        $("#container").fadeOut(300, function () {
                            localStorage.setItem('selectedSemester', 'fall');
                            window.location.href = "enrollment.html";
                        });
                    });
                    $("#fallFull").on('click', function () {
                        $("#container").fadeOut(300, function () {
                            localStorage.setItem('selectedSemester', 'fallFull');
                            window.location.href = "enrollment.html";
                        });
                    });
                })
            });
        });
        $("#user").on('click', function () {
            $("#container").fadeOut(300, function () {
                window.location.href = "user.html";
            });
        });
    })

}

function enableHoverEffectsHome() {
    $(".homeBtn").css({
        "opacity": ".8",
        "font-size": "1.5em",
        "background-color": "#0F993D",
        "color": "rgb(255, 255, 255)"
    });
    $(".homeBtn").hover(function () {
        $(this).stop(true, false).animate({
            "opacity": "1",
            "font-size": "1.8em",
            "backgroundColor": "#00E54B",
            "color": "rgb(0, 0, 0)"
        }, { duration: 250, queue: false });
    }, function () {
        $(this).stop(true, false).animate({
            "opacity": ".8",
            "font-size": "1.5em",
            "backgroundColor": "#0F993D",
            "color": "rgb(255, 255, 255)"
        }, { duration: 250, queue: false });
    });
}

function enableHoverEffectsFilter() {
    $(".filterBtn").css({
        "opacity": ".8",
        "font-size": "1.5em",
        "background-color": "#0F6799",
        "color": "rgb(255, 255, 255)"
    });
    $(".filterBtn").hover(function () {
        $(this).stop(true, false).animate({
            "opacity": "1",
            "font-size": "1.8em",
            "backgroundColor": "#0092E6",
            "color": "rgb(0, 0, 0)"
        }, { duration: 250, queue: false });
    }, function () {
        $(this).stop(true, false).animate({
            "opacity": ".8",
            "font-size": "1.5em",
            "backgroundColor": "#0F6799",
            "color": "rgb(255, 255, 255)"
        }, { duration: 250, queue: false });
    });
}