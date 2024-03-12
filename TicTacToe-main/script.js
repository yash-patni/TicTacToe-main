
//---------------------------Variables Code-------------------------//
// All the variables

let GAME={
    X_CLASS:'x',
    Y_CLASS:'y',
    selectedProfile:document.querySelectorAll('.start-game .img .id'),
    chance:undefined,
    blockElements:document.querySelectorAll('[data-cell]'),
    boardElement:document.getElementById('board'),
    startBtn:document.getElementById('startBtn'),
    restartBtn:document.getElementById('restartBtn'),
    drawBtn:document.getElementById('drawBtn'),
    startWindow:document.querySelector('.start-game'),
    winner:null,
    winEl:document.querySelector('.winner-msg'),
    drawEl:document.querySelector('.draw-msg'),
    winnerImg:document.querySelector('.winner-msg .winner'),
    WIN_COMBINATIONS:[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ]
}





















// ------------------Helper Code--------------------------//
// Use to set selected user on start screen.
function Profile(){

    // alert(selectedProfile)
    console.log(GAME.selectedProfile);
    
    GAME.selectedProfile.forEach((profile)=>{
        console.log(profile);
        profile.addEventListener('click',(event)=>{
            // console.log(event.target.dataset.id)
            let target=event.target.dataset.id
            // First we get the target(the backgroung of which is to be changed and then we removed the applied background from all other elements so that the background of only one image is changed)
            removeImgSelection(GAME.selectedProfile)
            document.querySelector(`[data-id=${target}]`).classList.add('selected')


            if(target=='x2' || target=='y2'){
                GAME.X_CLASS='x2'
                GAME.Y_CLASS='y2'
            }




            // Set Chance for users
            GAME.turn=(target=='y'||target=='y2')?true:false
        })
       
    })
}




function removeImgSelection(img){
    [].forEach.call(img,function(event){
        event.classList.remove('selected')
    })
}


function setHoverEffect(){
    GAME.boardElement.classList.remove(GAME.X_CLASS)
    GAME.boardElement.classList.remove(GAME.Y_CLASS)
    if(GAME.turn){
        console.log("Male");
        GAME.boardElement.classList.add(GAME.Y_CLASS)
    }else{
        console.log("Female")
        GAME.boardElement.classList.add(GAME.X_CLASS)
    }
}


function markCell(cell,currentClass){
    cell.classList.add(currentClass)
}


function endGame(draw,winEl,drawEl){
    if(!draw){
        winEl.classList.add("show")
    }else{
        drawEl.classList.add("show")
    }
}

function isDraw(flag){
    if(flag.length){
        return
    }else{
        return [...GAME.blockElements].every((cell)=>{
            return cell.classList.contains(GAME.X_CLASS) || cell.classList.contains(GAME.Y_CLASS)
        })
    }
}



//----------------------------Win Code-----------------------------//

// check for winner.
function checkForWin(currentClass,blockElements){
    let winMAtch=[]

    GAME.WIN_COMBINATIONS.some((combination)=>{
        // console.log(combination);
        winMAtch.push(combination.every((index)=>{
            return blockElements[index].classList.contains(currentClass)
        }))
    })


    return winMAtch
}





















//---------------------------Main Code-----------------------------//


Profile()


GAME.startBtn.addEventListener('click',startGame)
GAME.restartBtn.addEventListener('click',startGame)
GAME.drawBtn.addEventListener('click',startGame)


function startGame(){
    // console.log("Game Started");
    setHoverEffect()

    GAME.blockElements.forEach((cell)=>{
        cell.classList.remove(GAME.X_CLASS)
        cell.classList.remove(GAME.Y_CLASS)
        cell.classList.remove("win")
        cell.addEventListener('click',handleClick,{once:true})
    })



    
    GAME.startWindow.classList.add('hide')
    GAME.winEl.classList.remove('show')
    GAME.drawEl.classList.remove('show')
    GAME.winnerImg.children.length?GAME.winnerImg.removeChild(GAME.winner):null
}



function handleClick(e){
    const cell=e.target
    const currentClass=GAME.turn?GAME.Y_CLASS:GAME.X_CLASS
    console.log(currentClass,cell)
    markCell(cell,currentClass)

    let flag=checkForWin(currentClass,GAME.blockElements).filter((win,index)=>{
        if(win){

            GAME.WIN_COMBINATIONS[index].map((i)=>{
                GAME.blockElements[i].classList.add('win')
            })

            GAME.winner=GAME.blockElements[GAME.WIN_COMBINATIONS[index][0]].cloneNode(true)
            return win !==false;
        }

    })

    if(flag.length){
        // console.log("Win");
        GAME.winnerImg.append(GAME.winner)
        endGame(false,GAME.winEl,GAME.drawEl)
    }else if(isDraw(flag)){
        endGame(true,GAME.winEl,GAME.drawEl)
    }

    GAME.turn=swapTurn(GAME.turn)
    setHoverEffect()
}

function swapTurn(turn){
    return turn=!turn
}































