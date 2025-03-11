
function loadCategories() {
    //fetch the data

   fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    //2 - convert promise to json
   .then((res) => res.json())
   //3 - send data to display
   .then((data) => displayCategories(data.categories));

}

function loadVideos() {
   fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
   .then((response) => response.json())
   .then((data) => displayVideos(data.videos));
   
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
      <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
      `;
   //append the element
   categoryContainer.append(categoryDiv);
   }
  
   
}
 

const displayVideos =(videos)=>{
     //console.log(videos);
     
     const videoContainer = document.getElementById("video-container");
     videos.forEach((video) => {
        console.log(video);
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
          </div>

        `;

         //append
         videoContainer.append(videoCard);
     });


};

loadCategories();