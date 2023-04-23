$(document).ready(function () {
    // Get the student's email from localStorage
    const studentEmail = localStorage.getItem('studentEmail');
    // Use the student's email to load the appropriate data for that student
    $("#container").fadeIn(300, function () {
        loadStudent(studentEmail);
    });
});

function loadStudent(studentEmail) {
    // Make an AJAX request to load the student's data based on their email
    $.ajax({
        url: "http://localhost:8080/load/" + studentEmail,
        method: "GET",
        success: function (student) {
            displayEnrollmentHome(student);
        },
        error: function (response) {
            console.log(response)
        }
    });
}

function displayEnrollmentHome(student) {
    $("#container").fadeOut(200, function () {
        $("#container").css({
            "backdrop-filter": "blur(0)",
            "box-shadow": "none",
            "width": "98%",
            "background-color": "transparent"
        });
        $("#navTitle")
            .empty()
            .hide()
            .append(student.majorName + "&nbsp;|&nbsp;Enrollment")
        $("#container").fadeIn(300, function () {
            displayRequirements(student);
        });
    });
}

function displayRequirements(student) {
    let email = student.email;
    let semesterNames = ["2023 Fall 1", "2023 Fall 2"];
    let semesterDiv = 0;
    $.each(semesterNames, function (index, semesterName) {
        let requirementsUrl = "http://localhost:8080/enrollment/" + semesterName + "/" + email;
        $.ajax({
            url: requirementsUrl,
            type: "GET",
            dataType: "JSON",
            success: function (sections) {
                semesterDiv++;
                displaySections(sections, semesterName, semesterDiv);

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
    });

    function displaySections(sections, semesterName, semesterDiv) {
        let reqDiv = $("<div>");
        reqDiv.addClass("semester" + semesterDiv);
        reqDiv.append($("<h2>").text(semesterName));
        $("#requirements").append(reqDiv);

        $.each(sections, function (index, section) {
            let courseName = section.courseId.substring(0, 7);
            let courseType = section.courseType;
            let semester = section.semester;
            let sectionSelectedId = section.id;
            let hyphenIndex = section.courseDates.indexOf('-');
            let startDate = section.courseDates.substring(0, hyphenIndex);
            let location = section.courseCampus;
            let availableSeats = section.courseMaxEnrollment - section.courseCurrentEnrolled;
            let reqBtn = $('<li><button>');
            let courseFull = $('<li><button>');
            if (availableSeats <= 0) {
                courseFull.addClass("courseFull btn-primary");
                courseFull.html(courseName + "&nbsp;|&nbsp;Location:&nbsp;" + location + "&nbsp;|&nbsp;Seats&nbsp;Left:&nbsp;" + availableSeats + "&nbsp;|&nbsp;Starting:&nbsp;" + startDate);
                courseFull.attr("id", "button" + section.courseId);
                reqDiv.append(courseFull);
            }
            else {
                reqBtn.addClass("reqBtn btn-primary");
                reqBtn.html(courseName + "&nbsp;|&nbsp;Location:&nbsp;" + location + "&nbsp;|&nbsp;Seats&nbsp;Left:&nbsp;" + availableSeats + "&nbsp;|&nbsp;Starting:&nbsp;" + startDate);
                reqBtn.attr("id", "button" + section.courseId);
                reqBtn.attr("value", courseName);
                reqDiv.append(reqBtn);
            }
            reqBtn.click(function () {
                let selection = $(this).attr("value");
                let courseIdSelection = sectionSelectedId ;
                reqButtonClick(this, selection, student, courseIdSelection);

            });
        });
        $("#navTitle").fadeIn();
        $("#requirements").fadeIn(300, function () {
            enableHoverEffects();
        });
    }
}


function getSelectedReq() {
    let selectedValue = $(".reqBtn.selected").val();
    return selectedValue;
}

function reqButtonClick(reqBtn, selection, student,courseIdSelection) {
    $(".reqBtn").removeClass("selected");
    $(reqBtn).addClass("selected");
    getSelectedReq();
    confirmMajor(selection, student,courseIdSelection);
}


function confirmMajor(selection, student,courseIdSelection) {
    let courseName = selection;
    //create popup element using jQuery
    let popup = $("<div>");
    popup.addClass("confirmation-popup");

    let question = $("<p>");
    question.text("Are you sure you want to enroll in " + courseName + "?");
    popup.append(question);

    //add yes button
    let yesButton = $("<button>");
    yesButton.text("Yes");
    yesButton.click(function () {
        popup.fadeOut(300, function () {
            $("nav, footer, #container").removeClass("blur"); //remove blur effect
            $("body").css("overflow-y", "auto"); //enable scrolling again
            enrollInCourse(courseName, student,courseIdSelection);
            setTimeout(function () {
                $(".reqBtn.selected").removeClass("selected");
                enableHoverEffects();
                $('.reqBtn').on('click', function () {
                    let selection = $(this).attr("value");
                    reqButtonClick(this, selection, student);
                });
            }, 500);
        });
    });

    //add no button
    let noButton = $("<button>");
    noButton.text("No");
    //close popup
    noButton.click(function () {
        popup.fadeOut(300, function () {
            $("nav, footer, #container").removeClass("blur"); //remove blur effect
            $("body").css("overflow-y", "auto"); //enable scrolling again
            setTimeout(function () {
                $(".reqBtn.selected").removeClass("selected");
                enableHoverEffects();
                $('.reqBtn').on('click', function () {
                    let selection = $(this).attr("value");
                    reqButtonClick(this, selection, student);
                });
            }, 500);
        });

    });

    popup.append(yesButton);
    popup.append(noButton);

    $(".reqBtn").off('click');
    $("body").css("overflow-y", "hidden"); //disable scrolling
    $("nav, footer, #container").addClass("blur");
    disableHoverEffects();

    setTimeout(function () {
        $('body').append(popup.hide().fadeIn(700)); //add popup to page with fade in
    }, 100);

    //center popup
    let windowHeight = $(window).height();
    let windowWidth = $(window).width();
    let popupHeight = popup.outerHeight();
    let popupWidth = popup.outerWidth();

    popup.css({
        top: (windowHeight - popupHeight) / 2 + "px",
        left: (windowWidth - popupWidth) / 2 + "px"
    });

}

function enrollInCourse(courseName, student,courseIdSelection) {
    console.log("HOPE",courseIdSelection);
    $.ajax({
        url: "http://localhost:8080/enroll/" + student.studentId,
        method: "POST",
        data: JSON.stringify({ courseId: courseName,id: courseIdSelection }),
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
            // Handle success response
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText);
            // Handle error response
        }
    });
}

function enableHoverEffects() {
    $(".reqBtn").css({
        "opacity": ".8",
        "font-size": "1.5em",
        "background-color": "#0B33D4",
        "color": "rgb(255, 255, 255)"
    });

    $(".reqBtn").hover(function () {
        $(this).stop(true, false).animate({
            "opacity": "1",
            "font-size": "1.8em",
            "backgroundColor": "#03FAE2",
            "color": "rgb(0, 0, 0)"
        }, { duration: 250, queue: false });
    }, function () {
        $(this).stop(true, false).animate({
            "opacity": ".8",
            "font-size": "1.5em",
            "backgroundColor": "#0B33D4",
            "color": "rgb(255, 255, 255)"
        }, { duration: 250, queue: false });
    });
}


function disableHoverEffects() {
    $(".reqBtn").off("mouseenter mouseleave");
}