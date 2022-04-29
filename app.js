let element = null;
let receptyFiltrKat = [];
let receptyFiltrText = [];
let receptyFiltrHlavni = [];
let seznam = [];
let arrayA, arrayB;

//1) Do prvku s id="recepty" vygeneruj z dat seznam všech receptů z naší "databáze".
seznamReceptu();

//2) Doplň hledání - v hlavičce odkomentuj pole pro hledání. Pri kliknutí na tlačítko Hledat
//by se měl seznam receptů vyfiltrovat podle hledaného slova.
let vyhledavaniTlacitko = document.querySelector('button');
retezec = '';
vyhledavaniTlacitko.addEventListener('click', (event) => {
  let vyhledavani = document.getElementById('hledat');
  retezec = vyhledavani.value;
  console.log(retezec);
  vyhledavac(retezec)
})


//3) Doplň filtrovanání receptů podle kategorie.
let kategorie = document.getElementById('kategorie');
kategorie.addEventListener('change', katFiltrace);


//4) Doplň řazení receptů podle hodnocení.
//let seznamFiltrRazeni = seznam.sort(razeniHodnoceni)
//console.log(seznamFiltrRazeni);
let razeni = document.getElementById('razeni');
razeni.addEventListener('change', razeniHodnoceni);



//5) Na recepty v seznamu by mělo jít kliknout a na pravé polovině, se objeví detail receptu.
//Doplň patričné údaje receptu do HTML prvků s ID recept-foto, recept-kategorie,
//recept-hodnoceni, recept-nazev, recept-popis.
let variantyTitle = document.querySelectorAll('h3');
variantyTitle.forEach((varianta) => {
  varianta.addEventListener('click', (udalost) => {
    let zvolenyRecept = udalost.target.dataset.title;
    console.log(zvolenyRecept);
    zvolenyReceptDetail = seznam[zvolenyRecept];

    detailReceptu(zvolenyReceptDetail)
  })
})

function detailReceptu(zvolenyReceptDetail) {
  let receptImg = document.createElement('img');
  receptImg.id = "recept-foto";
  receptImg.alt = "Obrazek";
  receptImg.src = zvolenyReceptDetail.img;
  if (document.getElementById('recept-foto') != null) {
    document.getElementById('recept-foto').remove();
  }
  document.querySelector(`.recept-detail-obrazek`).appendChild(receptImg);
  document.getElementById('recept-kategorie').innerText = zvolenyReceptDetail.kategorie;
  document.getElementById('recept-hodnoceni').innerText = zvolenyReceptDetail.hodnoceni;
  document.getElementById('recept-nazev').innerText = zvolenyReceptDetail.nadpis;
  document.getElementById('recept-popis').innerText = zvolenyReceptDetail.popis;
}

/*


6) Poslední vybraný recept ulož do Local Storage, aby se při novém otevření aplikace načetl.
*/

// FUNKCE
function seznamReceptu() {
  hodnoceniOrderValue();
  razeniValue = hodnoceniOrderValue();
  if (razeniValue == 1) {
    seznam.sort(function orderAsc(a, b) {
      return b.hodnoceni - a.hodnoceni;
    })
  } else if (razeniValue == 2) {
    seznam.sort(function orderDesc(a, b) {
      return a.hodnoceni - b.hodnoceni;
    })
  }
  document.querySelector('.kontejner').removeChild(document.getElementById('recepty'));
  let receptyDiv = document.createElement('div');
  receptyDiv.id = 'recepty';
  receptyDiv.className = 'recepty';
  document.querySelector('.kontejner').appendChild(receptyDiv);
  if (seznam.length === 0) {
    seznam = recepty
  }
  for (i = 0; i < seznam.length; i++) {
    element = seznam[i];
    let recept = document.createElement('div');
    recept.className = 'recept';
    recept.setAttribute("data-recept", i);
    document.getElementById('recepty').appendChild(recept);
    let receptObrazek = document.createElement('div');
    receptObrazek.className = 'recept-obrazek';
    receptObrazek.setAttribute("data-obrazek", i);
    document.querySelector(`[data-recept="${i}"]`).appendChild(receptObrazek);
    let receptImg = document.createElement('img');
    receptImg.alt = "Obrazek";
    receptImg.src = element.img;
    receptImg.setAttribute("data-img", i);
    document.querySelector(`[data-obrazek="${i}"]`).appendChild(receptImg);
    let receptInfo = document.createElement('div');
    receptInfo.className = 'recept-info';
    receptInfo.setAttribute("data-info", i);
    document.querySelector(`[data-recept="${i}"]`).appendChild(receptInfo);
    let receptTitle = document.createElement('h3');
    receptTitle.setAttribute("data-title", i);
    receptTitle.innerText = element.nadpis;
    document.querySelector(`[data-info="${i}"]`).appendChild(receptTitle)
  }
}


