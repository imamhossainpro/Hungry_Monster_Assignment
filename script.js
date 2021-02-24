function jsonData(url){
    fetch(url)
    .then(res => res.json())
    .then(data => {
        showData(data.categories);
    })
}
// Json Api link
jsonData("https://www.themealdb.com/api/json/v1/1/categories.php");

function showData(data){
    let searchItem = [...data];
    const foodSection = document.getElementById('food-section');
    const searchButton = document.getElementById('searchButton');
    const foodItemSection = document.getElementById('food-item-section');
    
    foodCard(searchItem, foodSection);

    searchButton.addEventListener('keyup', e=> {
        let filterArr = searchItem.filter(obj => obj.strCategory.toLowerCase().includes(e.target.value.toLowerCase()));
        foodCard(filterArr, foodSection, e.target.value);
    })

    foodSection.addEventListener('click', e=> {
        if(e.target.innerText){
            const obj = data.find(obj => obj.strCategory === e.target.innerText);
            foodContent(obj, foodItemSection);
        }else{
            const category = e.target.parentElement.nextElementSibling.innerText;
            const obj = data.find(obj => obj.strCategory === category);
            foodContent(obj, foodItemSection);
        }
    })



}


function foodCard(dataArr, container, foodName=null){
    container.innerText = '';
    if(dataArr.length === 0){
        container.innerHTML = foodName && `<h1 class="text-info">"${foodName}" food item not found</h1>`;
    }
    dataArr.forEach(d => {
        container.innerHTML += `<div class="food-card">
            <div class="food-card-image">
            <img src=${d.strCategoryThumb} alt="">
            </div>
            <h5>${d.strCategory}</h5>
        </div>`
    });
}


function foodContent(foodItem, container){
    if(foodItem){
        container.innerHTML = '';
        container.innerHTML = `<div class=" food-details">
            <img src=${foodItem.strCategoryThumb} alt="">
            <h3>${foodItem.strCategory}</h3>
            <h5>Food Details</h5>
            <p>${foodItem.strCategoryDescription}</p>
            <small class="text-info">Click on home button to go back</small>
        </div>`
    }
}

    