const mainFollower = document.querySelector(".main__follower");

const overviewContainer = document.querySelector(".overview__container");

let dataOverview = "";
const url = "./assets/data/data.json";

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    dataOverview = data.overview;
    render(data.overview);
    renderOverview(data["overview-today"]);
  })
  .catch((error) => {
    console.log("ha ocurrido un error: " + error);
  });

function render(data) {
  data.map(function (item) {
    let stateText = document.querySelector(".state__text");
    let nameIcon = "";

    if (item.isUp) {
      nameIcon = "icon-up.svg";
    } else {
      nameIcon = "icon-down.svg";
    }
    let bordeColor;
    let color = item.network;

    switch (color) {
      case "Facebook":
        bordeColor = "Facebook";
        break;
      case "Twitter":
        bordeColor = "Twitter";
        break;
      case "Instagram":
        bordeColor = "Instagram";
        break;
      case "YouTube":
        bordeColor = "YouTube";
        break;
    }

    const templateCardFollower = `
    
    <div class="follower__card ${bordeColor} ">
      <div class="follower__card__content" >
        <div class="content__info">
          <div className="info__red-social">
          <img src="./assets/images/icon-${item.network}.svg" 
          alt="icon de ${item.network}"  /></div>
          <p class="info__name">${item.user}</p>
        </div>
        <p class="content__audience">${item.audience}</p>
        <p class="content__text">${item.audienceType}</p>
        <div class="content__state">
          <img src="./assets/images/${nameIcon}" alt="${nameIcon}" class="state__img"/>
          <p class="state__text ${item.isUp ? "up" : "down"} ">
          ${item.today} Today</p>
        </div>
      </div>
    </div>`;
    mainFollower.innerHTML += templateCardFollower;
  });
}

function renderOverview(data) {
  data.map(function (item) {
    let nameIcon = "";

    if (item.isUp) {
      nameIcon = "icon-up.svg";
    } else {
      nameIcon = "icon-down.svg";
    }
    const templateCardOverview = ` 
    <div class="overview__item">
      <div class="item__titles">
        <p class="item__statsType">${item.statsType}</p>
        <img src="./assets/images/icon-${item.network}.svg" 
        alt="Icono de ${item.network}" class="item__network" />
    </div>
    <div class="items__stacts">
      <p class="stacts__stact">${item.stats}</p>
      <div class="stact__container">
      <img src="./assets/images/${nameIcon}" alt= "Icono de state" class="stact__img" />
        <p class="porcentage ${item.isUp ? "up" : "down"} ">${item.porcentage}%</p>
      </div>
    </div>
  </div>
</section>`;

    overviewContainer.innerHTML += templateCardOverview;
  });
}

// Función encargada de activar el modo dark

document.addEventListener("DOMContentLoaded", () => {
  
  const inputModoDark = document.getElementById("container-dark-mode__input");

  const root = document.documentElement;

  if (root.getAttribute('data-theme') === "dark") {
    inputModoDark.checked= true;
  }


  inputModoDark.addEventListener("input", () => {
    const containerBtn = document.querySelector(".container-dark-mode__btn")
     inputModoDark.checked ? containerBtn.classList.add("active") : containerBtn.classList.remove("active")
    toggleModoDark();
  });

  function toggleModoDark() {
    const setTheme= inputModoDark.checked ? 'dark' : 'light';


    root.setAttribute('data-theme', setTheme);
    localStorage.setItem('theme', setTheme);
  }
});
