document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('searchByID');
  const fetchButton = document.getElementById('fetchButton');
  const carValueInput = document.getElementById('carValue');
  const calculateButton = document.getElementById('calculateButton');
  const resultDiv = document.getElementById('result');
  const insuranceOptionsDiv = document.getElementById('insuranceOptions');

  fetchButton.addEventListener('click', handleFetchData);
  calculateButton.addEventListener('click', handleCalculateCompensation);

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

  function fetchCarById(id) {
    return fetch('db.json')
      .then(response => response.json())
      .then(data => {
        const car = data.cars.find(car => car.id === id);
        return car ? car : null;
      });
  }

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

  function displayCompensationAmount(amount) {
    const compensationDetails = `
      <p>Compensation Amount: ${amount}</p>
    `;
    resultDiv.innerHTML += compensationDetails;
  }

  function displayErrorMessage(message) {
    const errorMessage = `
      <p>Error: ${message}</p>
    `;
    resultDiv.innerHTML = errorMessage;
  }
});

  
