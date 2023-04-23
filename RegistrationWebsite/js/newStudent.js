$(document).ready(function () {
    // $("#welcome").hide();
    $(".button-container").hide();
    $("#Registor").fadeIn(300, function () {
        signUpEffects();
        $("#registerBtn").on('click', function () {
            handleNewUser();
        });
    });
});

function handleNewUser() {

    let errors = 0;
    //regex to test for 2-20 characters, no spaces, and capitolized first letter.
    let namePattern = /^[A-Z][a-z]{1,19}$/;
    //regex to test for at least 8 characters and no spaces
    let passwordPattern = /^\S{8,}$/;
    let nameError = "Names must be between 2 and 20 letters, have no spaces, and must be capitolized. ";
    let passwordError = "Passwords must be at least 8 characters and have no spaces. "
    let passwordMatchError = "Passwords must match!"
    let firstName = $("#firstName").val();
    let lastName = $("#lastName").val();
    let email = firstName + lastName + "@my.tridenttech.edu";
    let password1 = $("#newPassword").val();
    let password2 = $("#confirmPassword").val();
    let message = $("#formMessage");
    message.empty();
    message.hide();

    //checks regular expressions and password match, appends to errors if errors are found
    if (!namePattern.test(firstName) || !namePattern.test(lastName)) {
        message.append(nameError);
        errors++;
    }
    if (!passwordPattern.test(password1) || !passwordPattern.test(password2)) {
        message.append(passwordError);
        errors++;
    }
    if (password1 !== password2) {
        message.append(passwordMatchError);
        errors++;
    }

    message.fadeIn(300);

    //gets rid of error message when an input is selected
    $("#firstName, #lastName, #newPassword, #confirmPassword").focus(function () {
        message.fadeOut(300);
    })

    //submit the user if no errors persist
    if (errors === 0) {
        let studentJson = {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "password": password2,
        };

        selectMajor(studentJson);
    }
}

