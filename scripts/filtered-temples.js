const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg",
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg",
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg",
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg",
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg",
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg",
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg",
  },
  {
    templeName: "Boise Idaho",
    location: "Boise, Idaho, United States",
    dedicated: "1984, May, 25",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/boise-idaho/400x250/boise-idaho-temple-lds-137865-wallpaper.jpg",
  },
  {
    templeName: "Provo Utah",
    location: "Provo, Utah, United States",
    dedicated: "1972, February, 9",
    area: 148000,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/provo-utah/400x250/provo-utah-temple-lds-1075601-wallpaper.jpg",
  },
  {
    templeName: "Houston Texas",
    location: "Houston, Texas, United States",
    dedicated: "2000, April, 2",
    area: 193000,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/houston-texas/400x250/houston-texas-temple-lds-273999-wallpaper.jpg",
  },
];

const grid = document.querySelector("#temple-grid");
const navLinks = document.querySelectorAll(".navigation a");
const hamButton = document.querySelector("#menu-button");
const navigation = document.querySelector(".navigation");

function getYear(dateText) {
  const match = dateText.match(/(\d{4})/);
  return match ? parseInt(match[1], 10) : 0;
}

function getFilteredTemples(filter) {
  switch (filter) {
    case "old":
      return temples.filter((temple) => getYear(temple.dedicated) < 1900);
    case "new":
      return temples.filter((temple) => getYear(temple.dedicated) > 2000);
    case "large":
      return temples.filter((temple) => temple.area > 90000);
    case "small":
      return temples.filter((temple) => temple.area < 10000);
    default:
      return temples;
  }
}

function updateActiveLink(activeLink) {
  navLinks.forEach((link) => link.classList.remove("active"));
  activeLink.classList.add("active");
}

function renderTemples(filter) {
  const filteredTemples = getFilteredTemples(filter);
  grid.innerHTML = "";

  if (filteredTemples.length === 0) {
    grid.innerHTML = '<p class="empty-state">No temples match this view.</p>';
    return;
  }

  filteredTemples.forEach((temple) => {
    const figure = document.createElement("figure");
    figure.className = "temple-card";

    const imageSrc = temple.imageUrl || "images/temple-placeholder.svg";

    figure.innerHTML = `
      <img
        src="${imageSrc}"
        alt="${temple.templeName}"
        loading="lazy"
        decoding="async"
        width="400"
        height="250"
        onerror="this.onerror=null;this.src='images/temple-placeholder.svg';"
      />
      <figcaption>
        <h2>${temple.templeName}</h2>
        <p><strong>Location:</strong> ${temple.location}</p>
        <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
        <p><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
      </figcaption>
    `;

    grid.appendChild(figure);
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const filter = link.dataset.filter || "home";
    updateActiveLink(link);
    renderTemples(filter);

    if (navigation.classList.contains("open")) {
      navigation.classList.remove("open");
      hamButton.classList.remove("open");
      hamButton.setAttribute("aria-expanded", "false");
    }
  });
});

hamButton.addEventListener("click", () => {
  navigation.classList.toggle("open");
  hamButton.classList.toggle("open");
  const isExpanded = hamButton.getAttribute("aria-expanded") === "true";
  hamButton.setAttribute("aria-expanded", String(!isExpanded));
});

renderTemples("home");
