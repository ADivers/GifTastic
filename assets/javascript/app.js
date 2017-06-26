// <!-- *************Variables************* -->
 
var topics = ["cats", "dogs", "fish", "koala", "panda", "elephant", "squirrel", "turtle"];

//********************FUNCTIONS**************************

//function to create buttons in top row
function makebuttons () {

    for (var i = 0; i < topics.length; i++) {
          //dynamically create button for topics in the array
          var button = $("<button>");
          button.addClass("topicsButton");
          button.attr("data-topics", topics[i]);
          button.text(topics[i]);

          //adding button to the HTMl
          $("#topics").append(button);
          console.log(topics[i]);
       }    
}

//Function to git the gifs for the selected input!!!

function getgifs() {
          //get button input
        var topicsString = $(this).attr("data-topics")

        console.log(topicsString);
        ///giphy api connection

        var gifyURL = "https://api.giphy.com/v1/gifs/search?api_key=d79fe679b420469da09382a2fe5ae8f9&q="+topicsString+"&limit=10&offset=0&rating=PG-13&lang=en"

           $.ajax({
               method: 'GET',
               url: gifyURL
            })
           .done(function(response) {
              console.log(response);

              var dataArray = response.data;

              // Create and display div elements for each of the returned Gifs
              $("#gifsies").empty();
              for (var i = 0; i < dataArray.length; i++) {
                var newDiv = $("<div>");
                newDiv.addClass("animalGif");

                var newRating = $("<h2>").html("Rating: " + dataArray[i].rating);
                newDiv.append(newRating);

                var newImg = $("<img>");
                newImg.attr("src", dataArray[i].images.fixed_height_still.url);
                newImg.attr("data-still", dataArray[i].images.fixed_height_still.url);
                newImg.attr("data-animate", dataArray[i].images.fixed_height.url);
                newImg.attr("data-state", "still");
                newDiv.append(newImg);

              // Append the new Gifs
              $("#gifsies").append(newDiv);
              }
            });

}


//FUNCTION TO ANIMATE THE GIFFFFSSSSSS
function makeGifMove() {
  // The image state will be either "still" or "animated"
  var state = $(this).find("img").attr("data-state");
  // Make the Gif either animated or still depending on the "data-state" value
  if (state === "still") {
    $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
    $(this).find("img").attr("data-state", "animate");
  } else {
    $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
    $(this).find("img").attr("data-state", "still");
  }
}

// FUNCTION TO ADD BUTTONSSSSSSS

function addtogifarray () {
  console.log(document.getElementById('search-input').value);
  topics.push(document.getElementById('search-input').value);
  $("#topics").empty();
  makebuttons();
}


/// Executions
makebuttons();

// onclick of  buttons
$(document).on("click", ".topicsButton", getgifs);

$(document).on("click", "#addgif", addtogifarray);
  
$(document).on("click", ".animalGif", makeGifMove);

