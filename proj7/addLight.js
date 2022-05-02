// noinspection JSVoidFunctionReturnValueUsed

$(function() {

    var data = {
        lastID: 0,
        lights: []
    };


    var octopus = {
        addLight: function() {
            var thisID = ++data.lastID;

            data.lights.push({
                id: thisID,
                Exist: true
            });
            
            lightNum++;
            addLightParameters(thisID);


            currentLight = thisID;

            
            var animation = 1;
            view.render(animation);
            //mouseFlag = 0;
            
        },

        removeLight: function(light) {
            var clickedLight = data.lights[ light.id - 1 ];
            clickedLight.Exist = false;

            // lightNum--;
            
            //check exist max id, set to lastID
            if (light.id == data.lastID)
            {
                var currentID = data.lastID;
                for(var i = currentID; i > 0; i--)
                {
                    if(data.lights[i-1].Exist == false)
                    {
                        data.lights.pop();
                        --data.lastID;
                    }else{
                        break;
                    }
                }
            }
            

            view.render();
        },

        getExistLights: function() {
            var ExistLights = data.lights.filter(function(light) {
                return light.Exist;
            });
            return ExistLights;
        },
/*
        thisLightExist: function(light){
            if( data.lights[ light.id - 1 ].Exist == true)
            {
                return true;
            }else{
                return false;
            }
        },
*/
        init: function() {
            view.init();
        }
    };


    var view = {
        init: function() {

            // mouse event

            var canvas = document.getElementById( "gl-canvas" );
            canvas.addEventListener("mousedown", function(evt){
                mouseFlag = 1;
                evt.preventDefault();
            }, false);
            canvas.addEventListener("touchstart", function(evt){
                mouseFlag = 1;
            }, false);
            
            document.addEventListener("mousemove", function(evt){
                if(mouseFlag === 1){
                    setMousePos(canvas, evt, 0);//add default light event;
                }
            }, false);
            document.addEventListener("touchmove", function(evt){
                if(mouseFlag === 1){
                    setMousePos(canvas, evt, 0);//add default light event;
                }
            }, false);

            document.addEventListener("mousemove", function(evt){
                if(mouseFlag === 1){
                    setMousePos(canvas, evt, -1);//add default light event;
                }
            }, false);
            document.addEventListener("touchmove", function(evt){
                if(mouseFlag === 1){
                    setMousePos(canvas, evt, -1);//add default light event;
                }
            }, false);

            document.addEventListener("mouseup", function(){
                mouseFlag = 0;
                //mouseFlag = (mouseFlag ==0)?1:0;
            }, false);
            document.addEventListener("touchend", function(){
                mouseFlag = 0;
                //mouseFlag = (mouseFlag ==0)?1:0;
            }, false);

            
            // show light Position event
            
            $('#lightsPositionSelect:checkbox').click(function() {
                var $this = $(this);
                // $this will contain a reference to the checkbox
                if ($this.is(':checked')) {
                    $('#lightPosition_container').css("display", "block");
                } else {
                    $('#lightPosition_container').css("display", "none");
                }
            });



            // "Add light" button event
            var addLightBtn = $('#btn_addLight');
            addLightBtn.click(function() {
                octopus.addLight();
            });

            // grab elements and html for using in the render function
            this.$lightList = $('ul#accordion_Lights');
            this.defaultLightTemplate = $('script[data-template="defaultLight"]').html();
            this.lightTemplate = $('script[data-template="light"]').html();
            this.$lightMarkList = $('#lightPosition_container');

            // Delegated event to listen for removal clicks
            this.$lightList.on('click', '.myLightsTitle .destroy', function(e) {
                var light = $(this).parents('.panel').data();
                octopus.removeLight(light);
                return false;
            });

            this.render();
        },

        render: function() {
            // Cache vars for use in forEach() callback (performance)
            // console.log(mouseXY);
            var $lightList = this.$lightList,
                $lightMarkList = this.$lightMarkList,
                lightTemplate = this.lightTemplate;
                
            var defaultLightTemplate = lightTemplate.replace(/{{id}}/g, 0).replace("LIGHT0","DEFAULT LIGHT");

            // Clear and render
            $lightList.html('');
            $lightMarkList.html('');
            $lightList.append(defaultLightTemplate);

            $("#lightPanel0 .destroy").remove();//can not be deleted

            //for default light
            setupLightFunctions(0);//sliderbar checkbox etc, function in sliders.js
            drawLightMarkPosition(0);

            octopus.getExistLights().forEach(function(light) {

                // Replace template markers with data
                var thisTemplate = lightTemplate.replace(/{{id}}/g, light.id);
                $lightList.append(thisTemplate);
                setupLightFunctions(light.id);
                drawLightMarkPosition(light.id);
            });
            
            
            if (currentLight != null)
            {
                
                var lightTitleName = '#lightPanel' + currentLight + ' .myLightsTitle';
                $(lightTitleName).removeClass('collapsed');
                var lightContentName = '#light' + currentLight;
                $(lightContentName).addClass('in');
                
            }

            //for show lights position 
            //init default point
            



        }
    };

    octopus.init();
}());





function addLightParameters(index){
    //init parameter
    mouseXY[index] = [Math.random()-0.5, Math.random()-0.5];     
    lightColor[index] =[Math.random(), Math.random(), Math.random()];
    lightIntensity[index] = 0.5;
    pointLightDis[index] = 0.5;
    pointLightDecay[index] = 0.1;
    showDiffuse[index] = 1;
    showSpec[index] = 1;
    showDLight[index] = 0;
    showPLight[index] = 1;
    showALight[index] = 0;
    randomArea[index] = 0;
    spotLighta[index] = 0.5;
    
    //mouse 
    var canvas = document.getElementById( "gl-canvas" );
    document.addEventListener("mousemove", function(evt){
        if(mouseFlag === 1){
            setMousePos(canvas, evt, index);
        }
    }, false);
    document.addEventListener("touchmove", function(evt){
        if(mouseFlag === 1){
            setMousePos(canvas, evt, index);
        }
    }, false);
    
}




//for show lights position

function setLightMarkFill(index)
{
    var colorString = color2hex(lightColor[index]);
    var lightMarkName = '#lightMark'+index;
    $(lightMarkName).attr('fill', colorString);
}

function setLightMarkPosition(index)
{

    var lightPx = (mouseXY[index][0] + 0.5)*100 + "%";
    var lightPy = (mouseXY[index][1] + 0.5)*100 + "%";

    var lightMarkName = '#lightMark'+index;
    $(lightMarkName).attr('cx', lightPx).attr('cy', lightPy);
}

function drawLightMarkPosition(index){
    var lightPx = (mouseXY[index][0] + 0.5)*100 + "%";
    var lightPy = (mouseXY[index][1] + 0.5)*100 + "%";
    var colorString = color2hex(lightColor[index]);
    var lightMark = "lightMark" + index;
    var circle= makeSVG('circle', {id:lightMark, cx: lightPx, cy: lightPy, fill: colorString, r:8});//, stroke: 'white', 'stroke-width': 1
    document.getElementById('lightPosition_container').appendChild(circle);
}

function makeSVG(tag, attrs) {
    var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs)
        el.setAttribute(k, attrs[k]);
    return el;
}


