let rows =20;
let cols =20;
let blocksize =25;
var obs;
let board;
let draw;
let done = false;
// head
let snakex =blocksize * 5;
let snakey =blocksize * 5;
let arrobsx=[];
let arrobsy=[];
let score =1;
//let obstacelex =blocksize * 5;
//let obstaceley=blocksize * 5;
const crunchsound = new Audio("chew.mp3");
const bongsound = new Audio("thump.mp3");
let every2 =1;
let velocityx =0;
let velocityy=0;
let obstaceles =[];
let foodx;
let foody;
let obstacelex;
let obstaceley;
let i=0;
let tail=[];
window.onload= function(){
    document.body.style.zoom="95%"

    board = document.getElementById("board");
    board.height =rows * blocksize;
    board.width = cols *blocksize;
    draw= board.getContext("2d");
    placefoodrandom()
  placeobstacle();
    document.addEventListener("keyup", directions)
    
    
    setInterval(fillboard, 100,10) /// updates board every 100 miliseconds();
}

function fillboard(){
   
    
   

   // while (snakex !== obstacele)
    //{
    if (done)
    {
        return;
    }
    obscheck(snakex,snakey);
   

    
    
    draw.fillStyle="black";
    draw.fillRect(0,0,board.width,board.height);

    draw.fillStyle ="white";
    for (let i=0; i <obstaceles.length; i++)
    {
        draw.fillRect (obstaceles[i][0],obstaceles[i][1],blocksize,blocksize);

    }
    
    
    draw.fillStyle ="red";
    draw.fillRect (foodx,foody,blocksize,blocksize);
  
    //draw.fillStyle ="orange";
    //draw.fillRect (obstacelex,obstaceley,blocksize,blocksize);

    if (snakex == foodx && snakey == foody)
  {
crunchsound.play();
    every2++;
    placefoodrandom();  
   if (every2 == 2)
   {
    placeobstacle();
    every2=0;  
    }
    tail.push([snakex,snakey]);
    
    obstaceles.push([obstacelex,obstaceley]);

score++;
displayscore();
}
  


for (let i= tail.length-1; i>0; i--)
{
   tail[i]=tail[i-1];

}

   
if (tail.length){
    tail[0]= [snakex,snakey];
}


//draw.fillStyle ="orange";
  //  for (let i=0; i <obstaceles.length; i++)
    //{
      //  draw.fillRect (obstaceles[i][0],obstaceles[i][1],blocksize,blocksize);

    //}


draw.fillStyle="blue";
    snakex+= velocityx * blocksize;
    snakey+=velocityy * blocksize;
    
    draw.fillRect(snakex,snakey,blocksize,blocksize)
    
    
    //draw.fillRect (obstacelex,obstaceley,blocksize,blocksize);

    ///////////////////
   
    
    

   for (let i=0; i <tail.length; i++)
   {
    draw.fillRect(tail[i][0],tail[i][1],blocksize,blocksize)
   }

  
   

   if(snakex < 0 || snakex > rows *blocksize|| snakey < 0|| snakey > cols*blocksize)
   {
   
    done = true;
      
       if (alert("Game over you went outside the grid"))
       {
        
        return;
        //refreshes page
           //window.location='/'
       }  
    }

for (let i = 0; i< tail.length; i++)
{
    if (snakex== tail[i][0] && snakey == tail[i][1])
    {
    done = true;
    if (alert("game over you ate your self"))
    {
       
        return;
    }  
    }
    
}


    //}

    
}


function placefoodrandom()
{

   // let xfood;
    //let yfood;
    foodx = Math.floor(Math.random() * rows) * blocksize;

    foody = Math.floor(Math.random() * cols) * blocksize;
    for (let i=1; i < arrobsx.length; i++)
    {
      while(arrobsx[i]== foodx && arrobsy[i]==foody)    
    {

    
        foodx = Math.floor(Math.random() * rows) * blocksize;

    foody = Math.floor(Math.random() * cols) * blocksize;
    }    
}


}

function directions(e)
{

    console.log('head is AT' + snakex);
    console.log('heady is AT' + snakey);

    if (e.code == "ArrowUp" && velocityy != 1)
{
    velocityx = 0;
    velocityy = -1;
}


else if (e.code == "ArrowDown" && velocityy != -1)
{
    velocityx = 0;
    velocityy = 1;
}

else if (e.code == "ArrowLeft" && velocityx != 1) 
{
    velocityx = -1;
    velocityy = 0;
}


else if (e.code == "ArrowRight" && velocityx != -1)
{
    velocityx = 1;
    velocityy = 0;
}

}

function placeobstacle()
{
  //maybe fix 
    //while (Math.floor(Math.random() * rows) * blocksize != foodx)
  //{
    //console.log(obstacelex);
    //console.log(obstaceley);
   // if (score !=1)
   // {
    obstacelex = Math.floor(Math.random() * rows) * blocksize;
arrobsx.push([obstacelex]);
obstaceley = Math.floor(Math.random() * cols) * blocksize;

  
arrobsy.push([obstaceley]);
console.log(obstacelex);
console.log(obstaceley);
//}



//}
}


function obscheck(sx,sy)
{
    //
    for (let i=1; i < arrobsx.length; i++)
    {
       
        if (arrobsx[i]== snakex && arrobsy[i] == snakey)
        {
           done =true;
            if (alert("game over you ran into an obstacle"))
            {
            // return;
                //refreshes page
             //   window.location='/'
            }  
        }
    }
  
   



}

function displayscore()
{
 document.getElementById('score').innerText=score;

}