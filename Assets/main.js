// declaring Api Key and main img url :

const api_key = '04c35731a5ee918f014970082a0088b1';

const img_path = 'https://image.tmdb.org/t/p/w1280';




// Declaring global variables :

const search_List = document.querySelector(".main_container_search-list");
const search_input = document.getElementById("serach-input"); 
const LastSeen_list = document.querySelector(".main_container-watching-list");
const top_list = document.querySelector(".main_top-rated-list");
const playing_List = document.querySelector(".main_container-playing-list");
const main_container = document.querySelector(".main_container-popular");
const options_container = document.querySelector(".options_container-menu");
const options_container_li = options_container.querySelectorAll("li");
const options_container_tools = document.querySelector(".options_container-tools");
const options_container_tools_li = options_container_tools.querySelectorAll("li");
const movie_container = document.getElementById("movie-container");
const search_content = document.querySelector(".main_container_search-content");
const dark_switcher =document.getElementById("dark-mode-switcher");
const aside = document.querySelector("aside")
const main = document.querySelector("main")
const lastWatching = document.querySelector(".main_container-watching");
const notificationBtn = document.getElementById("notification");
const messagingBtn = document.getElementById("messaging");
const notification_modal = notificationBtn.querySelector(".notification")
const messaging_modal = messagingBtn.querySelector(".messaging")
const top_rated = document.querySelector(".main_top-rated");
const playing = document.querySelector(".main_container-playing");




// Fetch Data From Api url :
async function getMovies(sort, page = 1, id = 1){
   let resp;
   if(sort === "search"){
      resp= await fetch(searchUrl(search_input.value));
   }else if (sort === "recommendation"){
      resp = await fetch(getRecommendationURL(id))
   }
   else{
      resp= await fetch(getMovieUrl(sort, page));
   }
   const respData = await resp.json()
   
   return respData;
}


// Get Url by Search Keyword :
function searchUrl(keyword){
   const api_url = `https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&query=${keyword}&`;

   return api_url;
}

// Get Url by collection :
function getMovieUrl(collection, page = 1){
   let api_url;
   if(collection === 'trending'){
      api_url = `https://api.themoviedb.org/3/trending/all/day?api_key=04c35731a5ee918f014970082a0088b1`;
   }else{
      api_url = `https://api.themoviedb.org/3/movie/${collection}?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&page=${page}`
   }
   return api_url;
}

