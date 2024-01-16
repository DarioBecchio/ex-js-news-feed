const dataEls = [{
    id: 1,
    title: 'Scoperta di una nuova specie di papera di gomma',
    content: 'Scoperta di una nuova specie di papera di gomma.',
    tags: 'geo, tech',
    author: 'Diana Rossi',
    published: '2023-02-11',
  },
  {
    id: 2,
    title: 'Esplorando le profondità marine: il mistero degli abissi',
    content: 'Esplorando le profondità marine: il mistero degli abissi',
    tags: 'viaggi, geo',
    author: 'Fabio Mari',
    published: '2023-03-14',
  },
  {
    id: 3,
    title: 'Viaggio culinario: alla ricerca dei sapori perduti',
    content: 'Esplorazione di tradizioni culinarie dimenticate e la ricerca di sapori autentici.',
    tags: 'cucina',
    author: 'Marta Bianchi',
    published: '2023-04-20',
  },
  {
    id: 4,
    title: 'Arte moderna: oltre i confini convenzionali',
    content: "Un'analisi delle tendenze e delle sfide nell'arte contemporanea, con interviste a artisti emergenti.",
    tags: 'arte, tech',
    author: 'Gabriele Neri',
    published: '2023-05-29',
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
    <div id = "${cardData.id}" class="card position-relative">
            <h2>${cardData.title}</h2>
            <h4>pubblicato da ${cardData.author}</h4>
            <span> in data ${cardData.published}</span>
            <p>${cardData.content}</p>
            `;
            cardData.tags.forEach((el => {
                HTMLCard += 
                `<div class="d-flex">
                    <span class="badge bg-secondary">${el}</span>   
                </div>`
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

let domEl = document.querySelector('container');
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
}


