// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropriate information on the page
    $("#articles").append("<div class='card-panel grey lighten-4 black-text' data-id='" + data[i]._id + "'>" + "<div class='card-title'>" + data[i].link + "</div>" + "<br />" + data[i].summary + "<br /><br />" + "<button data-id='" + data[i]._id + "' id='savearticle' class='waves-effect waves-light btn green'>Save Article</button>" + "</div>");
  }
});

// Grab the saved articles as a json
$.getJSON("/saved", function (data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropriate information on the page
    $("#saved").append("<div class='card-panel grey lighten-4 black-text' data-id='" + data[i]._id + "'>" + "<div class='card-title'>" + data[i].link + "</div>" + "<br />" + data[i].summary + "<br /><br />" + "<button data-id='" + data[i]._id + "' id='deletearticle' class='waves-effect waves-light btn red'>Delete Article</button>" + "</div>");
  }
});

// Whenever someone clicks a card
$(document).on("click", ".card-panel", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      // The title of the article
      $("#notes").append("<h5>" + data.title + "</h5>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' placeholder='Note Title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body' placeholder='Type note here...'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote' class='waves-effect waves-light btn green'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

// When you click saved article button
$(document).on("click", "#savearticle", function () {
  event.preventDefault();
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a PUT request to change saved to true
  $.ajax({
    method: "PUT",
    url: "/articles/" + thisId,
    data: {
      saved: true
    }
  })
    // With that done
    .then(function (data) {
      // Log the response
      console.log(data);
      location.reload();
    });
});

// When you click saved article button
$(document).on("click", "#deletearticle", function () {
  event.preventDefault();
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a PUT request to change saved to true
  $.ajax({
    method: "PUT",
    url: "/saved/" + thisId,
    data: {
      saved: false
    }
  })
    // With that done
    .then(function (data) {
      // Log the response
      console.log(data);
      location.reload();
    });
});