// Get recommendation url :
function getRecommendationURL(id){
   const api_url = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=04c35731a5ee918f014970082a0088b1&language=en-US`
   return api_url;
}


// Create recommendation Elements :
async function getRecommendation(id){
   const recommendation_List = document.getElementById("movie-container_recommendation-list")
   let respData;
   if(respData !== undefined ){
      respData =await getMovies("recommendation", 1, id);
      console.log("worked")
   }else{
      respData = await getMovies("trending")
      console.log("not worked")
   }
   respData.results.forEach(movie => {
      let title = movie.original_title;
      let img = movie.poster_path;
      if(img === null){
         img = movie.backdrop_path
      }
      if(movie.original_title === undefined){
         title = movie.name;
         if(title === undefined ){
            title = movie.original_name
         }
      }else if(movie.original_language !== "en") {
         title = movie.title
      }
      const movieEl = document.createElement("li")
      recommendation_List.innerHTML += `
         <li>
            <img src="${img_path + img}" alt="">
            <div class="recommendation_content">
            <h3>${title}</h3>
               <button class="rec-watchBtn">Watch</button>
               </div>
         </li>
      `

      
   })

   

   movie_container.innerHTML += `
      <div class="movie-container_watch">
         <div class="watch-btn_container">
            <div class="watch-btn">
               <i class="fas fa-play"></i>
               <button>
               </button>
               </div>
               </div>
               <h3>Watch <br> the movie</h3>
            </div>
   `

}





// Create main Movies page elements :
async function setMovie(collection, list_name){

   const respData = await getMovies(collection);
   respData.results.forEach(movie => {
      let title = movie.original_title; 
      if(movie.original_title === undefined){
         title = movie.name;
         if(title === undefined ){
            title = movie.original_name
         }
      }
      const movieEl = document.createElement('li');
      if(collection === "upcoming"){
         movieEl.innerHTML = `
            <div class="main_container-watching-card">
               <img src="${img_path + movie.poster_path}" alt="${movie.original_title}">
               <p class="main_container-watching-card-titile">${title}</p>
               <p class="date">${movie.release_date}</p class="date">
               <p class="main_container-watching-card-rate">${movie.vote_average}/10</p>
            </div>
         `
      }else{
         movieEl.innerHTML = `
            <div class="main_container-watching-card">
               <img src="${img_path + movie.poster_path}" alt="${movie.original_title}">
               <p class="main_container-watching-card-titile">${title}</p>
               <p class="main_container-watching-card-rate">${movie.vote_average}/10</p>
            </div>
         `
      }
      movieEl.addEventListener("click", ()=>{
         console.log("hellolask")


         let img = movie.backdrop_path;
         if(img === null){
            img = movie.poster_path;
         } 
         let date;
         if(movie.release_date){
            date = movie.release_date
         }else{
            date = ``
         }
         movie_container.classList.add("display")
         movie_container.style.backgroundImage = `url(${img_path + img})`
         movie_container.innerHTML = `
            <div class="movie-container_backBtn" onclick="display()" id="movie-container_backBtn">
            <i class="fas fa-angle-double-left"></i>
            </div>
            <h1 class="movie-container_title">${title}</h1>
            <div class="movie-container_content">
               <P class="movie-container-description">${movie.overview}</P>
               <div class="movie-container_content-tools">
                  <h3>${date}</h3>
                  <h3 class="bordred">${movie.vote_average}/10</h3>
                  <div>
                     <h3>${movie.popularity}</h3>
                     <i class="fas fa-eye"></i>
                  </div>
               </div>
            </div>
            <div class="movie-container_recommendation">
               <h2>Recommendations</h2>
               <ul class="movie-container_recommendation-list" id="movie-container_recommendation-list"></ul>
            </div>
         `
         getRecommendation(movie.id)
         
         const content = document.querySelector(".rec-watchBtn")
      })
      const movieBackBtn = document.getElementById("movie-container_backBtn");
      list_name.appendChild(movieEl)
   })

}








setMovie("upcoming", LastSeen_list)
setMovie("now_playing", playing_List)
setMovie("trending", top_list)



// Create Search output elements : 
async function setSearchMovie(){
   search_List.innerHTML = "";
   const respData = await getMovies("search");
   respData.results.forEach(movie => {
      

      let title = movie.original_title;
      let img = movie.poster_path;
      if(img === null){
         img = movie.backdrop_path
      }
      if(movie.original_title === undefined){
         title = movie.name;
         if(title === undefined ){
            title = movie.original_name
         }
      }else if(movie.original_language !== "en") {
         title = movie.title
      }
      if(img !== null){
         
         const movieEl = document.createElement('li');
         movieEl.innerHTML += `
            <img src="${img_path + img}" alt="">
            <p>${title}</p>
         `
         movieEl.addEventListener("mousedown", ()=>{
            anime({
               targets: '.main_container_search-content',
               translateY: -100,
               translateX: 0,
               duration: 500,
               easing: 'cubicBezier(0.390, 0.575, 0.565, 1.000)'
             });
             let date;
             if(movie.release_date){
                date = movie.release_date
             }else{
                date = ``
             }
            console.log("hhhhehe")
            movie_container.classList.add("display")
            movie_container.style.backgroundImage = `url(${img_path + img})`
            movie_container.innerHTML = `
               <div class="movie-container_backBtn" onclick="display()" id="movie-container_backBtn">
               <i class="fas fa-angle-double-left"></i>
               </div>
               <h1 class="movie-container_title">${title}</h1>
               <div class="movie-container_content">
                  <P class="movie-container-description">${movie.overview}</P>
                  <div class="movie-container_content-tools">
                     <h3>${date}</h3>
                     <h3 class="bordred">${movie.vote_average}/10</h3>
                     <div>
                        <h3>${movie.popularity}</h3>
                        <i class="fas fa-eye"></i>
                     </div>
                  </div>
               </div>
               <div class="movie-container_recommendation">
                  <h2>Recommendations</h2>
                  <ul class="movie-container_recommendation-list" id="movie-container_recommendation-list"></ul>
               </div>
            `
            getRecommendation(movie.id)
            const content = document.querySelector(".rec-watchBtn")
            content.addEventListener("click",()=>{
               console.log("llpll")
            })
            movie_container.style.display = "initial";
         })
         
         search_List.appendChild(movieEl)
      }
   })

}


// Create Main Picture element : 
async function MainPicture(){
   search_List.innerHTML = "";
   const respData = await getMovies("trending");
   const respData_result= respData.results.sort(() => Math.random() - Math.random()).slice(0, 1)

   respData_result.forEach(movie => {
      

      let title = movie.original_title;
      let img = movie.backdrop_path;
      if(img === null){
         img = movie.poster_path;
      } 
      if(movie.original_title === undefined){
         title = movie.name;
         if(title === undefined ){
            title = movie.original_name
         }
      }else if(movie.original_language !== "en") {
         title = movie.title
      }
      main_container.innerHTML += `
         <img src="${img_path + img}" alt="">
         <p class="main_container-popular-title">
            ${title}
         </p>
         <p class="main_container-popular-rate">
         ${movie.vote_average} / 10
         </p>
         <button class="mainBtn one">Watch</button>
         <button class="mainBtn movie two">About</button>
         <button class="secondBtn">
            <i class="fa-solid fa-plus"></i>
         </button>
      `
      const watchBtn = document.querySelector(".mainBtn.one");
      watchBtn.addEventListener("click", ()=>{
         console.log("hellolask")
         let img = movie.backdrop_path;
         if(img === null){
            img = movie.poster_path;
         }
         let date;
         if(movie.release_date){
            date = movie.release_date
         }else{
            date = ``
         }
         movie_container.classList.add("display")
         movie_container.style.backgroundImage = `url(${img_path + img})`
         movie_container.innerHTML = `
            <div class="movie-container_backBtn" onclick="display()" id="movie-container_backBtn">
            <i class="fas fa-angle-double-left"></i>
            </div>
            <h1 class="movie-container_title">${title}</h1>
            <div class="movie-container_content">
               <P class="movie-container-description">${movie.overview}</P>
               <div class="movie-container_content-tools">
                  <h3>${date}</h3>
                  <h3 class="bordred">${movie.vote_average}/10</h3>
                  <div>
                     <h3>${movie.popularity}</h3>
                     <i class="fas fa-eye"></i>
                  </div>
               </div>
            </div>
            <div class="movie-container_recommendation">
               <h2>Recommendations</h2>
               <ul class="movie-container_recommendation-list" id="movie-container_recommendation-list"></ul>
            </div>
         `
         getRecommendation(movie.id)
         const content = document.querySelector(".rec-watchBtn")
      })
   })
   
}



MainPicture()



function display(){
   movie_container.classList.remove("display")
}


// Notification Toggle :
notificationBtn.addEventListener("click", ()=> {
   notification_modal.classList.toggle("active");
})


// Messages Toggle :
messagingBtn.addEventListener("click", ()=> {
   messaging_modal.classList.toggle("active");
})

// Dark mode Toggle :
dark_switcher.addEventListener("click", () => {
   dark_switcher.classList.toggle("dark");
   aside.classList.toggle("light")
   main.classList.toggle("light")
   lastWatching.classList.toggle("light")
   top_rated.classList.toggle("light")
   playing.classList.toggle("light")
})




//////////////////// Animations //////////////////

// Loading Animation:
const loading = document.querySelector(".load");
const loading_container = document.querySelector(".loading_container") 
const stroke_span = document.querySelector(".stroke-span");
const non_stroke_span = document.querySelector("non-stroke-span")





anime({
   targets: ".w",
   color: "#2c2d35",
   easing: 'linear',
   duration: 1500,
   delay:1000
})

anime({
   targets: ".a",
   color: "#2c2d35",
   easing: 'linear',
   duration: 1500,
   delay:1500
})

anime({
   targets: ".t",
   color: "#2c2d35",
   easing: 'linear',
   duration: 1500,
   delay:2000
})


anime({
   targets: ".c",
   color: "#2c2d35",
   easing: 'linear',
   duration: 1500,
   delay:2500
})
anime({
   targets: ".h",
   color: "#2c2d35",
   easing: 'linear',
   duration: 1500,
   delay:3000
})
anime({
   targets: ".f",
   color: "#2c2d35",
   easing: 'linear',
   duration: 1500,
   delay:3500
})
anime({
   targets: ".l",
   color: "#2c2d35",
   easing: 'linear',
   duration: 1500,
   delay:4000
})
anime({
   targets: ".i",
   color: "#2c2d35",
   easing: 'linear',
   duration: 1500,
   delay:4500
})
anime({
   targets: ".x",
   color: "#2c2d35",
   easing: 'linear',
   duration: 1500,
   delay:5000
})


anime({
   targets: stroke_span,
   top :269.5,
   duration: 2000,
   delay: 5500,
   easing: 'easeOutBounce'
})
anime({
   targets: non_stroke_span,
   top :0,
   duration: 2000,
   delay: 5500,
   easing: 'easeOutBounce'
})


anime({
   targets : "body",
   backgroundColor : "#2c2d35",
   duration: 1000,
   delay : 8300,
   easing: 'linear'
})

anime({
   targets : loading_container,
   scale : 10.5,
   opacity: 0,
   delay:8000,
   duration: 800,
   easing: 'linear'
})



// Dark mode toggle animation : 

dark_switcher.onmouseover= ()=>{
   anime({
      targets: "dark-mode-switcher",
      rotate : 360,
   })
}



// Movie Page Animation :




// main page Animations //

// icons animation :

options_container_li.forEach(li =>{
   const icon = li.querySelector("i")
   li.onmouseover = ()=>{
      anime({
         targets : icon,
         rotate: 360
      })
   }
   li.onmouseout = ()=>{
      anime({
         targets : icon,
         rotate: 0
      })
   }

})



// Search input Animation :


search_input.onfocus = ()=>{
   search_content.style.display = "block";
   search_List.innerHTML = `
   <h1 class="no-result">No result</h1>
   `
}

search_input.onclick = ()=>{
   anime({
      targets: '.main_container_search-content',
      translateY: 620,
      translateX: 0,
      duration: 500,
      easing: 'cubicBezier(0.390, 0.575, 0.565, 1.000)'
    });
   }



search_input.onblur= ()=>{
   anime({
      targets: '.main_container_search-content',
      translateY: -100,
      translateX: 0,
      duration: 500,
      easing: 'cubicBezier(0.390, 0.575, 0.565, 1.000)'
    });
}
