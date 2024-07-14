

// !NAV SIDEBAR
let boxWidth = $(".sideBarBlack").outerWidth();

function hideSideBar() {
  $(".openSideBar").click(function () {
    if ($(".sideBar").css("left") === "0px") {
      $(".sideBar").animate({ left: `-${boxWidth}` }, 500);
    } else {
      $(".sideBar").animate({ left: `0px` }, 500);
    }
  });
}
hideSideBar();
// !END

//   ^<<<<<<<<<<<< HOME >>>>>>>>>>>>>>>>>>>>>>>

async function FirstOpen() {
    let apiRespose = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian`);
    let finalResult = await apiRespose.json();
    let Canadian = finalResult.meals;

    let box2 = ``;
    for (let i = 0; i < Canadian.length; i++) {

      box2 += `<div class="col-md-3 my-3 py-3 px-4">
      <div class="itemCategory position-relative text-center">
          <img class=" img-fluid" src="${Canadian[i].strMealThumb}" alt="">
         <div class=" meal-layer px-2 py-3 d-flex flex-column justify-content-center align-items-center">
          <h3>${Canadian[i].strMeal}</h3>
          </div>
      </div>
    </div>`
    }
    document.getElementById("CatData").innerHTML = box2;

    $(".itemCategory").click(function (e) {
      let nameOfTheMeal = e.target.innerText;
      let details;
      async function getDetails(nameOfTheMeal) {
        let apiRespose = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nameOfTheMeal}`);
        let finalResult = await apiRespose.json();
        details = finalResult.meals;

        let box2 = `<div class="col-md-5 my-3 py-3 px-4">
        <div class="itemCategory position-relative text-center">
            <img class=" img-fluid" src="${details[0].strMealThumb}"
                alt="">
            <div class=" desc px-2 py-3 d-flex flex-column justify-content-center align-items-center">
                <h3>${details[0].strMeal}</h3>
            </div>
        </div>
    </div>
    <div class="col-md-6 my-y py-3 px-4">
        <h2 class=" text-light">${details[0].strMeal}</h2>
        <h3 class=" text-light">'${details[0].strArea} Meal'</h3>
        <p class=" text-light">Instruction : ${details[0].strInstructions}</p>
        <h5 class="text-info">Mean Ingredients : ${details[0].strIngredient1}, ${details[0].strIngredient2}, ${details[0].strIngredient3}, ${details[0].strIngredient4}, ${details[0].strIngredient5}, ${details[0].strIngredient6}, ${details[0].strIngredient7}, ${details[0].strIngredient8}, ${details[0].strIngredient9}, ${details[0].strIngredient10}</h5>
        <a href="${details[0].strYoutube}"><button class="btn btn-outline-danger my-3">Watch Video</button><a/>
    </div>`;
        document.getElementById("CatData").innerHTML = box2;
     }
      getDetails(nameOfTheMeal)
    })
  }

  FirstOpen()


// async function displayCategories() {
//     let apiRespose = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
//     let finalResult = await apiRespose.json();
//     let categories = finalResult.categories;

//     let cartona = ``;
//     for (let i = 0; i < categories.length; i++) {

//  let description = categories[i].strCategoryDescription.split(" ").splice(0, 10).join(" ")
//       cartona += `<div class="col-md-3 my-3 py-3 px-4">
//       <div class="itemCategory position-relative text-center">
//           <img class=" img-fluid" src="${categories[i].strCategoryThumb}" alt="">
//             <div class="meal-layer px-2 py-3 d-flex flex-column justify-content-center align-items-center">
//             <h3>${categories[i].strCategory}</h3>
//             <p>${categories[i].strCategory} ,${description}</p>
//              </div>
//       </div>
//     </div>`
//     }
//     document.getElementById("CatData").innerHTML = cartona;




//   ^<<<<<<<<<<<< CATEGORIES >>>>>>>>>>>>>>>>>>>>>>>


async function displayCategories() {
    var loading=document.querySelector('.loading')
    loading.classList.remove('d-none')
   
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  const data = await response.json();
  //  console.log(data.categories);

  loading.classList.add('d-none')
$(".categ-data").empty();
  for (let i = 0; i < data.categories.length; i++) {
    // console.log(data.categories[i]);
    
    $(".categ-data").append(`<div class="col-md-3 g-3 text-center">
                    <div class="itemCategory  card bg-black  position-relative">
                      <img " img-fluid overflow-hidden" src="${data.categories[i].strCategoryThumb}" alt="${data.categories[i].strCategory}" class="img-fluid">
                      <div class="img-content card-content text-white  ">
                        <h3>${data.categories[i].strCategory}</h3>
                    </div>
                      </div>
                  </div>`);
    // console.log(data.categories[1]);
  }
  $(".categ-data").on("click", function (e) {
    displayCategory(e.target.alt);
  });
}

