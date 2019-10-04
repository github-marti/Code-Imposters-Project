
// Get the modal
let modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];



let noBtn = $("<p>");
noBtn.text("Sorry, you must be of legal drinking age to enter our site");

noBtn.css("text-color", "grey");


// When the user clicks on <button>  and <button> (yes), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }
$("#yes").on("click", function(){
  modal.style.display = "none";
})

$("#no").on("click", function(){
  $(".modal-content").append(noBtn);
  $("#yes").remove();
  $("#ask21").remove();
  $("#no").remove();
})

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
