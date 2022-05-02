//mouse functions

function setMousePos(canvas, evt, i){
    var rect = canvas.getBoundingClientRect();

    if (cameraControl == 0){
        if (currentLight == i)
        {
            mouseXY[i][0] = getMousePos(canvas, evt).x;
            mouseXY[i][1] = getMousePos(canvas, evt).y;
            setLightMarkPosition(i);
            console.log(i+": "+mouseXY[i][0]+" "+mouseXY[i][1]);
        }
    } else if (cameraControl == 1 && viewControl == 0){
        mouseXYcamera[0] = getMousePos(canvas, evt).x;
        mouseXYcamera[1] = getMousePos(canvas, evt).y;
        console.log("Camera:" + mouseXYcamera[0] + " " + mouseXYcamera[1]);
    } else if (viewControl == 1){
        mouseXYview[0] = getMousePos(canvas, evt).x;
        mouseXYview[1] = getMousePos(canvas, evt).y;
        console.log("Camera view:" + mouseXYview[0] + " " + mouseXYview[1]);
    }


}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();

    var newX, newY;
    if(evt.type == 'touchstart' || evt.type == 'touchmove' || evt.type == 'touchend' || evt.type == 'touchcancel'){
        var touch = evt.touches[0] || evt.changedTouches[0];
        newX = touch.pageX;
        newY = touch.pageY;
    } else if (evt.type == 'mousedown' || evt.type == 'mouseup' || evt.type == 'mousemove' || evt.type == 'mouseover'|| evt.type=='mouseout' || evt.type=='mouseenter' || evt.type=='mouseleave') {
        newX = evt.pageX;
        newY = evt.pageY;
    }

    if (newY < rect.top) newY = rect.top;
    if (newY > rect.bottom) newY = rect.bottom;
    if (newX < rect.left) newX = rect.left;
    if (newX > rect.right) newX = rect.right;


    return {
        x: (newX - rect.left)/(rect.right - rect.left) - 0.5,
        y: (newY - rect.top)/(rect.bottom - rect.top) - 0.5
    };
}
