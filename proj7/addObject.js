// noinspection JSVoidFunctionReturnValueUsed

$(function() {

    var data = {
        lastID: 0,
        objects: []
    };


    var octopus = {
        addObject: function() {
            var thisID = ++data.lastID;

            data.objects.push({
                id: thisID,
                Exist: true
            });

            console.log("add object")

            objectNum++;
            addObjectParameters(thisID);


            currentObject = thisID;


            var animation = 1;
            view.render(animation);
            //mouseFlag = 0;

        },
        // addDefaultObject: function() {
        //     var thisID = ++data.lastID;
        //
        //     data.objects.push({
        //         id: thisID,
        //         Exist: true
        //     });
        //
        //     console.log("add object")
        //
        //     objectNum++;
        //     // addObjectParameters(thisID);
        //
        //
        //     currentObject = thisID;
        //
        //
        //     var animation = 1;
        //     view.render(animation);
        //     //mouseFlag = 0;
        //
        // },

        removeObject: function(object) {
            var clickedObject = data.objects[ object.id - 1 ];
            clickedObject.Exist = false;


            // objectNum--;
            //check exist max id, set to lastID
            if (object.id == data.lastID)
            {
                var currentID = data.lastID;
                for(var i = currentID; i > 0; i--)
                {
                    if(data.objects[i-1].Exist == false)
                    {
                        data.objects.pop();
                        --data.lastID;
                    }else{
                        break;
                    }
                }
            }


            view.render();
        },

        getExistObjects: function() {
            var ExistObjects = data.objects.filter(function(object) {
                return object.Exist;
            });
            return ExistObjects;
        },
        /*
                thisObjectExist: function(object){
                    if( data.objects[ object.id - 1 ].Exist == true)
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
                    setMousePos(canvas, evt, 0);//add default object event;
                }
            }, false);
            document.addEventListener("touchmove", function(evt){
                if(mouseFlag === 1){
                    setMousePos(canvas, evt, 0);//add default object event;
                }
            }, false);

            document.addEventListener("mousemove", function(evt){
                if(mouseFlag === 1){
                    setMousePos(canvas, evt, -1);//add default object event;
                }
            }, false);
            document.addEventListener("touchmove", function(evt){
                if(mouseFlag === 1){
                    setMousePos(canvas, evt, -1);//add default object event;
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


            // show object Position event

            $('#objectsPositionSelect:checkbox').click(function() {
                var $this = $(this);
                // $this will contain a reference to the checkbox
                if ($this.is(':checked')) {
                    $('#objectPosition_container').css("display", "block");
                } else {
                    $('#objectPosition_container').css("display", "none");
                }
            });



            // "Add object" button event
            var addObjectBtn = $('#btn_addObject');
            addObjectBtn.click(function() {
                octopus.addObject();
            });

            // grab elements and html for using in the render function
            this.$objectList = $('ul#accordion_Objects');
            this.defaultObjectTemplate = $('script[data-template="defaultObject"]').html();
            this.objectTemplate = $('script[data-template="object"]').html();
            this.$objectMarkList = $('#objectPosition_container');

            // Delegated event to listen for removal clicks
            this.$objectList.on('click', '.myObjectsTitle .destroy', function(e) {
                var object = $(this).parents('.panel').data();
                octopus.removeObject(object);
                return false;
            });

            this.render();
        },

        render: function() {
            // Cache vars for use in forEach() callback (performance)
            var $objectList = this.$objectList,
                $objectMarkList = this.$objectMarkList,
                objectTemplate = this.objectTemplate;

            var defaultObjectTemplate = objectTemplate.replace(/{{id}}/g, 0).replace("OBJECT0","DEFAULT OBJECT");

            // Clear and render
            $objectList.html('');
            $objectMarkList.html('');
            $objectList.append(defaultObjectTemplate);


            $("#objectPanel0 .destroy").remove();//can not be deleted

            //for default object
            setupObjectFunctions(0);//sliderbar checkbox etc, function in sliders.js
            // drawObjectMarkPosition(0);

            octopus.getExistObjects().forEach(function(object) {

                // Replace template markers with data
                var thisTemplate = objectTemplate.replace(/{{id}}/g, object.id);
                $objectList.append(thisTemplate);
                setupObjectFunctions(object.id);
                // drawObjectMarkPosition(object.id);
            });


            if (currentObject != null)
            {

                var objectTitleName = '#objectPanel' + currentObject + ' .myObjectsTitle';
                $(objectTitleName).removeClass('collapsed');
                var objectContentName = '#object' + currentObject;
                $(objectContentName).addClass('in');

            }

            //for show objects position
            //init default point




        }
    };

    octopus.init();
    octopus.addObject();
    octopus.addObject();
    octopus.addObject();
}());

function addObjectParameters(index){
    //init parameter
    showObject[index] = 1;
    mouseXY[index] = [Math.random()-0.5, Math.random()-0.5];
    objectColor[index] =[Math.random(), Math.random(), Math.random()];
    objectIntensity[index] = 0.5;
    // previous objectZ (we do not need it now)
    pointObjectDis[index] = 0.5;
    // object position parameters
    objectX[index] = 1.5;
    objectY[index] = 2.0;
    objectZ[index] = 0.7;
    objectsel[index] = Math.floor(Math.random() * 7.9);
    ks[index] = 0.5;
    IOR[index] = 0.;
    S0[index] = 0.3;
    S1[index] = 0.3;
    S2[index] = 0.3;
    v2x[index] = 0.;
    v2y[index] = 0.;
    v2z[index] = 1.;
    pointObjectDecay[index] = 0.1;
/*    showPlane[index] = 0;
    showCylinder[index] = 0;
    showEllipsoid[index] = 0;
    showCone[index] = 0;
    showHyperboloidA[index] = 0;
    showHyperboloidB[index] = 0;
    showEParaboloid[index] = 0;
    showHParaboloid[index] = 0;*/
    showDObject[index] = 0;
    showPObject[index] = 1;
    spotObjecta[index] = 0.5;

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