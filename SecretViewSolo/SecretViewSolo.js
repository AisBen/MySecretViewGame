document.addEventListener('DOMContentLoaded',()=>{

    //MENU
    const open_btn=document.querySelector('.open-btn')
    const close_btn=document.querySelector('.close-btn')
    const menu=document.querySelectorAll('.menu')

    open_btn.addEventListener('click', () =>{
        menu.forEach(l=>l.classList.add('visible'))   
    })
    close_btn.addEventListener('click', () =>{
        menu.forEach(l=>l.classList.remove('visible'))   
    })

    const save=document.querySelector('.save')
    const restart=document.querySelector('.restart')

    function aisRestart(){
        location.reload()
    }
    restart.addEventListener('click', ()=>  {
        menu.forEach(l=>l.classList.remove('visible'))
        setTimeout(aisRestart,1000)
    })
    save.addEventListener('click',()=> {
        var new_data=document.querySelectorAll('.grid').values;
    })

    //GAME
    const grid = document.querySelector('.grid')

    const cardArrayFull=[
        {
            name: 'albertheijn',
            img: 'images/albertheijn.png'
        },
        {
            name: 'albertheijn',
            img: 'images/albertheijn.png'
        },
        {
            name: 'americatoday',
            img: 'images/americatoday.png'
        },
        {
            name: 'americatoday',
            img: 'images/americatoday.png'
        },
        {
            name: 'angular',
            img: 'images/angular.png'
        },
        {
            name: 'angular',
            img: 'images/angular.png'
        },
        {
            name: 'arnhem',
            img: 'images/arnhem.png'
        },
        {
            name: 'arnhem',
            img: 'images/arnhem.png'
        },
        {
            name: 'dyson',
            img: 'images/dyson.png'
        },
        {
            name: 'dyson',
            img: 'images/dyson.png'
        },
        {
            name: 'england',
            img: 'images/england.png'
        },
        {
            name: 'england',
            img: 'images/england.png'
        },
        {
            name: 'france',
            img: 'images/france.png'
        },
        {
            name: 'france',
            img: 'images/france.png'
        },
        {
            name: 'gallgall',
            img: 'images/gallgall.png'
        },
        {
            name: 'gallgall',
            img: 'images/gallgall.png'
        },
        {
            name: 'holland',
            img: 'images/holland.png'
        },
        {
            name: 'holland',
            img: 'images/holland.png'
        },
        {
            name: 'html',
            img: 'images/html.png'
        },
        {
            name: 'html',
            img: 'images/html.png'
        },
        {
            name: 'ns',
            img: 'images/ns.png'
        },
        {
            name: 'ns',
            img: 'images/ns.png'
        },
        {
            name: 'pathe',
            img: 'images/pathe.png'
        },
        {
            name: 'pathe',
            img: 'images/pathe.png'
        },
        {
            name: 'react',
            img: 'images/react.png'
        },
        {
            name: 'react',
            img: 'images/react.png'
        },
        {
            name: 'rituals',
            img: 'images/rituals.png'
        },
        {
            name: 'rituals',
            img: 'images/rituals.png'
        },
        {
            name: 'secretview',
            img: 'images/secretview.png'
        },
        {
            name: 'secretview',
            img: 'images/secretview.png'
        },
        {
            name: 'spar',
            img: 'images/spar.png'
        },
        {
            name: 'spar',
            img: 'images/spar.png'
        },
        {
            name: 'vue',
            img: 'images/vue.png'
        },
        {
            name: 'vue',
            img: 'images/vue.png'
        },
        {
            name: 'wereldhave',
            img: 'images/wereldhave.png'
        },
        {
            name: 'wereldhave',
            img: 'images/wereldhave.png'
        },
    ]
    const cardArray =[]
    function generateTwoFourSix(min, max) {
        var num = Math.floor(Math.random() * (max - min + 1)) + min;
        return (num%2 != 0) ? generateTwoFourSix(min, max) : num;    
    }
    const size = Math.pow(generateTwoFourSix(2, 6),2)
    if(size===4)           grid.classList.add('twobytwo')
    if(size===16)          grid.classList.add('fourbyfour')
    if(size===36)          grid.classList.add('full')

    for(i=0;i<size;i++){
        cardArray[i]=cardArrayFull[i]
    }
    cardArray.sort(()=> 0.5 - Math.random())
    const resultDisplay=document.querySelector('#result')
    const movesDisplay=document.querySelector('#moves')
    var cardsChosen = []
    var cardsChosenId =[]
    var cardsWon = []
    var moves=0;


    function createBoard(){
        for(let i=0; i<cardArray.length;i++){
            var card=document.createElement('img')
            card.setAttribute('src','images/facedown.png')
            card.setAttribute('data-id',i)
            card.addEventListener('click', flipcard)
            grid.appendChild(card)
        }
    }

    function flipcard(){
        var cardId = this.getAttribute('data-id');
        cardsChosen.push(cardArray[cardId].name)
        cardsChosenId.push(cardId)
        this.setAttribute('src', cardArray[cardId].img)
        if (cardsChosen.length ===2){
            setTimeout(checkForMatch, 500) 
        }
    }

    function checkForMatch(){
        var cards = document.querySelectorAll ('img')
        const optionOneId = cardsChosenId[0]
        const optionTwoId = cardsChosenId[1]
        if(cardsChosen[0]===cardsChosen[1] && optionOneId !== optionTwoId ){//if same name but not same one
            //alert('You found a match')
            //cards[optionOneId].setAttribute('src', 'images/white.png')
            //cards[optionTwoId].setAttribute('src', 'images/white.png')
            cards[optionOneId].removeEventListener('click',flipcard)
            cards[optionTwoId].removeEventListener('click',flipcard)
            cardsWon.push(cardsChosen)
            moves++
            movesDisplay.textContent = moves
        }if(optionOneId === optionTwoId ){// if same one
            cards[optionOneId].setAttribute('src','images/facedown.png')
        }
        else if(cardsChosen[0]!==cardsChosen[1]){//if not the same
            cards[optionOneId].setAttribute('src','images/facedown.png')
            cards[optionTwoId].setAttribute('src','images/facedown.png')
            moves++
            movesDisplay.textContent = moves
        }

        cardsChosen= []
        cardsChosenId=[]
        resultDisplay.textContent = cardsWon.length

        if(cardsWon.length==cardArray.length/2){
            //resultDisplay.textContent = 'Well played !'
            const tryagain = document.querySelector('.tryagain')
            tryagain.classList.add('visible')
        }
    }



    createBoard()


})
