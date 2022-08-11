document.addEventListener('DOMContentLoaded',()=>{

    //LEFT SIDE MENU
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
    //generating random grid : 2x2 4x4 or 6x6
    function generateTwoFourSix(min, max) {// generates  2 or 4 or 6
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
    //START GAME
    const result1Display=document.querySelector('#result1')
    const result2Display=document.querySelector('#result2')
    const move1Display=document.querySelector('#move1')
    const move2Display=document.querySelector('#move2')
    const playerturn1=document.querySelector('.playerturn1')
    const playerturn2=document.querySelector('.playerturn2')
    const winner=document.querySelector('.winner')
    var cardsChosen = []
    var cardsChosenId =[]
    var cardsWon = []
    var move1=0;
    var move2=0;
    var score1=0;
    var score2=0;
    var currentPlayer =1;
    function switchPlayer(n){ // turns current player tag color to red
        if(n<0){
            playerturn1.classList.remove('idle')
            playerturn2.classList.remove('act')
        }
        else{
            playerturn1.classList.add('idle')
            playerturn2.classList.add('act')
        }
    }
    function createBoard(){
        for(let i=0; i<cardArray.length;i++){
            var card=document.createElement('img')
            card.setAttribute('src','images/facedown.png')
            card.setAttribute('data-id',i)
            card.addEventListener('click', flipcard)
            grid.appendChild(card)
        }
    }
    function generateRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min)  ;
    }
    function selectRandomCard(){
        return generateRandom(0,cardArray.length)
    }

    function flipcard(){
        var cardId = this.getAttribute('data-id');
        var randomId
        if(currentPlayer>0){
            cardsChosen.push(cardArray[cardId].name)
            cardsChosenId.push(cardId)
            this.setAttribute('src', cardArray[cardId].img)
            if (cardsChosen.length ===2){
                setTimeout(checkForMatch, 500) 
            }
        }
        if(currentPlayer<0){
            for(i=0;i<2;i++){
                randomId = selectRandomCard()
                cardsChosen.push(cardArray[randomId].name)
                cardsChosenId.push(randomId)
                grid.children[randomId].setAttribute('src', cardArray[randomId].img)
                if (cardsChosen.length ===2){
                    setTimeout(checkForMatch, 1000) 
                }
            }
        }
    }
    function alreadyWon(id,won,chosen){
        for(i=0;i<won.length;i++) {
            if (chosen[id] === won[i][0] ||chosen[id] === won[i][1]) return 1;
        }
        return 0;
    }
    function checkForMatch(){
        var cards = document.querySelectorAll ('img')
        const optionOneId = cardsChosenId[0]
        const optionTwoId = cardsChosenId[1]
        if(cardsChosen[0]===cardsChosen[1] && optionOneId !== optionTwoId ){//if same name but not same one MATCH

            cards[optionOneId].removeEventListener('click',flipcard)
            cards[optionTwoId].removeEventListener('click',flipcard)
            cardsWon.push(cardsChosen)
            if(currentPlayer>0) {
                move1++;
                move1Display.textContent = move1;
                score1++;
                result1Display.textContent = score1;
            }
            if(currentPlayer<0) { 
                move2++;
                move2Display.textContent = move2;
                score2++;
                result2Display.textContent = score2;
            }

        }if(optionOneId === optionTwoId ){// if same one
            cards[optionOneId].setAttribute('src','images/facedown.png')            
        }
        else if(cardsChosen[0]!==cardsChosen[1]){//if not the same
            //not already won?
            if(alreadyWon(0,cardsWon,cardsChosen)==1){
                cards[optionTwoId].setAttribute('src','images/facedown.png')
            }

            else if(alreadyWon(1,cardsWon,cardsChosen)==1){
                cards[optionOneId].setAttribute('src','images/facedown.png')
            }
            else if(alreadyWon(1,cardsWon,cardsChosen)==0 && alreadyWon(0,cardsWon,cardsChosen)==0){
                cards[optionOneId].setAttribute('src','images/facedown.png')
                cards[optionTwoId].setAttribute('src','images/facedown.png')
                if(currentPlayer>0) { move1++;move1Display.textContent = move1}
                if(currentPlayer<0) { move2++;move2Display.textContent = move2}
                switchPlayer(currentPlayer)
                currentPlayer =-currentPlayer
            }
        }
        cardsChosen= []
        cardsChosenId=[]
        if(cardsWon.length==cardArray.length/2){
            const tryagain = document.querySelector('.tryagain')
            tryagain.classList.add('visible')
            if(score1>score2)winner.classList.add('p1')
            if(score2>score1)winner.classList.add('p2')
            if(score1===score2)winner.classList.add('draw')
        }
    }



    createBoard()


})