async function displayCategory(categ) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categ}`
  );
  const data = await response.json();
  // console.log(data.meals);
  $(".categ-data").empty();
  for (let i = 0; i < data.meals.length; i++) {
    var mealid = data.meals[i].idMeal;
    $(".detailed-categ-data").append(`<div class="col-md-3 g-3 text-center">
                   <div class="item-categ card bg-black  position-relative">
                     <img id="${mealid}" src="${data.meals[i].strMealThumb}" alt="${data.meals[i].strMeal}" class="img-fluid">
                     <div class=" img-content card-content text-white ">
                       <h3>${data.meals[i].strMeal}</h3>
                     </div>
                   </div>
                 </div>`);
  }

  $(".detailed-categ-data").on("click", function (e) {
    // console.log(mealid)

    displayMealDetails(e.target.id);
  });
}


//   ^<<<<<<<<<<<< AREAAA >>>>>>>>>>>>>>>>>>>>>>>

async function getArea(){

    var loading=document.querySelector('.loading')
    loading.classList.remove('d-none')

    var response =await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    var data= await response.json()
    meals=data.meals;

    loading.classList.add('d-none')
    $(".itemCategory").empty();
    let box=``;
   for(var i=0; i<  meals.length  ;  i++){
    box+=`
      <div class="col-md-3">
      <div class="area ps-5 ms-5 ">
            <i class=" fa-solid fa-house-laptop text-white fs-1 m-auto  "></i>
            <h3 class="text-white">${meals[i].strArea}</h3>
       </div>
           </div> `;
   }
   document.getElementById('CatData').innerHTML=box;

   $(".area").click(function (e) {
          let nameofArea = e.target.innerText;
          let details
          async function getDetails(nameofArea) {
            let apiRespose = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${nameofArea}`);
            let result = await apiRespose.json();
            details = result.meals;
 
           let box3=``
            for (let i = 0; i < details.length; i++){
             box3 +=`<div class="col-md-3 my-3 py-3 px-4">
                  <div class="itemCategory position-relative text-center">
                      <img class=" img-fluid" src="${details[i].strMealThumb}" alt="">
                        <div class="meal-layer px-2 py-3 d-flex flex-column justify-content-center align-items-center">
                        <h3>${details[i].strMeal}</h3>
                         </div>
                  </div>
                </div>`;

         }
         document.getElementById("CatData").innerHTML = box3;

        }
          getDetails(nameofArea)
        })
      }



      var btn = document.querySelector('.btn')
      var input =document.querySelector('input');
      
      btn.addEventListener('click',function(){
          getIngredients(input.value)
      
      })


//   ^<<<<<<<<<<<< INGREDIENTS >>>>>>>>>>>>>>>>>>>>>>>

