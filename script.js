const selectPlanet = document.getElementById("planets");
const planet = document.getElementById("planet");

let key = selectPlanet.value;

selectPlanet.addEventListener("change", () => {
  key = selectPlanet.value;
  getPlanet(key);
});

const getPlanet = (key) => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "37b0f07f3amsha1c907b87861435p10032fjsn1765b122cffd",
      "X-RapidAPI-Host": "planets-info-by-newbapi.p.rapidapi.com",
    },
  };

  fetch(
    `https://planets-info-by-newbapi.p.rapidapi.com/api/v1/planet/${key}`,
    options
  )
    .then((response) => {
      if (!response.ok) {
        throw Error(
          `
            <section class="error">
              <h2>There's a problem.</h2>
              <p>We're working to fix it as soon as possible.</p>
              <p>Please wait a few minutes and try again.</p>
              <button id="refresh-btn">Try again</button>
            </section>  
          `
        );
      }
      return response.json();
    })
    .then((data) => {
      planet.innerHTML = `
        <figure>
          <img src="${Object.values(data.imgSrc[0])[0]}">
          <figcaption>${Object.values(data.imgSrc[0])[1]}</figcaption>
        </figure>
        <div class="planet-description">
          <h1>${data.name}</h1>
          <p>${data.description}</p>
          <p>Mass: ${Object.values(data.basicDetails[0])[0]}</p>
          <p>Volume: ${Object.values(data.basicDetails[0])[0]}</p>
          <footer>
            <a class="wiki-link" href="${data.wikiLink}" target="_blank">${
        data.source
      } page</a>
          </footer>
        </div>
      `;
    })
    .catch((err) => {
      planet.innerHTML = err.message;
      const refreshBtn = document.getElementById("refresh-btn");
      refreshBtn.addEventListener("click", () => window.location.reload());
    });
};

getPlanet(key);
