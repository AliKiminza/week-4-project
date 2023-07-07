document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('searchByID');
  const fetchButton = document.getElementById('fetchButton');
  const carValueInput = document.getElementById('carValue');
  const calculateButton = document.getElementById('calculateButton');
  const resultDiv = document.getElementById('result');
  const insuranceOptionsDiv = document.getElementById('insuranceOptions');
   // adding event listeners to both the fetch and calculate buttons
  fetchButton.addEventListener('click', handleFetchData);
  calculateButton.addEventListener('click', handleCalculateCompensation);
  // function to check if the id entered is valid
  function handleFetchData(event) {
    event.preventDefault();
    const id = searchInput.value.trim();
    if (id !== '') {
      fetchCarById(id)
        .then(car => {
          if (car) {
            displayCarDetails(car);
          } else {
            displayErrorMessage('Car not found!');
          }
        })
        .catch(error => {
          displayErrorMessage('Error fetching car details');
          console.error(error);
        });
    }
  }
 //function to calculate compensation 
  function handleCalculateCompensation(event) {
    event.preventDefault();
    const valueOfCar = parseFloat(carValueInput.value);
    if (isNaN(valueOfCar)) {
      displayErrorMessage('Invalid value entered!');
    } else {
      const compensationAmount = valueOfCar * 0.8;
      displayCompensationAmount(compensationAmount);
    }
  }
  // function to fetch data for each car per the id
  function fetchCarById(id) {
    return fetch('db.json')
      .then(response => response.json())
      .then(data => {
        const car = data.cars.find(car => car.id === id);
        return car ? car : null;
      });
  }
  // function to display the car details
  function displayCarDetails(car) {
    const carDetails = `
      <h3>${car.title}</h3>
      <p><strong>Claim Type:</strong> ${car.claim}</p>
      <p><strong>Capacity:</strong> ${car.capacity}</p>
      <p><strong>Age Limit:</strong> ${car.age_limit}</p>
      <p><strong>Description:</strong> ${car.description}</p>
      <img src="${car.poster}" alt="${car.title}" width="300" height="200">
    `;
    resultDiv.innerHTML = carDetails;
  }
  // displaying the compensation
  function displayCompensationAmount(amount) {
    const compensationDetails = `
      <p>Compensation Amount: ${amount}</p>
    `;
    resultDiv.innerHTML += compensationDetails;
  }
   // displaying error message
  function displayErrorMessage(message) {
    const errorMessage = `
      <p>Error: ${message}</p>
    `;
    resultDiv.innerHTML = errorMessage;
  }
});

  
