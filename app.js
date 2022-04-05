// API code
const containerMain = document.querySelector('.container');
document.getElementById('all-tags').addEventListener('click', showAllCatTags);
document.getElementById('cute-tags').addEventListener('click', showAllCuteCats);
document.getElementById('random-pic').addEventListener('click', showRandomPic);
document.getElementById('random-gif').addEventListener('click', showCatGif);
document.getElementById('random-pic-filter').addEventListener('click', showPicFiltered);
document.getElementById('random-pic-txt').addEventListener('click', showPicText);
document.getElementById('cat-customized').addEventListener('click', showCatCustomized);
document.getElementById('cat-customized-size').addEventListener('click', showCustSizeImg);
document.getElementById('reset').addEventListener('click', resetAll);
const pictureDiv = document.getElementById('picture');
const ul = document.querySelector('ul');
const textInput = document.querySelector('input');
const textInputCustom = document.getElementById('custom-input');
const textSizeCustom = document.getElementById('text-size');
const textColorCustom = document.getElementById('color');
const imageSize = document.getElementById('image-size');

//FUNCTIONS:

//RESET ALL----------------------------------------------------------------------------
function resetAll() {
  pictureDiv.innerHTML = '';
  ul.innerHTML = '';
  textInput.value = '';
  textInputCustom.value = '';
  textSizeCustom.value = '20';
  textColorCustom.value = 'white';
  imageSize.value = '20';
};

//ALL CAT TAGS-------------------------------------------------------------------
function showAllCatTags(e) {

  const xhr = new XMLHttpRequest()

  xhr.open('GET', 'https://cataas.com/api/tags', true);

  xhr.onload = function () {
    if (this.status === 200) {
      const resParsed = JSON.parse(this.responseText);
      let output = '';
      resParsed.forEach(function (tag) {
        output += `<li>${tag}</li>`
      });
      ul.innerHTML = output;
    };
  };

  xhr.onerror = function () {
    ul.innerHTML = `
    <li><h3 style ="color: red;">Opssss SOMETHING GONE WRONG........</h3></li>`;
  };

  xhr.send();
};



//ALL CUTE CATS----------------------------------------------------------------
function showAllCuteCats(e) {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://cataas.com/api/cats?tags=cute', true);

  xhr.onload = function () {
    if (this.status === 200) {
      const resParsed = JSON.parse(this.responseText);
      let output = '';
      resParsed.forEach(function (cat) {
        output += `
        <li>Id: ${cat.id}, created at:${cat.created_at}, tags:${cat.tags}</li>`;
      })
      ul.innerHTML = output;
    };
  };

  xhr.onerror = function () {
    ul.innerHTML = `
    <li><h3 style ="color: red;">Opssss SOMETHING GONE WRONG........</h3></li>`;
  };


  xhr.send();
  e.preventDefault();
};

//RANDOM PICTURE----------------------------------------------------------------
function showRandomPic(e) {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://cataas.com/cat', true);

  xhr.onload = function () {
    if (this.status === 200) {
      pictureDiv.innerHTML = `
      <img src="${xhr.responseURL}" alt="Sorry Something went wrong">`;
    }
  };

  xhr.onerror = () => {
    pictureDiv.innerHTML = `
    <h3 style = "color: red">Error no picture found</h3>`;
  }

  xhr.send();
};

//RANDOM CAT GIF----------------------------------------------------------------------
function showCatGif(e) {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://cataas.com/cat/gif', true);

  xhr.onload = function () {
    if (this.status != 200) {
      pictureDiv.innerHTML = `<h3 style="color: red">Error no gif found</h3>`;
    }
    else {
      pictureDiv.innerHTML = `<img src="${this.responseURL}" alt="Sorry something went wrong">`;
    }
  };

  xhr.onerror = () => {
    pictureDiv.innerHTML = `
  <h3 style = "color: red">Error no picture found</h3>`;
  }

  xhr.send()
};

//RANDOM PIC FILTERED-----------------------------------------------------------
function showPicFiltered(e) {
  e.preventDefault()
  const xhr = new XMLHttpRequest()

  xhr.open('GET', 'https://cataas.com/cat?filter=sepia', true);

  xhr.onload = function () {
    if (this.status === 200) {
      pictureDiv.innerHTML = `
      <img src="${this.responseURL}" alt = "Sorry Something went wrong">`;
    }
  };

  xhr.onerror = function () {
    pictureDiv.innerHTML = `<h3 style="color: red">Error no picture found </h3>`
  };

  xhr.send();
};

//SHOW CAT PICTURE WITH CUSTOM TEXT-----------------------------------------------------

function showPicText(e) {

  const xhr = new XMLHttpRequest();

  xhr.open('GET', `https://cataas.com/cat/says/${textInput.value}`, true);
  console.log(xhr)

  xhr.onload = function () {
    if (this.status === 200) {
      pictureDiv.innerHTML = `
      <img src="${this.responseURL}" alt = "Sorry Something went wrong">`
    } else {
      pictureDiv.innerHTML = `<h2 style="color: red">Error 404 no picture found......</h2> <h3>Please type text in field above</h3>`
    }

  };
  xhr.onerror = function () {
    pictureDiv.innerHTML = `<h2 style="color: red">Error no picture found......</h2> <h3>Try Again Please</h3>`
  };

  xhr.send();
};
//SHOWING CAT PIC WITH CUSTOMIZED TEXT BY SIZE  AND COLOR----Cat Customized------------
function showCatCustomized(e) {
  // this is done without XMLHttpRequest() and it works for images no clue why
  pictureDiv.innerHTML = `
  <img src = "https://cataas.com/cat/says/${textInputCustom.value}?size=${textSizeCustom.value}&color=${textColorCustom.value}" alt = "Error please  ENTER TEXT IN THE FIELD">`;
};



//CUSTOM WIDTH IMAGE ---------------------------------------------------------------

function showCustSizeImg(e) {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', `https://cataas.com/cat?width=${imageSize.value}`, true);

  xhr.onload = function () {
    if (this.status != 200) {
      pictureDiv.innerHTML = `<h3 style="color: red">Error no image found</h3>`;
    }
    else {
      pictureDiv.innerHTML = `<img src="${this.responseURL}" alt="Sorry Something went wrong">`;
      console.log(this)
    }
  };

  xhr.onerror = () => {
    pictureDiv.innerHTML = `<h2 style="color: red">Error no picture found......</h2> <h3>Try Again Please</h3>`
  };


  xhr.send()

};


