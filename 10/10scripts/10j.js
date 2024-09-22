let calculation = localStorage.getItem('calculation') || '';

// Display the calculation when the page first loads.
displayCalculation();

function updateCalculation(value) {
  calculation += value;
  
  // Display the calculation on the page
  // instead of console.log
    displayCalculation();

  localStorage.setItem('calculation', calculation);
}

// Optional: you can also create a function in order
// to reuse this code
function saveCalculation() {
  localStorage.setItem('calculation', calculation);
}

function displayCalculation() {
  document.querySelector('.js-calculation')
    .innerHTML = calculation;
}