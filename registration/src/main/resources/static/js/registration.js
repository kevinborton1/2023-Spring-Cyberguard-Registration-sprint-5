
$(document).ready(function () {
  $("#button-container").hide();
  $("#button-container").fadeIn(300);
  $("#requirements").fadeOut();
  displayRequirements();
});

// function displayMajors() {
//   // Make AJAX request for ALL majors
//   $.ajax({
//     url: "http://localhost:8080/major_names",
//     type: "GET",
//     dataType: "JSON",
//     success: function (majors) {
//       let majorNameTitle = $('<li>');
//       majorNameTitle.attr("id", "majorNameTitle");
//       majorNameTitle.text("Trident Tech Majors");
//       $("#majors").append(majorNameTitle);

//       $.each(majors, function (index, majorLite) {
//         let majorButton = $('<li><button>');
//         majorButton.addClass("majorsBtn btn-primary");
//         majorButton.text(majorLite.majorName);
//         majorButton.attr("id", "button" + index);
//         majorButton.val(majorLite.majorId);

//         $("#majors").append(majorButton);

//         enableHoverEffects();

//         majorButton.click(function () {
//           majorButtonClick(this);
//         });

//       });

//     },
//     error: function (jqXHR, textStatus, errorThrown) {
//       console.log(textStatus, errorThrown);
//     }
//   });
// }

// function confirmMajor() {
//   let selectedMajor = $(".majorsBtn.selected").text();

//   //create popup element using jQuery
//   let popup = $("<div>");
//   popup.addClass("confirmation-popup");

//   let question = $("<p>");
//   question.text(`Show requirements for ${selectedMajor}?`);
//   popup.append(question);

//   //add yes button
//   let yesButton = $("<button>");
//   yesButton.text("Yes");
//   yesButton.click(function () {
//     popup.remove(); //remove popup
//     $(".button-container, nav, footer").removeClass("blur"); //remove blur effect
//     $("body").css("overflow-y", "auto"); //enable scrolling again
//     $("#majors").fadeOut(500);

//     setTimeout(function () {
//       displayRequirements(); //sets time out to display requirements so majors can finish fading out
//     }, 500);
//   });

//   //add no button
//   let noButton = $("<button>");
//   noButton.text("No");
//   //close popup
//   noButton.click(function () {
//     popup.remove();
//     $(".button-container, nav, footer").removeClass("blur"); //remove blur effect
//     $("body").css("overflow-y", "auto"); //enable scrolling again
//     $(".majorsBtn.selected").removeClass("selected");
//     enableHoverEffects();
//     $('.majorsBtn').on('click', function () {
//       majorButtonClick(this);
//     });
//   });

//   popup.append(yesButton);
//   popup.append(noButton);

//   $(".majorsBtn").off('click');
//   $("body").css("overflow-y", "hidden"); //disable scrolling
//   $(".button-container, nav, footer").addClass("blur");
//   disableHoverEffects();

//   setTimeout(function () {
//     $('body').append(popup.hide().fadeIn(700)); //add popup to page with fade in
//   }, 100);

//   //center popup
//   let windowHeight = $(window).height();
//   let windowWidth = $(window).width();
//   let popupHeight = popup.outerHeight();
//   let popupWidth = popup.outerWidth();

//   popup.css({
//     top: (windowHeight - popupHeight) / 2 + "px",
//     left: (windowWidth - popupWidth) / 2 + "px"
//   });
// }

function displayRequirements() {
  var majorId = getSelectedMajorId();
  var requirementsUrl = "http://localhost:8080/major?Id=" + majorId;

  $.ajax({
    url: requirementsUrl,
    type: "GET",
    dataType: "JSON",
    success: function (selectedMajor) {
      let majorName = selectedMajor.majorName;
      let majorNameTitle = $('<li>');
      majorNameTitle.attr("id", "majorNameTitle");
      majorNameTitle.text("Requirements for " + majorName);
      $("#requirements").append(majorNameTitle);
      console.log(selectedMajor.majorName);

      $.each(selectedMajor.requirements, function (index, requirement) {
        let courseName = requirement.courseName;
        let reqBtn = $('<li><button>');
        reqBtn.addClass("reqBtn btn-primary");
        reqBtn.text(courseName);
        reqBtn.attr("id", "button" + index);
        reqBtn.val(index);

        $("#requirements").append(reqBtn);
        $("#requirements").fadeIn(500);
        console.log(courseName);
      });

    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(textStatus, errorThrown);
    }

  });
}

// function majorButtonClick(major) {
//   $(".majorsBtn").removeClass("selected");
//   $(major).addClass("selected");
//   getSelectedMajorId();
//   confirmMajor(major);
// }

// function getSelectedMajorId() {
//   let selectedValue = $(".majorsBtn.selected").val();

//   console.log(selectedValue);

//   return selectedValue;
// }

// function enableHoverEffects() {
//   $(".majorsBtn").animate({ "opacity": ".8", "font-size": "1.5em" }, 250);

//   $(".majorsBtn").hover(function () {
//     $(this).stop(true, false).animate({ "opacity": "1", "font-size": "1.8em" }, 250);
//   }, function () {
//     $(this).stop(true, false).animate({ "opacity": ".8", "font-size": "1.5em" }, 250);
//   });
// }

// function disableHoverEffects() {
//   $(".majorsBtn").off("mouseenter mouseleave");
// }