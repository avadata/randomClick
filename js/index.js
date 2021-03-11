    // avoid score update on multiple click of same box
const GRID_ACTIVE_TIME = 2000;
const GAME_LEVEL_EASY = 'easy';
const GAME_LEVEL_MEDIUM = 'medium';
const GAME_LEVEL_ADVANCE = 'advance';
function randomClick(){
    this.level = ''
    this.activeGrid
    this.score = 0;
    this.error = 0;
    this.gametimer = 120;
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
        setDomNodeByID("gridContainer", gridElemet);
    },
    getGridlength (){
        switch(this.level){
            case GAME_LEVEL_EASY:
                return 3
            case GAME_LEVEL_MEDIUM:
                return 4
            case GAME_LEVEL_ADVANCE:
                return 6
            default:
                return 3
        }
    },
    gerRandomNum(){
        switch(this.level){
            case GAME_LEVEL_EASY: return Math.floor(Math.random() * 9)
            case GAME_LEVEL_MEDIUM: return Math.floor(Math.random() * 16)
            case GAME_LEVEL_ADVANCE: return Math.floor(Math.random() * 36)
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
        const score = 'Score:'+this.score;
        setDomNodeByID('score', score );
    },
    updateHighestScore(score){
        const hScore = 'Highest Score:'+score;
        setDomNodeByID('high-score', hScore );
    },
    saveScore(){
        const previousScore  = localStorage.getItem('score');
        if(!previousScore || previousScore < this.score){
            localStorage.setItem('score', this.score);
        }
    },
    updateGametimer(timer){
        if(this.gametimer >0){
            this.gametimer = this.gametimer -1
        }else{
            clearInterval(timer);
            this.saveScore();
            const alertUser = confirm(`Game is over! Your score is: ${this.score}`);
            if(alertUser){
                location.reload();
            }
        }
    }
}

const rclick = new randomClick();
rclick.getgridByLevel();
let hScore = localStorage.getItem('score');
if(hScore){
    rclick.updateHighestScore(hScore);
}
let timer
function startGame(){
    document.getElementById("gameLevel").disabled = true;
    timer = setInterval(function(){
        rclick.setActiveClass();
        rclick.updateGametimer(timer);
    }, GRID_ACTIVE_TIME)
}
function handleGridClick(gridid){
    if(rclick.activeGrid === gridid && rclick.previous !== gridid){
        rclick.updateScore(gridid);
    }else if(rclick.activeGrid !== gridid){
        rclick.updateError()
    }
    rclick.updatelatestScoreInUI();
}
function setDomNodeByID(nodeName, content){
    document.getElementById(nodeName).innerHTML = content;
}
function myFunction(){
    level = document.getElementById("gameLevel").value
    rclick.level = level;
    rclick.getgridByLevel();
}
