$(function() {
  $("#my-form").submit(function(event) {
    // Parse the form inputs.
    var firstFeed = Date.parse(
      '01 Jan 1970 ' + $("#first-feed").val() + ':00 GMT'
    );
    var lastFeed = Date.parse(
      '01 Jan 1970 ' + $("#last-feed").val() + ':00 GMT'
    );
    var hours = parseInt($("#hours-dropdown").val(), 10);
    var minutes = parseInt($("#minutes-dropdown").val(), 10);
    var period = hours + minutes / 60

    // Calculate elapsed time.
    var elapsed = (lastFeed - firstFeed) / 3600000;

    // Calculate the best feeding interval.
    var prevSlop = 1001
    var slop = 1000
    var numFeedings = 0
    while (slop < prevSlop) {
      numFeedings += 1
      prevSlop = slop;
      slop = Math.abs(period - elapsed / numFeedings);
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

      // Round to nearest 5
      arr[1] = Math.round(arr[1] / 5) * 5;

      feedings.push(h + ":" + arr[1]);
      currFeed += interval * 3600000;
    }
    // Show interval
    var intervalHours = Math.floor(interval)
    var intervalMinutes = Math.round((interval - intervalHours) * 60)
    var intervalStr = `${intervalHours}:${intervalMinutes} loop`;
    feedings.unshift(intervalStr)

    // Display feedings to user.
    alert(feedings);

    event.preventDefault();
  });
});
