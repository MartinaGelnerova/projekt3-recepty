let element = null;
let receptyFiltr = [];
let seznam = [];

//1) Do prvku s id="recepty" vygeneruj z dat seznam všech receptů z naší "databáze".
seznamReceptu();

//2) Doplň hledání - v hlavičce odkomentuj pole pro hledání. Pri kliknutí na tlačítko Hledat
//by se měl seznam receptů vyfiltrovat podle hledaného slova.


//3) Doplň filtrovanání receptů podle kategorie.
let kategorie = document.getElementById('kategorie');
kategorie.addEventListener('change', katFiltrace);


//4) Doplň řazení receptů podle hodnocení.
//let seznamFiltrRazeni = seznam.sort(razeniHodnoceni)
//console.log(seznamFiltrRazeni);
let razeni = document.getElementById('razeni');
razeni.addEventListener('change', razeniHodnoceni);


/*


5) Na recepty v seznamu by mělo jít kliknout a na pravé polovině, se objeví detail receptu.
Doplň patričné údaje receptu do HTML prvků s ID recept-foto, recept-kategorie,
recept-hodnoceni, recept-nazev, recept-popis.

6) Poslední vybraný recept ulož do Local Storage, aby se při novém otevření aplikace načetl.
*/

// FUNKCE
function seznamReceptu() {
  seznam = [];
  if (receptyFiltr.length == 0) {
    for (i = 0; i < recepty.length; i++) {
      seznam.push(recepty[i])
    }
  } else {
    for (i = 0; i < receptyFiltr.length; i++) {
      seznam.push(recepty[receptyFiltr[i]])
    }
  }
  hodnoceniOrderValue();
  razeniValue = hodnoceniOrderValue();
  if (razeniValue == 1) {
    seznam.sort(function orderAsc (a, b) {
      return b.hodnoceni - a.hodnoceni;
    } )
  }  else if (razeniValue == 2) {
    seznam.sort(function orderDesc (a, b) {
      return a.hodnoceni - b.hodnoceni;
    })
  }
  document.querySelector('.kontejner').removeChild(document.getElementById('recepty'));
  let receptyDiv = document.createElement('div');
  receptyDiv.id = 'recepty';
  receptyDiv.className = 'recepty';
  document.querySelector('.kontejner').appendChild(receptyDiv);
  for (i = 0; i < seznam.length; i++) {
    element = seznam[i];
    let recept = document.createElement('div');
    recept.className = 'recept';
    recept.setAttribute("recept-cislo", i);
    document.getElementById('recepty').appendChild(recept);
    let receptObrazek = document.createElement('div');
    receptObrazek.className = 'recept-obrazek';
    receptObrazek.setAttribute("obrazek-cislo", i);
    document.querySelector(`[recept-cislo="${i}"]`).appendChild(receptObrazek);
    let receptImg = document.createElement('img');
    receptImg.alt = "Obrazek";
    receptImg.src = element.img;
    document.querySelector(`[obrazek-cislo="${i}"]`).appendChild(receptImg);
    let receptInfo = document.createElement('div');
    receptInfo.className = 'recept-info';
    receptInfo.setAttribute("recept-info", i);
    document.querySelector(`[recept-cislo="${i}"]`).appendChild(receptInfo);
    let receptTitle = document.createElement('h3');
    receptTitle.innerText = element.nadpis;
    document.querySelector(`[recept-info="${i}"]`).appendChild(receptTitle)
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
  receptyFiltr = [];
  for (n = 0; n <= recepty.length - 1; n++) {
    if (katValue == '') {
      receptyFiltr.push(n);
    } else if (recepty[n].kategorie === katValue) {
      receptyFiltr.push(n);
    }
  }
  console.log(receptyFiltr);
  seznamFiltrovany()
}

function seznamFiltrovany() {
  seznam = [];
  for (let i = 0; i < receptyFiltr.length; i = i + 1) {
    seznam.push(recepty[receptyFiltr[i]]);
  }
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
    seznam.sort(function orderAsc (a, b) {
      return b.hodnoceni - a.hodnoceni;
    } )
  }  else if (razeniValue == 2) {
    seznam.sort(function orderDesc (a, b) {
      return a.hodnoceni - b.hodnoceni;
    })
  }
  seznamReceptu()
}