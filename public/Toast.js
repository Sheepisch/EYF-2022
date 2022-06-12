class Toast{
    constructor(data){
        if('type' in data){
            if(data.type=='error' || data.type=='info' || data.type=='success')this.type=data.type;
            else throw "Not a valid Toast type";
            if(this.type=='error')this.bgcolor='red';
            if(this.type=='info')this.bgcolor='blue';
            if(this.type=='success')this.bgcolor='green';
        }
        if('duration' in data)
            this.duration=data.duration;
        else
            this.duration=5000;
        
        if('animate' in data)
            this.animate=data.animate
        else    
            this.animate=true;
        this.textColor='white';
        this.borderRadius='10px';
        this.position='fixed'
        this.bottom='20px'
        this.left='20px'
    }
    show(message,after){
        this.message=message;
        console.log('Toast Displayed',this.message);
        document.getElementsByTagName('body')[0].innerHTML+=this.toast();
        this.animateOpen();
        this.timeout = setTimeout(()=>{
            document.getElementById('Toast').style.display='none';
            after();
        },this.duration);
        document.getElementById('toast-span').addEventListener('click',e=>{
            clearTimeout(this.timeout);
            document.getElementById('Toast').style.display='none';
            after();
        })
        
        
    }
    customize(data){
        if('bgcolor' in data){
            this.bgcolor=data.bgcolor;
        }
        if('textColor' in data){
            this.textColor=data.textColor
        }else{
            this.textColor='white';
        }
        if('borderRadius' in data){
            this.borderRadius=data.borderRadius
        }else{
            this.borderRadius='10px';
        }
        if('position' in data){
            this.position=data.position
        }else{
            this.position='fixed'
        }
        if('bottom' in data){
            this.bottom=data.bottom
        }else{
            this.bottom='20px'
        }
        if('left' in data){
            this.left=data.left
        }else{
            this.left='20px'
        }
    }
    animateClose(after){
        var ele = document.getElementById('Toast');
        //ele.style.display='block';
        var setOpacity=1;
        //ele.style.bottom='20px';
        var duration=200;
        var anim = setInterval(close,5);
        
        function close(){
            setOpacity -=parseFloat(1/duration);
            ele.style.opacity=setOpacity;
            console.log(ele.style.opacity, setOpacity);
            if(setOpacity<=0.01)
            {
                ele.style.display='none';
                clearInterval(anim);
                if(after!==undefined)
                after();
            }
        }
    }
    animateOpen(){
        var ele = document.getElementById('Toast');
        ele.style.opacity=0;
        ele.style.display='block';
        var setOpacity=0;
        ele.style.bottom='20px';
        var duration=200;
        if(this.animate)
        var anim = setInterval(open,5);
        else{
            ele.style.opacity=1;
        }
        
        function open(){
            setOpacity +=parseFloat(1/duration);
            ele.style.opacity=setOpacity;
            //console.log(ele.style.opacity, setOpacity);
            if(setOpacity>=1)
            clearInterval(anim);
        }
    }
    toast(){
        return '<div id="Toast" style="display:none;position:'+this.position+';bottom:'+this.bottom+';left:'+this.left+';min-width:300px;padding:10px 30px;background:'+this.bgcolor+';color:'+this.textColor+';border-radius:'+this.borderRadius+';z-index:999;box-shadow:0 0 20px #000">'+
        '<div style="display:flex;justify-content:space-between;align-items:center">'+
        '<span style="font-size:20px;font-weight:bold;max-width:200px">'+this.message+'</span>'+
        '<span id="toast-span" style="display:flex;align-items:center;justify-content:center;font-size:20px;background:rgba(0,0,0,0.2);width:40px;height:40px;border-radius:50%;cursor:pointer">X</span></div>'+
        '</div>';
    }
    
}