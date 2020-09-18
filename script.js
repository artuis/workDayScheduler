var hours = $(".container")
var currentHour = moment().hour();
var savedEvents = {};
console.log();

$("#currentDay").text(moment().format("dddd[, ]MMMM Do"));

if (localStorage.getItem("events") !== null) {
    savedEvents = JSON.parse(localStorage.getItem("events"));
    for (var hour in savedEvents) {
        $("#" + hour).find(".description").val(savedEvents[hour]);
    }
}

if (localStorage.getItem("savedDay") !== null) {
    if (localStorage.getItem("savedDay") !== moment().format("LL")) {
        for (var i = 0; i < $(".container").children().length; i++) {
            $($(".container").children()[i]).children(".description").val("");
        }
        localStorage.removeItem("events");
    }
} 

localStorage.setItem("savedDay", moment().format("LL"));

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