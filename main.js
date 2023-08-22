$(function() {
  $("#my-form").submit(function(event) {
    // Parse the form inputs.
    var firstFeed = Date.parse(
      '01 Jan 1970 ' + $("#first-feed").val() + ':00 GMT'
    );
    var lastFeed = Date.parse(
      '01 Jan 1970 ' + $("#last-feed").val() + ':00 GMT'
    );

    // Calculate elapsed time.
    var elapsed = (lastFeed - firstFeed) / 3600000;

    // Calculate the best feeding interval.
    var prevSlop = 1001
    var slop = 1000
    var numFeedings = 0
    while (slop < prevSlop) {
      numFeedings += 1
      prevSlop = slop;
      slop = Math.abs(2.75 - elapsed / numFeedings);
    }
    var interval = elapsed / (numFeedings - 1);

    // Calculate feeding times.
    var feedings = [];
    var currFeed = firstFeed;
    while (currFeed <= lastFeed) {
      var d = new Date(currFeed);
      var arr = d.toUTCString().split(" ")[4].slice(0, -3).split(":");
      var h = arr[0] % 12;
      if (h == 0) {
        h = 12;
      }
      feedings.push(h + ":" + arr[1]);
      currFeed += interval * 3600000;
    }

    // Display feedings to user.
    alert(feedings);

    event.preventDefault();
  });
});
