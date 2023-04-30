const ramenMenu = document.querySelector("#ramen-menu");
const ramenDetail = document.querySelector("#ramen-detail");
const ratingDisplay = document.querySelector("#rating-display");
const commentDisplay = document.querySelector("#comment-display");
const newRamenForm = document.querySelector("#new-ramen");

// render ramen images in the ramen menu
function renderRamen(ramen) {
  const ramenImg = document.createElement("img");
  ramenImg.src = ramen.image;
  ramenImg.alt = ramen.name;
  ramenImg.dataset.id = ramen.id;

  ramenMenu.append(ramenImg);
}

// render the selected ramen's details
function renderRamenDetail(ramen) {
    const detailImg = document.getElementById('ramen-detail-image');
    const detailName = document.getElementById('ramen-detail-name');
    const detailRestaurant = document.getElementById('ramen-detail-restaurant');
    const detailRating = document.getElementById('ramen-detail-rating');
    const detailComment = document.getElementById('ramen-detail-comment');
  
    if (detailImg) {
      detailImg.src = ramen.image;
    }
    if (detailName) {
      detailName.textContent = ramen.name;
    }
    if (detailRestaurant) {
      detailRestaurant.textContent = ramen.restaurant;
    }
    if (detailRating) {
      detailRating.textContent = ramen.rating;
    }
    if (detailComment) {
      detailComment.textContent = ramen.comment;
    }
  }
  

// fetch all ramens and render them in the ramen menu
fetch("http://localhost:3000/ramens")
  .then((response) => response.json())
  .then((ramens) => {
    ramens.forEach((ramen) => {
      renderRamen(ramen);
    });
  });

// render the details of the first ramen by default
fetch("http://localhost:3000/ramens/1")
  .then((response) => response.json())
  .then((ramen) => {
    renderRamenDetail(ramen);
  });

// listen for clicks on ramen images and render the selected ramen's details
ramenMenu.addEventListener("click", (event) => {
  if (event.target.matches("img")) {
    const ramenId = event.target.dataset.id;

    fetch(`http://localhost:3000/ramens/${ramenId}`)
      .then((response) => response.json())
      .then((ramen) => {
        renderRamenDetail(ramen);
      });
  }
});

// listen for form submission and create a new ramen
newRamenForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newRamen = {
    name: event.target.name.value,
    restaurant: event.target.restaurant.value,
    image: event.target.image.value,
    rating: event.target.rating.value,
    comment: event.target.comment.value,
  };

  fetch("http://localhost:3000/ramens", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newRamen),
  })
    .then((response) => response.json())
    .then((ramen) => {
      renderRamen(ramen);
      event.target.reset();
    });
});
