//add space before .class
let toggle = document.querySelector("#header .toggle-button");
// all is for all classes with the same name
let collapse = document.querySelectorAll("#header .collapse");

// when pressing function is called
toggle.addEventListener('click', function(){
  collapse.forEach(col => col.classList.toggle("collapse-toggle"));
})

// with masonry, horizontalgrid
new Masonry("#posts .grid", {
  itemSelector : '.grid-item',
  gutter : 20 //horizontal spacing
});

window.onscroll = function(){myFunction()};

//get current value
let navbar = document.getElementById("header");

//get navbar position
let sticky = navbar.offsetTop;

//sticky function
function myFunction(){
  if(window.pageYOffset >= sticky){
    navbar.classList.add("sticky");
  }else{
    navbar.classList.remove("sticky");
  }
}
