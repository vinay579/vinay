
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const selectedItemData = document.getElementById('selectedItemData');

// Simulated data for demonstration
const predefinedSearchTerms = ['Tirumala', 'Temple2', 'Temple3']; // Add more terms as needed

searchInput.addEventListener('input', function () {
  const searchTerm = searchInput.value.trim().toLowerCase();

  const filteredTerms = predefinedSearchTerms.filter(term =>
    term.toLowerCase().includes(searchTerm)
  );

  displaySearchResults(filteredTerms);
});

function displaySearchResults(results) {
  searchResults.innerHTML = '';
  results.forEach(result => {
    const listItem = document.createElement('li');
    listItem.classList.add('result-item');
    listItem.textContent = result;
    listItem.addEventListener('click', function () {
      fetchDataFromApi(result);
    });
    searchResults.appendChild(listItem);
  });
}

function fetchDataFromApi(searchTerm) {
  // Replace this URL with your actual API endpoint
  const apiUrl = 'https://dev.netisoft.in/my/api/GetSearchResults.php'; // Replace with your API endpoint

  // Assuming the API returns JSON data with properties like 'Data' containing an array of objects
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 'search term': searchTerm }),
  })
    .then(response => response.json())
    .then(data => {
      // Assuming the structure of the response is { "Data": [ {...}, {...}, ... ] }
      displaySelectedItemData(data.Data[0]); // Assuming you want to display the first item in the array
    })
    .catch(error => console.error('Error fetching data:', error));
}

function displaySelectedItemData(item) {
  selectedItemData.innerHTML = `<h2>${item.TempleName}</h2><p>ID: ${item.id}</p><p>${item.Description}</p>`;
  // You can customize the display based on your item properties
}

      