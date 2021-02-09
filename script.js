const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const foodCloseBtn = document.getElementById('food-close-btn');
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealfood);
foodCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showfood');
});

function getMealList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "food-btn">Get food</a>
                        </div>
                    </div>
                `;
                });
                mealList.classList.remove('notFound');
            } else {
                html = "কিছু পাওয়া যায় নি!";
                mealList.classList.add('notFound');
            }

            mealList.innerHTML = html;
        });
}

function getMealfood(e) {
    e.preventDefault();
    if (e.target.classList.contains('food-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(response => response.json())
            .then(data => mealfoodModal(data.meals));
    }
}

function mealfoodModal(meal) {

    console.log(meal);
    meal = meal[0];
    let html = `
        <div class = "food-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <h2 class = "food-title">${meal.strMeal}</h2>
        <p class = "food-category">${meal.strCategory}</p>
        <div class = "food-instruct">
            <h3>Ingredients:</h3>
            <p>${meal.strIngredient1}</p>
            <p>${meal.strIngredient2}</p>
            <p>${meal.strIngredient3}</p>
            <p>${meal.strIngredient4}</p>
            <p>${meal.strIngredient5}</p>
            <p>${meal.strIngredient6}</p>
            <p>${meal.strIngredient7}</p>
            <p>${meal.strIngredient8}</p>
            <p>${meal.strIngredient9}</p>
            <p>${meal.strIngredient10}</p>
            </div>   
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showfood');
}
fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if (data.meals) {
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "food-btn">Show Ingredient</a>
                        </div>
                    </div>
                `;
            });

        }
        mealList.innerHTML = html;
    });