function selectMajor(studentJson) {
    $("#newStudent").fadeOut(300, function () {
        $("#welcome")
            .empty()
            .append("<h1>Welcome to Trident Tech, " + studentJson.firstName + "!</h1>")
            .fadeIn(300)
            .delay(3000)
            .fadeOut(300, function () {
                $("#welcome")
                    .empty()
                    .append("<h1>Now, let's choose a major...</h1>")
                    .fadeIn(300)
                    .delay(3000)
                    .fadeOut(300, function () {
                        $("#container").fadeOut(200, function () {
                            $("#Registor").hide();
                            displayMajors(studentJson);
                            $("#container")
                            $("#container").css({
                                "backdrop-filter": "blur(0)",
                                "box-shadow": "none",
                                "width": "95%",
                                "background-color": "transparent"
                            })
                                .fadeIn(250)
                            $("#navTitle")
                                .empty()
                                .hide()
                                .append("Choose Your Major")
                                .fadeIn(200)
                        })

                    });
            });
    });
}
function displayMajors(studentJson) {
    // Make AJAX request for ALL majors
    $.ajax({
        url: "http://localhost:8080/major_names",
        type: "GET",
        dataType: "JSON",
        success: function (majors) {
            // let majorNameTitle = $('<li>');
            // majorNameTitle.attr("id", "majorNameTitle");
            // majorNameTitle.text("Trident Tech Majors");
            // $("#majors").append(majorNameTitle);

            $.each(majors, function (index, majorLite) {
                let majorButton = $('<li><button>');
                majorButton.addClass("majorsBtn btn-primary");
                majorButton.text(majorLite.majorName);
                majorButton.attr("id", "button" + index);
                majorButton.val(majorLite.majorId);

                $("#majors").append(majorButton);
                $(".button-container").fadeIn(300);
                enableHoverEffects();

                majorButton.click(function () {
                    majorButtonClick(this, studentJson);
                });
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
}

function majorButtonClick(major, studentJson) {
    $(".majorsBtn").removeClass("selected");
    $(major).addClass("selected");
    getSelectedMajorId();
    confirmMajor(studentJson);
}

function confirmMajor(studentJson) {
    let selectedMajorName = $(".majorsBtn.selected").text();
    let selectedMajorId = $(".majorsBtn.selected").val();
    console.log(selectedMajorId);

    //create popup element using jQuery
    let popup = $("<div>");
    popup.addClass("confirmation-popup");

    let question = $("<p>");
    question.text("Are you sure you want to choose '" + selectedMajorName + "' as your major?");
    popup.append(question);

    //add yes button
    let yesButton = $("<button>");
    yesButton.text("Yes");
    yesButton.click(function () {
        studentJson["majorId"] = selectedMajorId;
        studentJson["majorName"] = selectedMajorName;
        console.log(studentJson);
        popup.remove(); //remove popup
        $(".button-container, nav, footer").removeClass("blur"); //remove blur effect
        $("body").css("overflow-y", "auto"); //enable scrolling again
        $("#majors").fadeOut(500);

        setTimeout(function () {
            submitNewUser(studentJson, selectedMajorName);
        }, 500);
    });

    //add no button
    let noButton = $("<button>");
    noButton.text("No");
    //close popup
    noButton.click(function () {
        popup.remove();
        $(".button-container, nav, footer").removeClass("blur"); //remove blur effect
        $("body").css("overflow-y", "auto"); //enable scrolling again
        $(".majorsBtn.selected").removeClass("selected");
        enableHoverEffects();
        $('.majorsBtn').on('click', function () {
            majorButtonClick(this, studentJson);
        });
    });

    popup.append(yesButton);
    popup.append(noButton);

    $(".majorsBtn").off('click');
    $("body").css("overflow-y", "hidden"); //disable scrolling
    $(".button-container, nav, footer").addClass("blur");
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

function getSelectedMajorId() {
    let selectedValue = $(".majorsBtn.selected").val();

    //console.log(selectedValue);

    return selectedValue;
}

function submitNewUser(student) {
    $.ajax({
        url: "http://localhost:8080/new_user",
        type: "POST",
        contentType: 'application/json',
        data: JSON.stringify(student),

        success: function () {
            $("#Registor").show();
            $("#welcome").empty();
            $("#container").css({
                "backdrop-filter": "blur(4px)",
                "box-shadow": "inset 0 0 100px rgba(0, 0, 0, 0.5)",
                "width": "70%",
                "background-color": "rgba(0, 0, 0, 0.179)"
            });
            $("#welcome").append("<H1>You are now enrolled in " + student.majorName + "!</h1>");
            $(".button-container").fadeOut(250, function () {
                $("#container").fadeIn(250, function () {
                    $("#welcome")
                        .delay(300)
                        .fadeIn(300)
                        .delay(3500)
                        .fadeOut(300, function () {
                            $("#welcome")
                                .empty()
                                .append("<H1>Your student email is " + student.email + "</h1>")
                                .fadeIn(300)
                                .delay(4000)
                                .fadeOut(300, function () {
                                    $("#Registor").hide();
                                    window.location.href = "index.html";
                                })
                        })
                })
            });
        },

        error: function (error) {
            console.error('Error:', error);
        }
    });
}

//some nice hover effects
function signUpEffects() {
    $(".studentBtns").hover(function () {
        $(this).stop(true, false).animate({ "opacity": "1", "font-weight": "bolder" }, 250);
    }, function () {
        $(this).stop(true, false).animate({ "opacity": ".8", "font-size": "1em" }, 250);
    });
}

function enableHoverEffects() {
    $(".majorsBtn").css({
        "opacity": ".8",
        "font-size": "1.4em",
        "background-color": "#0B33D4",
        "color": "rgb(255, 255, 255)"
    });

    $(".majorsBtn").hover(function () {
        $(this).stop(true, false).animate({
            "opacity": "1",
            "font-size": "1.5em",
            "backgroundColor": "#03FAE2",
            "color": "rgb(0, 0, 0)"
        }, { duration: 250, queue: false });
    }, function () {
        $(this).stop(true, false).animate({
            "opacity": ".8",
            "font-size": "1.4em",
            "backgroundColor": "#0B33D4",
            "color": "rgb(255, 255, 255)"
        }, { duration: 250, queue: false });
    });
}

function disableHoverEffects() {
    $(".majorsBtn").off("mouseenter mouseleave");
}