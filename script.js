function mensagem(){
    alert("Preparado para começar?");
}

const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;
//lidar com a tecla p cima
function handleKeyUp(event){
    if(event.keyCode === 32){
        if(!isJumping){
            jump();
        }
    }
}
function jump (){
isJumping = true
//executar codigo no intervalo de 20seg
let upInterval = setInterval(()=>{
    if(position>=150){
        clearInterval(upInterval);

        //Descendo
        let downInterval = setInterval(()=>{
            if(position<=0){
                clearInterval(downInterval);
                isJumping = false
            }
            position = position -20;
            dino.style.bottom = position + 'px'
        },20)
    }else{
        position = position + 20; 
        dino.style.bottom = position + 'px'
         }
    }, 20)
    //subindo
   
}
//criando cactos
function createCactus(){
    const cactus = document.createElement('div');
    let cactusPosition = 1000;  
    let randomTime = Math.random() * 6000;

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';  
    background.appendChild(cactus);

    let leftInterval = setInterval(()=>{
        cactusPosition = cactusPosition - 10;
        cactus.style.left = cactusPosition + 'px';

        if(cactusPosition<-60){
            clearInterval(leftInterval);
            background.removeChild(cactus);
        }else if(cactusPosition >0 && cactusPosition <60 && position <60){
            //o dino tem 60px de largura e altura
            // se o cactus encostar no dino, game over   

            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">Fim de Jogo</h1>';
        }else{ 
            cactusPosition = cactusPosition - 10;
            cactus.style.left = cactusPosition + 'px';
        }
    },20)
//recursividade= chamar a função dentro dela mesma
    setTimeout(createCactus, randomTime); 
}
createCactus();
document.addEventListener('keyup', handleKeyUp);