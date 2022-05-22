class Paddle{
    constructor(x){
        this.x = x;
        this.h = 15;
        this.y = height - this.h;
        this.w = width * 0.2;
        this.vx = 10;


    }
    draw(ctx){
        const {x,y,w,h}
        ctx.beginPath();
        ctx.fillStyle = 'blue';
        ctx.fillRect(x,y,w,h);

    }
}