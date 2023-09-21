function toggleDropdown(a) {
    var dropdown = document.getElementById(`myDropdown_${a}`);
    var dropdowns = document.getElementsByClassName("dropdown-content");
  
    // Close all dropdowns except the one clicked
    for (var i = 0; i < dropdowns.length; i++) {
      if (i !== a - 1) {
        dropdowns[i].style.display = "none";
      }
    }
  
    if (dropdown.style.display === "block") {
      dropdown.style.display = "none";
    } else {
      dropdown.style.display = "block";
    }
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropdown-button')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.style.display === "block") {
          openDropdown.style.display = "none";
        }
      }
    }
  }
  