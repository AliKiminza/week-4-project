document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  const searchInput = document.getElementById('searchByID');
  const resultContainer = document.getElementById('result');

  form.addEventListener('submit', function (event) {
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
          displayErrorMessage('An error occurred while fetching car data.');
          console.error(error);
        });
    } else {
      displayErrorMessage('Please enter a car ID.');
    }
  });

  function fetchCarById(id) {
    return fetch('db.json')
      .then(response => response.json())
      .then(data => {
        const cars = data.cars;
        return cars.find(car => car.id === id);
      });
  }

  function displayCarDetails(car) {
    const carDetails = `
      <h3>${car.title}</h3>
      <p><strong>Claim:</strong> ${car.claim}</p>
      <p><strong>Capacity:</strong> ${car.capacity}</p>
      <p><strong>Age Limit:</strong> ${car.age_limit}</p>
      <p><strong>Compensation Amount:</strong> ${car['compensation amount']}</p>
      <p><strong>Description:</strong> ${car.description}</p>
      <img src="${car.poster}" alt="${car.title}" style="max-width: 300px;">
    `;
    resultContainer.innerHTML = carDetails;
  }

  // function displayErrorMessage(message) {
  //   resultContainer.innerHTML = `<p>${message}</p>`;
  // }
});
