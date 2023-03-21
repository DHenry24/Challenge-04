// Get current day and display it
var currentDay = moment().format("dddd, MMMM Do");
$("#currentDay").text(currentDay);

// Check time blocks every 5 minutes
setInterval(function() {
    $(".time-block").each(function() {
        var blockTime = moment($(this).find(".hour").text().trim(), "hA");
        var currentTime = moment();
        if (blockTime.isBefore(currentTime)) {
            $(this).find(".description").addClass("past");
            $(this).find(".description").removeClass("present");
            $(this).find(".description").removeClass("future");
        }
        else if (blockTime.isAfter(currentTime)) {
            $(this).find(".description").addClass("future");
            $(this).find(".description").removeClass("present");
            $(this).find(".description").removeClass("past");
        }
        else {
            $(this).find(".description").addClass("present");
            $(this).find(".description").removeClass("past");
            $(this).find(".description").removeClass("future");
        }
    });
}, 300000); // Check every 5 minutes

// Save button functionality
$(".saveBtn").on("click", function() {
    var eventText = $(this).siblings(".description").val().trim();
    var eventTime = $(this).siblings(".hour").text().trim();
    localStorage.setItem(eventTime, eventText);
});

// Load saved events from local storage
$(".time-block").each(function() {
    var eventTime = $(this).find(".hour").text().trim();
    var savedEvent = localStorage.getItem(eventTime);
    if (savedEvent) {
        $(this).find(".description").val(savedEvent);
    }
});
