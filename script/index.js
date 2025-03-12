
function removeActiveClass() {
   const activeButtons = document.getElementsByClassName("active");
   for(let btn of activeButtons){
      btn.classList.remove("active");
   }
};


function loadCategories() {
    //fetch the data

   fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    //2 - convert promise to json
   .then((res) => res.json())
   //3 - send data to display
   .then((data) => displayCategories(data.categories));

};

function loadVideos() {
   fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
   .then((response) => response.json())
   .then((data) => {
      removeActiveClass();
      document.getElementById("btn-all").classList.add("active")
      displayVideos(data.videos);
   });
   
};

const loadCategoryVideos = (id) =>{
   const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id} `;
   //console.log(url);
   fetch (url)
   .then ((res) => res.json())
   .then((data) => {
      removeActiveClass();
      const clickedButton = document.getElementById(`btn-${id}`);
      clickedButton.classList.add("active");
      //console.log(clickedButton);
      
      displayVideos(data.category);

   });
   
};

const loadVideoDetails = (videoId) => {
   const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    //console.log(url);
    fetch (url)
    .then ((res) => res.json())
    .then ((data) => displayVideoDetails(data.video));
    
    
};

const displayVideoDetails = (video) => {
     document.getElementById("video_details").showModal();
     const detailsContainer = document.getElementById("details_container");
     detailsContainer.innerHTML = `
     <h2>${video.title}</h2>
     `;
}

// {"category_id": '1001',
//  "category": 'Music'}
function displayCategories(categories){
   //get the container
   const categoryContainer = document.getElementById("category-container");
   //loop operation on array of object
   for(let cat of categories){
    // console.log(cat);
    
      //create element
      const categoryDiv = document.createElement("div");
      categoryDiv.innerHTML = `
      <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
      `;
   //append the element
   categoryContainer.append(categoryDiv);
   }
  
   
};
 

const displayVideos =(videos)=>{
     //console.log(videos);
     
     const videoContainer = document.getElementById("video-container");
     videoContainer.innerHTML = "";

    if (videos.length == 0) {
      videoContainer.innerHTML = `
      <div class="col-span-full flex flex-col justify-center items-center text-center py-20">
            <img src="./assets/Icon.png" alt="">
            <h2 class="text-2xl font-bold">Oops!! Sorry, There is no <br> content here</h2>
        </div>
      `;
      return;
    }

     videos.forEach((video) => {
        //console.log(video);
        const videoCard = document.createElement("div");
        videoCard.innerHTML = `
           <div class="card bg-base-100 shadow-sm">
            <figure class="relative">
               <img class="w-full h-[180px] object-cover"
                src="${video.thumbnail}"
                alt="" />
                <span class="absolute bottom-2 right-2 text-sm text-white bg-black p-2 rounded">3hrs 56 min ago</span>
            </figure>
               <div class="px-2 py-5 flex gap-3">
                 <div class="profile">
                    <div class="avatar">
                        <div class="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
                          <img src="${video.authors[0].profile_picture}" />
                        </div>
                      </div>
                 </div>
                 <div class="intro">
                    <h2 class="text-sm font-semibold">${video.title}
                    </h2>
                    <p class="text-sm text-gray-400 flex gap-2"> ${video.authors[0].profile_name}
                        <img class="w-5 h-5" src="https://img.icons8.com/?size=128&id=eZo3c88c63il&format=png" alt=""></p>
                        <p class="text-sm text-gray-400">${video.others.views}</p>
                 </div>
            </div>
            <button onclick=loadVideoDetails('${video.video_id}') class="btn btn-block">Show Details</button>
          </div>

        `;

         //append
         videoContainer.append(videoCard);
     });


};

loadCategories();