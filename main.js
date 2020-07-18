$(function() {
  $("#my-form").submit(function(event) {
    var firstFeed = moment.duration($("#first-feed").val(), "HH:mm");
    var lastFeed = moment.duration($("#last-feed").val(), "HH:mm");
    var elapsed = lastFeed.subtract(firstFeed);
    var decElapsed = elapsed.hours() + elapsed.minutes() / 60;

    var f = firstFeed.format("HH:mm");
    console.log(f.constructor.name);
    alert('hello');

    var prevSlop = 1001
    var slop = 1000
    var numFeedings = 0
    while (slop < prevSlop) {
      numFeedings += 1
      prevSlop = slop;
      slop = Math.abs(3 - decElapsed / numFeedings);
    }

    var interval = decElapsed / (numFeedings - 1);
    var mInterval = moment.duration(interval, 'hours')

    var times = [];


    event.preventDefault();
  });
});
