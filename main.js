document.querySelector('#searchButton').addEventListener('click', handleSearch);

function handleSearch() {
    const query = getQuery();
    if (!query) {
        alert('Please enter a food name.');
        return;
    }
    fetchMealData(query);
}

function getQuery() {
    return document.querySelector('#searchInput').value.trim();
}

function fetchMealData(query) {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => updateResults(data))
        .catch(error => console.error('Error fetching data:', error));
}

function updateResults(data) {
    // clear old results
    document.querySelector('#results').textContent = '';

    if (data.meals) {
        // Get first meal from results
        const meal = data.meals[0];

        // Update the content
        document.querySelector('#mealItem').textContent = `Meal Item: ${meal.strMeal}`;
        document.querySelector('#mealTitle').textContent = `Meal Title: ${meal.strMeal}`;
        document.querySelector('#mealDescription').textContent = `Meal Description: ${meal.strInstructions.substring(0, 200)}...`;
        document.querySelector('#mealImageText').textContent = 'Meal Image:';
        
        const mealImage = document.querySelector('#mealImage');
        mealImage.src = meal.strMealThumb;
        mealImage.alt = meal.strMeal;
        mealImage.style.display = 'block';
    } else {
        document.querySelector('#results').textContent = 'No meals found.';
        document.querySelector('#mealImage').style.display = 'none'; 
    }
}