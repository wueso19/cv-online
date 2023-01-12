/***********************************
 * Scroll Smooth Effect
 **********************************/
// const navLinks = [...document.querySelectorAll(".navbar ul li a")];
// const sections = [...document.querySelectorAll("section")];
// const main = document.querySelector("main");

// let sectionsPosition;

// const positionCalculation = () => {
//   if (window.innerWidth > 1024) {
//     sectionsPosition = sections.map((section) => section.offsetTop);
//   } else {
//     sectionsPosition = sections.map((section) => section.offsetTop - 80)
//   }
// };

// positionCalculation();

// const addScrollSmooth = (e) => {
//   const linkIndex = navLinks.indexOf(e.target);
//   main.scrollTo({
//     top: sectionsPosition[linkIndex],
//     behavior: "smooth",
//   });
// };

// navLinks.forEach((link) => link.addEventListener("click", addScrollSmooth));

// window.addEventListener("resize", positionCalculation);

/***********************************
 * Navigation Active Link
 **********************************/
const itemContainer = document.getElementById("navbar");

let items = itemContainer.getElementsByClassName("nav-link");

for (let i = 0; i < items.length; i++) {
  items[i].addEventListener("click", function () {
    let current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

/***********************************
 * Api requests
 **********************************/
const presentation = document.getElementById("presentation");
const logo = document.getElementById("logo");
const userStorage = window.localStorage;

const getUserAsync = async () => {
  try {
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();
    const user = await data.results[0];
    userStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    console.error(error);
    userStorage.removeItem("user");
  }
};

const presentationHtml = (userData) => {
  const { name, email, picture, location, cell, phone } = userData;

  logo.innerHTML = `<a href="/" class="logo">${name.first}</a>`;

  presentation.innerHTML = `
      <img class="rounded" src="${picture.large}" alt="Imagen de ${
    name.first + " " + name.last
  }" class="mb-4" width="208px" height="208px" />

      <h1 class="mb-2 mt-0">${name.first + " " + name.last}</h1>
      <span>Soy Frontend Developer</span>

      <ul class="social-icons light list-inline mb-0 mt-4">
        <li class="list-inline-item"><a href="https://www.linkedin.com/" target="_blank"><i class="fab fa-linkedin"></i></a></li>
        <li class="list-inline-item"><a href="https://github.com" target="_blank"><i class="fab fa-github"></i></a></li>
        <li class="list-inline-item"><a href="https://about.gitlab.com/" target="_blank"><i class="fab fa-gitlab"></i></a></li>
        <li class="list-inline-item"><a href="https://hub.docker.com/u/paulgoio" target="_blank"><i class="fab fa-docker"></i></a></li>
        <li class="list-inline-item"><a href="https://api.whatsapp.com/send/?phone=${cell}" target="_blank"><i class="fa-brands fa-whatsapp"></i></i></a></li>
      </ul>

      <div class="mt-4">
        <a href="mailto:${email}" class="btn btn-default">Contrátame</a>
      </div>
    `;
};

const aboutMe = (userData) => {
  const { name, email, picture } = userData;

  const profileImg = document.getElementById("profile-img");
  const hireMe = document.getElementById("hire-me");

  profileImg.src = picture.large;
  profileImg.alt = `Imagen de ${name.first + " " + name.last}`;

  hireMe.href = `mailto:${email}`;
};

getUserAsync().then(() => {
  try {
    userData = JSON.parse(userStorage.getItem("user"));
    if (userData) {
      presentationHtml(userData);
      aboutMe(userData);
      contactMe(userData);
    }
  } catch (error) {
    console.error(error);
  }
});

/***********************************
 * Contact
 **********************************/
const contactMe = (userData) => {
  const { email, location, cell, phone } = userData;

  const infoLocation = document.getElementById("info-location");
  const infoEmail = document.getElementById("info-email");
  const infoCell = document.getElementById("info-cell");
  const infoTel = document.getElementById("info-tel");

  infoLocation.innerHTML = `${location.street.name},<br>${location.city}`;

  infoEmail.href = `mailto:${email}`;
  infoEmail.innerHTML = email;

  infoCell.href = `callto:${cell}`;
  infoCell.innerHTML = cell;

  infoTel.href = `callto:${phone}`;
  infoTel.innerHTML = phone;
};

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Enviado!!");
});
