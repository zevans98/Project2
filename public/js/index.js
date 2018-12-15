// Get references to page elements
var $food = $("#food");
var $calories = $("#calories");
var $date = $("#date");
var $submitBtn = $("#submit");
var $entryList = $("#entry-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveEntry: function(entry) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/foods",
      data: JSON.stringify(entry)
    });
  },
  getEntries: function() {
    return $.ajax({
      url: "api/foods",
      type: "GET"
    });
  },
  deleteEntry: function(id) {
    return $.ajax({
      url: "api/foods/" + id,
      type: "DELETE"
    });
  },
  displayCalories: function(){
    return $.ajax({
      url: "api/cal",
      type: "GET"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshEntries = function() {
  API.getEntries().then(function(data) {
    var $entries = data.map(function(entry) {
      var $a = $("<a>")
        .text(
          "Food: " +
            entry.food +
            "; Calories: " +
            entry.calories +
            "; Date: " +
            entry.date
        )
        .attr("href", "/entry/" + entry.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": entry.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $entryList.empty();
    $entryList.append($entries);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();
  var entry = {
    food: $food.val().trim(),
    calories: parseInt($calories.val().trim()),
    date: $date.val().trim()
  };

  if (!(entry.food && entry.calories)) {
    alert("You must enter a food and a number for the calories");
    return;
  }

  API.saveEntry(entry).then(function() {
    refreshEntries();
  });

  $food.val("");
  $calories.val("");
  $date.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteEntry(idToDelete).then(function() {
    refreshEntries();
  });
};

API.displayCalories().then(function(response){

  console.log('AN ARRAY', response);
  var total = 0;
  for ( i = 0; i < response.length; i++ ) {
    
      total += response[i].calories;
     console.log('This is TOTAL',total);
     
  };

  console.log(total);
  document.getElementById('displayCalories').innerHTML = total;
});

function refreshCalories(){
  API.displayCalories().then(function(response){

    console.log('AN ARRAY', response);
    var total = 0;
    for ( i = 0; i < response.length; i++ ) {
      
        total += response[i].calories;
       console.log('This is TOTAL',total);
       
    };
  
    console.log(total);
    document.getElementById('displayCalories').innerHTML = total;
  });
}

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$entryList.on("click", ".delete", handleDeleteBtnClick);

$submitBtn.on("click", refreshCalories);



