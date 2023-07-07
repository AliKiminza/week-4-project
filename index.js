document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchByID');
    const calculateButton = document.getElementById('calculateButton');
    const insuranceOptions = document.getElementById('insuranceOptions');
    const resultDiv = document.getElementById('result');
    const carValueInput = document.getElementById('carValue');
  
    // Event listener for submitting the search form
    searchForm.addEventListener('submit', function (event) {
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
          });
      }
    });
  
    // Event listener for calculating compensation
    calculateButton.addEventListener('click', function () {
      const carValue = parseFloat(carValueInput.value.trim());
      if (isNaN(carValue) || carValue <= 0) {
        displayErrorMessage('Invalid car value!');
        return;
      }
      const compensationAmount = calculateCompensation(carValue);
      displayCompensationAmount(compensationAmount);
    });
  
    // Function to fetch car by ID from the database
    function fetchCarById(id) {
      
      return fetch('http://localhost:3000/cars/id')
      .then(response => response.json())
      .then(data => {
        const car = data.cars.find(car => car.id === id);
        return car ? car : null;
      });
      return new Promise((resolve) => {
         // Simulating asynchronous fetch
          setTimeout(() => {
          const cars = [
            { id: "1", title: "SALON CAR", claim: "Accident" },
            { id: "2", title: "4 WHEEL CAR", claim: "Accident" },
            { id: "3", title: "MATATU", claim: "Accident" },
            { id: "4", title: "BUS", claim: "Accident" },
            { id: "5", title: "LORRY", claim: "Accident" },
            { id: "6", title: "TRAILER", claim: "Accident" },
            { id: "7", title: "SALON CAR", claim: "Fire" },
            { id: "8", title: "4 WHEEL CAR", claim: "Fire" },
            { id: "9", title: "MATATU", claim: "Fire" },
            { id: "10", title: "BUS", claim: "Fire" },
            { id: "11", title: "LORRY", claim: "Fire" },
            { id: "12", title: "TRAILER", claim: "Fire" },
            { id: "13", title: "SALON CAR", claim: "Theft" },
            { id: "14", title: "4 WHEEL CAR", claim: "Theft" },
            { id: "15", title: "MATATU", claim: "Theft" },
            { id: "16", title: "BUS", claim: "Theft" },
            { id: "17", title: "LORRY", claim: "Theft" },
            { id: "18", title: "TRAILER", claim: "Theft" }
          ];
            const car = cars.find(car=> car.id === id);
            resolve(car);
         } , 10); // Simulating delay
        });
    }
  
    // Function to display car details
    function displayCarDetails(car) {
      insuranceOptions.textContent = `Insurance: ${car.title} (${car.claim})`;
    }
  
    // Function to display an error message
    function displayErrorMessage(message) {
      resultDiv.textContent = `Error: ${message}`;
    }
  
    // Function to calculate compensation amount
    function calculateCompensation(carValue) {
      return carValue * 0.8;
    }
  
    // Function to display the compensation amount
    function displayCompensationAmount(compensationAmount) {
      resultDiv.textContent = `Compensation Amount: ${compensationAmount}`;
    }
  });
  