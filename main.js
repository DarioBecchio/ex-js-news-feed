const dataEls = [{
    id: 1,
    title: 'Scoperta di una nuova specie di papera di gomma',
    content: 'Scoperta di una nuova specie di papera di gomma.',
    tags: 'geo, tech',
    author: 'Diana Rossi',
    published: '2023-02-11',
    image:'rubber-duck.jpg'
  },
  {
    id: 2,
    title: 'Esplorando le profondità marine: il mistero degli abissi',
    content: 'Esplorando le profondità marine: il mistero degli abissi',
    tags: 'viaggi, geo',
    author: 'Fabio Mari',
    published: '2023-03-14',
    image:'deep-sea.jpg'
  },
  {
    id: 3,
    title: 'Viaggio culinario: alla ricerca dei sapori perduti',
    content: 'Esplorazione di tradizioni culinarie dimenticate e la ricerca di sapori autentici.',
    tags: 'cucina',
    author: 'Marta Bianchi',
    published: '2023-04-20',
    image: 'modern-art.jpg'
  },
  {
    id: 4,
    title: 'Arte moderna: oltre i confini convenzionali',
    content: "Un'analisi delle tendenze e delle sfide nell'arte contemporanea, con interviste a artisti emergenti.",
    tags: 'arte, tech',
    author: 'Gabriele Neri',
    published: '2023-05-29',
    image: 'modern-art.jpg'
  }
  ];


//----------Utilities

// Funzione che cambia il formato della data da anglosassone a europeo

function reformatDate(inputDateString) {
    const inputDateStringArray = inputDateString.split('-');
    return `${inputDateStringArray[2]} / ${inputDateStringArray[1]} / ${inputDateStringArray[0]}`;
  }

// Funzione che crea le card HTML a partire dall'array di oggetti (dataEls) 

const createHTMLCard = cardData => {

    let HTMLCard = `
    <div id = "${cardData.id}" class="card position-relative mb-1">
            <h2>${cardData.title}</h2>
            <h4>pubblicato da ${cardData.author}</h4>
            <span> in data ${cardData.published}</span>
            <p>${cardData.content}</p>
            <img src="${cardData.image}" alt="">
            `;
            cardData.tags.forEach((el => {
                HTMLCard += `<span class="badge bg-secondary">${el}</span> `
                
            }));
            if (favouriteCards.includes(cardData.id)) {
            HTMLCard +=  `  <div class="bookmark">
                                <i class="fa-regular fa-bookmark bookmark bg-dark"></i>
                            </div>
                            </div>`
            } else {
            HTMLCard +=  `  <div class="bookmark">
                                <i class="fa-regular fa-bookmark bookmark"></i>
                            </div>
                            </div>`
            }
 return HTMLCard;          
};


//---Node queries

let domEl = document.querySelector('.row');
const select = document.getElementById('selected');

//---Global variables

let favouriteCards = [];

// Funzione che stampa le card sulla pagina

function printCards(cardsData){
    if(cardsData.length > 0) {
        cardsData.forEach(cardData => {
          const HTMLCard = createHTMLCard(cardData);
          domEl.insertAdjacentHTML('beforeend', HTMLCard);
        });
      } else {
        domEl.insertAdjacentHTML('beforeend', '<h2>Nessuna card trovata</h2>');
      }

//Funzione che aggiunge gli eventlistener ai bookmark

const bookmarks = document.querySelectorAll('.bookmark');
  bookmarks.forEach(bookmark => {
    bookmark.addEventListener('click', function() {
      const cardId = parseInt(this.closest('.card').getAttribute('id'));

      if(favouriteCards.includes(cardId)) {
        // delesezione della card preferita
        favouriteCards = favouriteCards.filter(id => id !== cardId);
      } else {
        // selezione della card come preferita
        favouriteCards.push(cardId);
      }
      bookmark.classList.toggle('bg-dark');
      console.log('favouriteCards', favouriteCards);
    });
  });

    }

//-----Mapping dataEls
const mapData = (inputData) => {
    const outputData = inputData.map(el => {
      const newEl = JSON.parse(JSON.stringify(el)); // duplica "el" creando un nuovo riferimento, manipolando "data" non si andrà a modificare el originale
      newEl.published = reformatDate(el.published);
      newEl.tags = el.tags.split(', ');
      return newEl;
    });
  
    return outputData;
}

//--- FILTRI

// Prendono in input dataEls, filtrano attraverso la select e la checkbox, restituiscono l'array di dati (un nuovo dataEls filtrato)
const filterDataBySelect = inputData => {
    const selectedValue = select.value;
    let filteredDataBySelect = JSON.parse(JSON.stringify(inputData)); // duplica inputData (cioè dataEls) creando un nuovo riferimento, manipolando "filteredDataBySelect" non si andrà a modificare il dataEls originale
    if (selectedValue !== 'all') {
      filteredDataBySelect = inputData.filter(el => el.tags.includes(selectedValue));
    }
    return filteredDataBySelect;
  };
  const filterDataByCheckbox = inputData => {
    const isFavouriteChecked = document.getElementById('flexCheckDefault').checked;
    let filteredDataByCheckbox = JSON.parse(JSON.stringify(inputData)); // duplica inputData (cioè dataEls) creando un nuovo riferimento, manipolando "filteredDataByCheckbox" non si andrà a modificare il dataEls originale
  
    if(isFavouriteChecked) {
      filteredDataByCheckbox = inputData.filter(el => favouriteCards.includes(el.id));
    }
    return filteredDataByCheckbox;
  };
// ----------------------------
// Funzione che mappa/elabora dataEls per migliorare il formato di alcuni dati (data e tags), filtra per tag, filtra secondo preferiti, pulisce l'html, stampa i dati pronti
function updateCardsDisplay() {
    const mappedData = mapData(dataEls);
    const dataToPrint = filterDataBySelect(mappedData);
    const finalData = filterDataByCheckbox(dataToPrint);
    domEl.innerHTML = '';
    printCards(finalData);
  }
  
  
  // --- EVENT LISTENERS
  
  
  document.addEventListener('DOMContentLoaded', () => {
    updateCardsDisplay();
    select.addEventListener('change', updateCardsDisplay);
    document.getElementById("showfavourite").addEventListener('change', updateCardsDisplay);
  

  });








