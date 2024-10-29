const rainydaysAPI = "https://v2.api.noroff.dev/rainy-days";

let jackets = [];

async function getJackets() {
  try {
    const response = await fetch(rainydaysAPI);
    const { data } = await response.json();
    jackets = data;
    console.log(data);
    renderJackets(jackets);
  } catch (error) {
    console.error("Error fetching jackets:", error);
  }
}

getJackets();

function renderJackets(product) {
  const jacketsGrid = document.getElementById("jackets"); //dette er section id'en fra html!
  jacketsGrid.className = "jacket-grid";

  product.forEach((jacket) => {
    const jacketContainer = document.createElement("a");
    jacketContainer.href = `./products.html?id=${jacket.id}`;

    const img = document.createElement("img");
    img.src = jacket.image.url;
    img.alt = jacket.image.alt;

    const jacketName = document.createElement("h2");
    jacketName.textContent = jacket.title.replace(/^Rainy Days\s*/, "");

    jacketContainer.appendChild(img);
    jacketContainer.appendChild(jacketName);

    const jacketPrice = document.createElement("p");
    jacketPrice.textContent = jacket.discountedPrice;

    if (jacket.onSale) {
      const jacketDiscount = document.createElement("p");
      jacketDiscount.textContent = jacket.price;
      jacketDiscount.className = "jacket-discount";
      jacketContainer.appendChild(jacketPrice);
      jacketContainer.appendChild(jacketDiscount);
    } else {
      jacketContainer.appendChild(jacketPrice);
    }

    jacketsGrid.appendChild(jacketContainer);
  });
}

let currentIndex = 0;

function changeSlide(direction) {
  const slides = document.querySelector(".slides");
  const totalSlides = slides.children.length;
  currentIndex = (currentIndex + direction + totalSlides) % totalSlides;
  slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}
document
  .querySelector(".prev")
  .addEventListener("click", () => changeSlide(-1));
document.querySelector(".next").addEventListener("click", () => changeSlide(1));

document.getElementById("filter-butn").addEventListener("click", function () {
  const filterSelect = document.getElementById("filter-select");
  if (
    filterSelect.style.display === "none" ||
    filterSelect.style.display === ""
  ) {
    filterSelect.style.display = "block";
  } else {
    filterSelect.style.display = "none";
  }
});

function filterJackets() {
  const genderFilter = document.getElementById("gender-filter");
  genderFilter.textContent = jacket.gender;
}

// function applyFilter() {
//   const genderFilter = document.getElementById("gender-filter").value;
//   const saleFilter = document.getElementById("sale-filter").checked;

//   const filteredJackets = jackets.filter((jacket) => {
//     const matchesGender =
//       genderFilter === "all" || jacket.gender === genderFilter;
//   });
// }

// function showFilterOptions() {
//   const filterButn = document.getElementById("filter-butn");
//   const filterSelect = document.getElementById("filter-select");

//   filterButn.addEventListener("click", () =>
//     filterSelect.classList.toggle("visible")
//   );
// }

// function useFilter() {
//   const genderFilter = document.getElementById("gender-filter").value;
//   const saleFilter = document.getElementById("sale-filter").Checked;

//   const filteredJackets = jacket.filter((jacket) => {
//     const matchesGender =
//       genderFilter === "all" || jacket.gender === genderFilter;
//     const matchesSale = !saleFilter || jacket.onSale;
//     return matchesGender && matchesSale;
//   });

//   renderJackets(filteredJackets);

//   document.getElementById("filter-select").classList.remove("visible");
// }

// showFilterOptions();

// const useFilterButn = document.getElementById("use-filter");
// useFilterButn.addEventListener("click", useFilter);

// useFilter();

// const applyFilterButn = document.getElementById("use-filter");
// applyFilterButn.addEventListener("click", useFilter);