async function getIngredients(meal){


var loading=document.querySelector('.loading')
loading.classList.remove('d-none')

    var response =await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
    var data= await response.json()
     meals=data.meals;

     loading.classList.add('d-none')
$(".itemCategory").empty();
let ingBox=``;
for(var i=0;i<20;i++){

    let descriptionOfIngredient = meals[i].strDescription
      let fDesc = descriptionOfIngredient.split(" ").splice(0, 15).join(" ")

     ingBox+=` <div class="col-md-3">
            <div class="ingredients text-white text-center">
                <i class="fa-solid fa-drumstick-bite fa-3x"></i>
                <h3>${meals[i].strIngredient}</h3>
                <p>$${fDesc}</p>
            </div>
        </div>`
}

document.getElementById('CatData').innerHTML=ingBox;

$(".ingredients").click(function (e) {
    let nameOfTheMeal = e.target.innerText;
    let details

    async function ingDetails(nameOfTheMeal) {
      let apiRespose = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${nameOfTheMeal}`);
      let finalResult = await apiRespose.json();
      details = finalResult.meals;

      let hasala = ``
      for (let i = 0; i < details.length; i++) {
        hasala += `<div class="col-md-3 my-3 py-3 px-4">
      <div class="ingredients position-relative text-center">
          <img class=" img-fluid" src="${details[i].strMealThumb}" alt="">
          <div class=" desc  text-white px-2 py-3 d-flex flex-column justify-content-center align-items-center">
              <h3>${details[i].strMeal}</h3>
          </div>
      </div>
      </div>`;
      }
      document.getElementById('CatData').innerHTML = hasala;
    }
    ingDetails(nameOfTheMeal)
})

}


$("#Search").click(function () {

    $(".itemSec").toggle(1000);
  
    if ($(".sideBar").css("left") === "0px") {
      $(".sideBar").animate({ left: `-${boxWidth}` }, 500);
    }
    else {
      $(".sideBar").animate({ left: `0px` }, 500);
    }
  
    document.getElementById("dispCat").innerHTML = ``;
    document.getElementById("contact").innerHTML = ``;
  
    let cartona = ``;
    cartona += `<div class="search d-flex justify-content-evenly">
    <input id="sName" onkeyup="searchName()" class=" sName py-2 text-center text-muted" type="text" placeholder=" Search By Name">
    <input id="sFirstLetter" onkeyup="searchFL()" class=" sFirstLetter py-2 text-center text-muted" type="text" placeholder=" Search By First Letter">
  </div>`
    document.getElementById("searchSection").innerHTML = cartona;
  })
  
  async function searchFL() {
    let firstLetter = document.getElementById("sFirstLetter").value;
    let apiRespose = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
    let finalResult = await apiRespose.json();
    let sName = finalResult.meals;
  
    let cartona = ``;
    for (let i = 0; i < sName.length; i++) {
  
      cartona += `<div class="col-md-3 my-3 py-3 px-4">
      <div class="itemCategory position-relative text-center">
          <img class=" img-fluid" src="${sName[i].strMealThumb}" alt="">
          <div class=" desc px-2 py-3 d-flex flex-column justify-content-center align-items-center">
              <h3>${sName[i].strMeal}</h3>
          </div>
      </div>
    </div>`
    }
    document.getElementById("dispCat").innerHTML = cartona;
  
    $(".itemCategory").click(function (e) {
      let nameOfTheMeal = e.target.innerText;
  
      let details
      async function getDetails(nameOfTheMeal) {
        let apiRespose = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nameOfTheMeal}`);
        let finalResult = await apiRespose.json();
        details = finalResult.meals;
  
        let cartona = `<div class="col-md-5 my-3 py-3 px-4">
        <div class="itemCategory position-relative text-center">
            <img class=" img-fluid" src="${details[0].strMealThumb}"
                alt="">
            <div class=" desc px-2 py-3 d-flex flex-column justify-content-center align-items-center">
                <h3>${details[0].strMeal}</h3>
            </div>
        </div>
    </div>
    <div class="col-md-6 my-y py-3 px-4">
        <h2 class=" text-light">${details[0].strMeal}</h2>
        <h3 class=" text-light">'${details[0].strArea} Meal'</h3>
        <p class=" text-light">Instruction : ${details[0].strInstructions}</p>
        <h5 class="text-info">Mean Ingredients : ${details[0].strIngredient1}, ${details[0].strIngredient2}, ${details[0].strIngredient3}, ${details[0].strIngredient4}, ${details[0].strIngredient5}, ${details[0].strIngredient6}, ${details[0].strIngredient7}, ${details[0].strIngredient8}, ${details[0].strIngredient9}, ${details[0].strIngredient10}</h5>
        <a href="${details[0].strYoutube}"><button class="btn btn-outline-danger my-3">Watch Video</button><a/>
    </div>`;
        document.getElementById("dispCat").innerHTML = cartona;
      }
      getDetails(nameOfTheMeal)
    })
  }
  
  async function searchName() {
    let mealName = document.getElementById("sName").value;
    let apiRespose = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
    let finalResult = await apiRespose.json();
    let sName = finalResult.meals;
  
    let cartona = ``;
    for (let i = 0; i < sName.length; i++) {
  
      cartona += `<div class="col-md-3 my-3 py-3 px-4">
      <div class="itemCategory position-relative text-center">
          <img class=" img-fluid" src="${sName[i].strMealThumb}" alt="">
          <div class=" desc px-2 py-3 d-flex flex-column justify-content-center align-items-center">
              <h3>${sName[i].strMeal}</h3>
          </div>
      </div>
    </div>`
    }
    document.getElementById("dispCat").innerHTML = cartona;
  
    $(".itemCategory").click(function (e) {
      let nameOfTheMeal = e.target.innerText;
  
      let details
      async function getDetails(nameOfTheMeal) {
        let apiRespose = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nameOfTheMeal}`);
        let finalResult = await apiRespose.json();
        details = finalResult.meals;
  
        let cartona = `<div class="col-md-5 my-3 py-3 px-4">
        <div class="itemCategory position-relative text-center">
            <img class=" img-fluid" src="${details[0].strMealThumb}"
                alt="">
            <div class=" desc px-2 py-3 d-flex flex-column justify-content-center align-items-center">
                <h3>${details[0].strMeal}</h3>
            </div>
        </div>
    </div>
    <div class="col-md-6 my-y py-3 px-4">
        <h2 class=" text-light">${details[0].strMeal}</h2>
        <h3 class=" text-light">'${details[0].strArea} Meal'</h3>
        <p class=" text-light">Instruction : ${details[0].strInstructions}</p>
        <h5 class="text-info">Mean Ingredients : ${details[0].strIngredient1}, ${details[0].strIngredient2}, ${details[0].strIngredient3}, ${details[0].strIngredient4}, ${details[0].strIngredient5}, ${details[0].strIngredient6}, ${details[0].strIngredient7}, ${details[0].strIngredient8}, ${details[0].strIngredient9}, ${details[0].strIngredient10}</h5>
        <a href="${details[0].strYoutube}"><button class="btn btn-outline-danger my-3">Watch Video</button><a/>
    </div>`;
        document.getElementById("dispCat").innerHTML = cartona;
      }
      getDetails(nameOfTheMeal)
    })
  }
  
//  ^ ====================== contact us =====================
  
  $("#ContactUs").click(function () {
  
    $(".itemSec").toggle(1000);
  
    if ($(".sideBar").css("left") === "0px") {
      $(".sideBar").animate({ left: `-${boxWidth}` }, 500);
    }
    else {
      $(".sideBar").animate({ left: `0px` }, 500);
    }

    


    function inputs(){
    document.getElementById("searchSection").innerHTML = ``;
    document.getElementById("dispCat").innerHTML = ``;
  
    let cartona =+ `<div class="container w-50">
    <h2 class=" text-center mb-5 text-light">Contact Us...</h2>
    <div class="row">
        <div class="col-md-6 mb-4 ">
            <div class="itemInput">
                <input id="nameContact" class=" contactInput text-muted" type="text" placeholder="Enter Your Name">
            </div>
        </div>
        <div class="col-md-6 mb-4 ">
            <div class="itemInput">
                <input onkeyup="validation()" id="emailContact" class=" contactInput text-muted" type="email" placeholder="Enter Email">
            </div>
        </div>
        <div class="col-md-6 mb-4 ">
            <div class="itemInput">
                <input onkeyup="validation()" id="phoneContact" class=" contactInput text-muted" type="text" placeholder="Enter Phone">
            </div>
        </div>
        <div class="col-md-6 mb-4 ">
            <div class="itemInput">
                <input id="ageContact" class=" contactInput text-muted" type="text" placeholder="Enter Age">
            </div>
        </div>
        <div class="col-md-6 mb-4 ">
            <div class="itemInput">
                <input onkeyup="validation()" id="passContact" class=" contactInput text-muted" type="password" placeholder="Enter Passowrd">
            </div>
        </div>
        <div class="col-md-6 mb-4 ">
            <div class="itemInput">
                <input onkeyup="validation()" id="rePassContact" class=" contactInput text-muted" type="password" placeholder="Enter RePassword">
            </div>
        </div>
    </div>
    <div class="warning text-center text-warning mb-3"></div>
    <button id="btnContact" class=" btn btn-outline-danger " disabled >Submit</button>
  </div>`;
    document.getElementById("contact").innerHTML = cartona;
    }
  })

  
  // ======================== validation ====================
  
  function validation() {
    function validatEmail() {
      let emailContact = $("#emailContact").val();
      let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (regexEmail.test(emailContact) == true) {
        return true;
      }
      else {
        return false;
      }
    }
  
    function validatPhone() {
      let phoneContact = $("#phoneContact").val();
      let regexPhone = /^(002)?01[0125][0-9]{8}$/;
      if (regexPhone.test(phoneContact) == true) {
        return true;
      }
      else {
        return false;
      }
    }
  
    function validatPassword() {
      let passContact = $("#passContact").val();
      let regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      if (regexPassword.test(passContact) == true) {
        return true;
      }
      else {
        return false;
      }
    }
  
    function validatRePassword() {
      let rePassContact = $("#rePassContact").val();
      let passContact = $("#passContact").val();
      if (rePassContact == passContact) {
        return true;
      }
      else {
        return false;
      }
    }
  
    if (validatEmail() == true && validatPhone() == true && validatPassword() == true && validatRePassword() == true) {
      $("#btnContact").removeAttr("disabled");
    }
    else if (validatEmail() == false) {
      $(".warning").text("please enter a valid email email@exalple.com")
    }
    else if (validatPhone() == false) {
      $(".warning").text("please enter a valid egyption phone number ")
    }
    else if (validatPassword() == false) {
      $(".warning").text("please enter at least 8 charchter consists of at least 1 number")
    }
    else if (validatRePassword() == false) {
      $(".warning").text("password doesn't match")
    }
  }

  