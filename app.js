//1) Do prvku s id="recepty" vygeneruj z dat seznam všech receptů z naší "databáze".
//HTML vzor, jak vygenerovaný recept vypadá, je zakomentovaný v index.html.
let element = null;

seznamReceptu(recepty, element);

function seznamReceptu(recepty, element) {
  for (i = 0; i <= recepty.length - 1; i++) {
    element = recepty[i];
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
    document.querySelector(`[recept-info="${i}"]`).appendChild(receptTitle);
  }
}

/*
Co je za úkol v tomto projektu:


2) Doplň hledání - v hlavičce odkomentuj pole pro hledání. Pri kliknutí na tlačítko Hledat
by se měl seznam receptů vyfiltrovat podle hledaného slova.

3) Doplň filtrovanání receptů podle kategorie.

4) Doplň řazení receptů podle hodnocení.

5) Na recepty v seznamu by mělo jít kliknout a na pravé polovině, se objeví detail receptu.
Doplň patričné údaje receptu do HTML prvků s ID recept-foto, recept-kategorie,
recept-hodnoceni, recept-nazev, recept-popis.

6) Poslední vybraný recept ulož do Local Storage, aby se při novém otevření aplikace načetl.
*/