function kategorieValue() {
  kategorie = document.getElementById('kategorie');
  let katValue = kategorie.value;
  return (katValue);
}

function katFiltrace() {
  katValue = kategorieValue();
  console.log(katValue);
  receptyFiltrKat = [];
  for (n = 0; n <= recepty.length - 1; n++) {
    if (katValue == '') {
      receptyFiltrKat.push(n);
    } else if (recepty[n].kategorie === katValue) {
      receptyFiltrKat.push(n);
    }
  }
  console.log(receptyFiltrKat);
  seznamFiltrovany(filtrHlavni())
}

function filtrHlavni() {
  if (receptyFiltrKat.length === 0) {
    for (i = 0; i < recepty.length; i++) {
      receptyFiltrKat.push(i)
    }
  }
  if (receptyFiltrText.length === 0) {
    for (i = 0; i < recepty.length; i++) {
      receptyFiltrText.push(i)
    }
  }
  if (receptyFiltrKat.length >= receptyFiltrText.length) {
    arrayA = receptyFiltrKat;
    arrayB = receptyFiltrText;
  } else {
    arrayB = receptyFiltrKat;
    arrayA = receptyFiltrText;
  }

  receptyFiltrHlavni = performIntersection(arrayA, arrayB);

  for (let i = 0; i < receptyFiltrHlavni.length; i = i + 1) {
    seznam.push(recepty[receptyFiltrHlavni[i]]);
  }
  return (seznam)
}

function performIntersection(arr1, arr2) {
  const setA = new Set(arr1);
  const setB = new Set(arr2);
  let intersectionResult = [];
  for (let i of setB) {
    if (setA.has(i)) {
      intersectionResult.push(i);
    }
  }
  return intersectionResult;
}

function seznamFiltrovany() {
  seznam = [];
  filtrHlavni();
  console.log(seznam);
  seznamReceptu()
}

function hodnoceniOrderValue() {
  let razeni = document.getElementById('razeni');
  let orderValue = razeni.value;
  return (orderValue);
}

function razeniHodnoceni() {
  razeniValue = hodnoceniOrderValue();
  console.log(razeniValue);
  if (razeniValue == 1) {
    seznam.sort(function orderAsc(a, b) {
      return b.hodnoceni - a.hodnoceni;
    })
  } else if (razeniValue == 2) {
    seznam.sort(function orderDesc(a, b) {
      return a.hodnoceni - b.hodnoceni;
    })
  }
  seznamReceptu()
}


function vyhledavac(retezec) {
  receptyFiltrText = [];
  for (i = 0; i < recepty.length; i++) {
    element = recepty[i];
    if (retezec === '') {
      receptyFiltrText.push(i)
    } else {
      nadpisLower = element.nadpis.toLowerCase();
      retezecLower = retezec.toLowerCase();
      if (nadpisLower.includes(retezecLower) === false) {
        console.log(`${nadpisLower} nevyhovuje`)
      } else {
        nadpisLower = element.nadpis.toLowerCase();
        retezecLower = retezec.toLowerCase();
        console.log(`${nadpisLower} VYHOVUJE`);
        receptyFiltrText.push(i)
      }
    }
  }
  console.log(receptyFiltrText)
  seznamFiltrovany(filtrHlavni())
}