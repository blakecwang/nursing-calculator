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
      slop = Math.abs(3 - elapsed / numFeedings);
    }
    var interval = elapsed / (numFeedings - 1);
    alert(interval);

    //    var times = [];
    //
    //
    event.preventDefault();
  });
});
