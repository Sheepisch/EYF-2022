const canvas = document.querySelector('canvas');
canvas.width = 500;
canvas.height = 500

const {width, height} =canvas;
//const FPS 20;
ctx = canvas.getContext('2d');


const animate = () =>{
    ctx.clearRect(0,0,width,height);
    setTimeout(()=>{

    },1000/FPS)
}