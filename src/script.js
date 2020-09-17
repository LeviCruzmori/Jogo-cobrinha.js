let canvas = document.getElementById("snake");// trazendo canvas ao JS
let context = canvas.getContext("2d");// definindo versao 2D
let box = 32;
let snake = [];// variaveis da cobrinha
snake[0]= {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";// criando direção
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,//apresenta a comida em pontos aleatorios do canvas.
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG(){//definindo function que desenha o canvas
    context.fillStyle = "lightgreen";// trabalha com o estilo do contexto
    context.fillRect(0, 0, 16 * box, 16 * box);// desenha o retangulo
};
//criando a cobrinha com uma array
function criarCobrinha(){
    for(i=0; i < snake.length; i++){
        context.fillStyle = "blue";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

//criando a comida da cobrinha
function drawFood(){
    context.fillStyle = "red";
    context.fillRect( food.x, food.y, box, box);
}

//criando evento com teclas.
document.addEventListener('keydown', update);

function update (event){
    if(event.keyCode == 37 && direction !="right") direction = "left";
    if(event.keyCode == 38 && direction !="down") direction = "up";
    if(event.keyCode == 39 && direction !="left") direction = "right";
    if(event.keyCode == 40 && direction !="up")direction = "down";

}

// function inica jogo
 function iniciarJogo(){

//plano carteziano para definir loop de movimentação
if(snake[0].x > 15 * box && direction == "right")snake[0].x = 0;
if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
if(snake[0].y < 0 && direction =="up") snake[0].y = 16 * box;

//criando o conflito para terido do jogo se a cobrinha se chocar com ela mesma.
for(i=1; i < snake.length; i++){
    if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
        clearInterval(jogo);
        alert('Game Over :(');
    }
}

    criarBG();// chamando a função
    criarCobrinha();// chamando a function
    drawFood();//function comida

//criando movimentos da cobrinha
let snakeX = snake[0].x;
let snakeY = snake[0].y;

if(direction == "right") snakeX += box;
if(direction == "left") snakeX -= box;
if(direction == "up") snakeY -= box;
if(direction == "down") snakeY += box;

// adicionando tamanho a cobrinha conforme pega comida.
if(snakeX != food.x || snakeY != food.y){
    snake.pop();
}
else{
 food.x =  Math.floor(Math.random() * 15 + 1) * box;//apresenta a comida em pontos aleatorios do canvas.
 food.y =  Math.floor(Math.random() * 15 + 1) * box;
}

//criando nova parte da cobrinha
let newHead = {
    x: snakeX,
    y: snakeY
}

snake.unshift(newHead);

}

let jogo  = setInterval(iniciarJogo,100 )//inicia o jogo


