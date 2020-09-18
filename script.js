var hours = $(".container")
var currentHour = moment().hour();
var savedEvents = {};

$("#currentDay").text(moment().format("dddd[, ]MMMM Do"));

if (localStorage.getItem("events") !== null) {
    savedEvents = JSON.parse(localStorage.getItem("events"));
    for (var hour in savedEvents) {
        $("#" + hour).find(".description").val(savedEvents[hour]);
    }
}

hours.children().each(function () {
    if (this.id < currentHour) {
        $(this).addClass("past");
    } else if (this.id == currentHour) {
        $(this).addClass("present");
    } else {
        $(this).addClass("future");
    }
});

$(".saveBtn").click(function () {
    var description = $(this).prev();
    savedEvents[description.parent().attr("id")] = description.val();
    localStorage.setItem("events", JSON.stringify(savedEvents));
})