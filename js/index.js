    // avoid score update on multiple click of same box
function randomClick(){
    this.level = ''
    this.activeGrid
    this.score = 0;
    this.error = 0;
    this.gametimer = 5;
    this.previous='';
}
randomClick.prototype = {
    updateScore(gridid){
        this.score = this.score + 1;
        this.previous = gridid;
    },
    updateError(){
        this.score = this.score - 1;
    },
    getgridByLevel(){
        let gridElemet = '';
        const gridlength = this.getGridlength();
        let gridid=0;
        for(let i=0; i< gridlength; i++){
            let innerGrid = ''
            for(let j=0; j< gridlength; j++){
                innerGrid +=`<span class="grid" id=${gridid} onclick="handleGridClick(${gridid})"></span>`;
                gridid++
            }
            gridElemet +=`<div class="innerGrid">${innerGrid} </div>`
        }
        document.getElementById("gridContainer").innerHTML = gridElemet;
    },
    getGridlength (){
        switch(this.level){
            case 'easy':
                return 3
            case 'medium':
                return 4
            case 'advance':
                return 6
            default:
                return 3
        }
    },
    gerRandomNum(){
        switch(this.level){
            case 'easy': return Math.floor(Math.random() * 9)
            case 'medium': return Math.floor(Math.random() * 16)
            case 'medium': return Math.floor(Math.random() * 36)
            default: return Math.floor(Math.random() * 9)
        }
    },
    setActiveClass(){
        this.removeActiveClass()
        const genarateRandomNumber = this.gerRandomNum();
        var element = document.getElementById(genarateRandomNumber);
        element && element.classList.add('active');
        this.activeGrid = genarateRandomNumber;
    },
    removeActiveClass(){
        let element= document.getElementsByClassName('active');
        if(element.length !==0){
            element[0].classList.remove('active');
        }
    },
    updatelatestScoreInUI(){
        let score = document.getElementById('score');
        score.innerHTML = this.score;
    },
    updateGametimer(timer){
        if(this.gametimer >0){
            this.gametimer = this.gametimer -1
        }else{
            clearInterval(timer);
            const alertUser = confirm(`Game is over! Your Score is ${this.score}`);
            if(alertUser){
                //startGame();
                location.reload();
            }
        }
    }
}

const rclick = new randomClick();
rclick.getgridByLevel();
let timer
function startGame(){
    timer = setInterval(function(){
        rclick.setActiveClass();
        rclick.updateGametimer(timer);
    }, 3000)
}
function handleGridClick(gridid){
    if(rclick.activeGrid === gridid && rclick.previous !== gridid){
        rclick.updateScore(gridid);
    }else if(rclick.activeGrid !== gridid){
        rclick.updateError()
    }
    rclick.updatelatestScoreInUI();
}
function myFunction(){
    level = document.getElementById("mySelect").value
    rclick.level = level;
    rclick.getgridByLevel();
}