function loadCategories() {
    //fetch the data

   fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    //2 - convert promise to json
   .then((res) => res.json())
   //3 - send data to display
   .then((data) => displayCategories(data.categories));

}

function displayCategories(categories){
   console.log(categories);
   
}

loadCategories()