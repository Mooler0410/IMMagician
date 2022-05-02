$(document).ready(function () {

    
    /**************** init checkbox according to default parameters ******************/
    
    var lightsOnlyElem = $('#lightsOnlySelect');
    initCheckbox(lightsOnly, lightsOnlyElem);

    var lightsPositionElem = $('#lightsPositionSelect');
    initCheckbox(lightsPosition, lightsPositionElem);

    var smoothStepElem = $('#smoothStepSelect');
    initCheckbox(smoothStep, smoothStepElem);

    var centerViewElem = $('#centerViewSelect');
    initCheckbox(centerView, centerViewElem);

    var cameraElem = $('#cameraSelect');
    initCheckbox(cameraControl, cameraElem);

    var viewElem = $('#viewSelect');
    initCheckbox(viewControl, viewElem);

    var checkFresnelElem = $('#checkFresnelSelect');
    initCheckbox(checkFresnel, checkFresnelElem);

    var realFresnelElem = $('#realFresnelSelect');
    initCheckbox(realFresnel, realFresnelElem);

    var trasposeImageElem = $('#transposeImageSelect');
    initCheckbox(transposeImage, trasposeImageElem);
    

    if (lightsPosition ==1)
    {
        $('#lightPosition_container').css("display", "block");
    }else{
        $('#lightPosition_container').css("display", "none");
    }
    
    
    /**********************offcanvas.js********************/
    $('[data-toggle="offcanvas"]').click(function () {
        $('.row-offcanvas').toggleClass('active')
    });
      
      
    /**********************SliderBar********************************/
    
    /**Basic Image**/
    $("#styleControl_slider").slider({ min: 0, max: 1, value: [styleBright, styleDark], step: 0.01, focus: true });
    $("#styleControl_slider").on("slide", function(slideEvt) {
    	styleBright = slideEvt.value[0];
    	styleDark = slideEvt.value[1];
    });

    //cameraDis
    var cameraDis_slider = $("#cameraDis_slider");
    var cameraDis_val = $("#cameraDis_val");
    cameraDis_slider.attr("data-slider-min", 0).attr("data-slider-max", 50).attr("data-slider-step", 0.1).attr("data-slider-value", cameraDis).attr("data-slider-tooltip","hide").slider({});
    bindSliderValParam (cameraDis_slider, cameraDis_val, "cameraDis");

    //cameraTilt
    var cameraTilt_slider = $("#cameraTilt_slider");
    var cameraTilt_val = $("#cameraTilt_val");
    cameraTilt_slider.attr("data-slider-min", -1).attr("data-slider-max", 1).attr("data-slider-step", 0.01).attr("data-slider-value", cameraTilt).attr("data-slider-tooltip","hide").slider({});
    bindSliderValParam (cameraTilt_slider, cameraTilt_val, "cameraTilt");


    /**Alpha**/

    var alphaInRed_slider = $("#alphaInRed_slider");
    var alphaInRed_val = $("#alphaInRed_val");
    alphaInRed_slider.attr("data-slider-min", 0).attr("data-slider-max", 1).attr("data-slider-step", 0.01).attr("data-slider-value", alphaR).attr("data-slider-tooltip","hide").slider({});
    bindSliderValParam (alphaInRed_slider, alphaInRed_val, "alphaR");

    var alphaInGreen_slider = $("#alphaInGreen_slider");
    var alphaInGreen_val = $("#alphaInGreen_val");
    alphaInGreen_slider.attr("data-slider-min", 0).attr("data-slider-max", 1).attr("data-slider-step", 0.01).attr("data-slider-value", alphaG).attr("data-slider-tooltip","hide").slider({});
    bindSliderValParam (alphaInGreen_slider, alphaInGreen_val, "alphaG");

    var alphaInBlue_slider = $("#alphaInBlue_slider");
    var alphaInBlue_val = $("#alphaInBlue_val");
    alphaInBlue_slider.attr("data-slider-min", 0).attr("data-slider-max", 1).attr("data-slider-step", 0.01).attr("data-slider-value", alphaB).attr("data-slider-tooltip","hide").slider({});
    bindSliderValParam (alphaInBlue_slider, alphaInBlue_val, "alphaB");


    /**Shadow**/
    $("#sha_sampleSize_slider").slider({min: 0, max: 1, value: 1, step: 0.01, focus: true});
    $("#sha_numberOfSample_slider").slider({min: 0, max: 1, value: 1, step: 0.01, focus: true});
    
    
    /**Ambient**/
    $("#amb_sampleSize_slider").slider({min: 0, max: 1, value: 1, step: 0.01, focus: true});
    $("#amb_numberOfSample_slider").slider({min: 0, max: 1, value: 1, step: 0.01, focus: true});


    /**Refraction**/
    
    var refr_slider = $("#refraction_slider");
    var refr_val = $("#refraction_val");
    refr_slider.attr("data-slider-min",-1).attr("data-slider-max", 1).attr("data-slider-step", 0.01).attr("data-slider-value", logIOR).attr("data-slider-tooltip","hide").slider({});
    bindSliderValParam (refr_slider, refr_val, "logIOR");

    var refr_BGdis_slider = $("#refr_BGdis_slider");
    var refr_BGdis_val = $("#refr_BGdis_val");
    refr_BGdis_slider.attr("data-slider-min", 0).attr("data-slider-max", 1).attr("data-slider-step", 0.01).attr("data-slider-value", BGdis).attr("data-slider-tooltip","hide").slider({});
    bindSliderValParam (refr_BGdis_slider, refr_BGdis_val, "BGdis");



    /**Fresnel**/

    var fresnel_intensity_slider = $("#fresnel_intensity_slider");
    var fresnel_intensity_val = $("#fresnel_intensity_val");
    fresnel_intensity_slider.attr("data-slider-min", -1).attr("data-slider-max", 1).attr("data-slider-step", 0.01).attr("data-slider-value", fresnelIntensity).attr("data-slider-tooltip","hide").slider({});
    bindSliderValParam (fresnel_intensity_slider, fresnel_intensity_val, "fresnelIntensity");

    $("#fresnelControl_slider").slider({ min: 0, max: 1, value: [fresnelB, fresnelC], step: 0.01, focus: true });
    $("#fresnelControl_slider").on("slide", function(slideEvt) {
        fresnelB = slideEvt.value[0];
        fresnelC = slideEvt.value[1];
    });


    //$("#translucency_slider").slider({min: 0, max: 1, value: 1, step: 0.01, focus: true});
    
    /**Reflection**/
    
    //reflMap dropdown
    //init
    var way;
    if (reflMap == 1)
    {
        way = 'Plane ';
    }else if (reflMap == 2)
    {
        way = 'Hemisphere ';
    }
    var mystring = way + '<span class=\"caret\"></span>';
    $("#reflMap .btn").html(mystring);

    // var objectPanelNameId = "#objectPanel0" + " ";
    // var objectTypeName = ['Plane', 'Generalized_Cylinder', 'Ellipsoid', 'Cone', 'Hyperboloid1',
    //     'Hyperboloid2', 'Elliptic_Paraboloid', 'Hyperbolic_Paraboloid'];
    // for (var j=0; j < objectTypeName.length; j++){
    //     if (objectsel[0] == j)
    //     {
    //         $(objectPanelNameId + "#objectsel .btn").html(objectTypeName[j] + '<span class=\"caret\"></span>');
    //     }
    // }
    
        
    

    //events
    $("#reflMap").on("hide.bs.dropdown", function(){
        $("#reflMap .caret").removeClass("caret-up");
    });
    $("#reflMap").on("show.bs.dropdown", function(){
        $("#reflMap .caret").addClass("caret-up");
    });

    $("#reflMap_plane").click(function(){
        $("#reflMap .btn").html('Plane <span class="caret"></span>');
        reflMap = 1;
    })
    $("#reflMap_hemisphere").click(function(){
        $("#reflMap .btn").html('Hemisphere <span class="caret"></span>');
        reflMap = 2;
    })


    // $("#reflMap .btn").html('Hemisphere <span class="caret caret-up"></span>');


    var refl_FGdis_slider = $("#refl_FGdis_slider");
    var refl_FGdis_val = $("#refl_FGdis_val");
    refl_FGdis_slider.attr("data-slider-min", 0).attr("data-slider-max", 5).attr("data-slider-step", 0.01).attr("data-slider-value", FGdis).attr("data-slider-tooltip","hide").slider({});
    bindSliderValParam (refl_FGdis_slider, refl_FGdis_val, "FGdis");


    var refl_FGshiftX_slider = $("#refl_FGshiftX_slider");
    var refl_FGshiftX_val = $("#refl_FGshiftX_val");
    refl_FGshiftX_slider.attr("data-slider-min", -1).attr("data-slider-max", 1).attr("data-slider-step", 0.01).attr("data-slider-value", FGshiftX).attr("data-slider-tooltip","hide").slider({});
    bindSliderValParam (refl_FGshiftX_slider, refl_FGshiftX_val, "FGshiftX");

    var refl_FGshiftY_slider = $("#refl_FGshiftY_slider");
    var refl_FGshiftY_val = $("#refl_FGshiftY_val");
    refl_FGshiftY_slider.attr("data-slider-min", -1).attr("data-slider-max", 1).attr("data-slider-step", 0.01).attr("data-slider-value", FGshiftY).attr("data-slider-tooltip","hide").slider({});
    bindSliderValParam (refl_FGshiftY_slider, refl_FGshiftY_val, "FGshiftY");

    var refl_FGscaleX_slider = $("#refl_FGscaleX_slider");
    var refl_FGscaleX_val = $("#refl_FGscaleX_val");
    refl_FGscaleX_slider.attr("data-slider-min", 0).attr("data-slider-max", 1).attr("data-slider-step", 0.01).attr("data-slider-value", FGscaleX).attr("data-slider-tooltip","hide").slider({});
    bindSliderValParam (refl_FGscaleX_slider, refl_FGscaleX_val, "FGscaleX");

    var refl_FGscaleY_slider = $("#refl_FGscaleY_slider");
    var refl_FGscaleY_val = $("#refl_FGscaleY_val");
    refl_FGscaleY_slider.attr("data-slider-min", 0).attr("data-slider-max", 1).attr("data-slider-step", 0.01).attr("data-slider-value", FGscaleY).attr("data-slider-tooltip","hide").slider({});
    bindSliderValParam (refl_FGscaleY_slider, refl_FGscaleY_val, "FGscaleY");

    $("#bluriness_slider").slider({min: 0, max: 1, value: 1, step: 0.01, focus: true});

    
    
    /*Quality**/
    $("#smQuality_slider").slider({min: 0, max: 1, value: 1, step: 0.01, focus: true});
    
    
     //collapse list +/- toggle	
    /*
     $(".myControlTitle collapsed").on("hide.bs.collapse", function(){
        $(".btn").html('<span class="glyphicon glyphicon-collapse-down"></span> Open');
      });
      $("#demo").on("show.bs.collapse", function(){
        $(".btn").html('<span class="glyphicon glyphicon-collapse-up"></span> Close');
    */	 

  
});//end of $(document).ready



// -------------------------------- light function --------------------------------------- //

function setupLightFunctions(i)
{
    /////switch multiple lights - light on events
    var lightPanelName = '#lightPanel' + i;
    $(lightPanelName).on('shown.bs.collapse', function(){
        currentLight = i;
        console.log("current: " + currentLight);
    }).on('hidden.bs.collapse', function(){
        currentLight = null;
    })

    /////init checkbox

    //lightOn
    var checkboxName_showPLight = '#lightPanel' + i + ' #PLightSelect';
    var showPLightElem = $(checkboxName_showPLight);
    initCheckbox(showPLight[i], showPLightElem);

    var checkboxName_showALight = '#lightPanel' + i + ' #ALightSelect';
    var showALightElem = $(checkboxName_showALight);
    initCheckbox(showALight[i], showALightElem);

    var checkboxName_randomAreaSelect = '#lightPanel' + i + ' #randomAreaSelect';
    var randomAreaSelectElem = $(checkboxName_randomAreaSelect);
    initCheckbox(randomArea[i], randomAreaSelectElem);

    var checkboxName_showDLight = '#lightPanel' + i + ' #DLightSelect';
    var showDLightElem = $(checkboxName_showDLight);
    initCheckbox(showDLight[i], showDLightElem);
    
    var checkboxName_showDiffuse = '#lightPanel' + i + ' #diffuseSelect';
    var showDiffuseElem = $(checkboxName_showDiffuse);
    initCheckbox(showDiffuse[i], showDiffuseElem);

    var checkboxName_showSpec = '#lightPanel' + i + ' #specSelect';
    var showSpecElem = $(checkboxName_showSpec);
    initCheckbox(showSpec[i], showSpecElem);
    
    //////slider events

    //lightIntensity
    var sliderName_intensity = "#lightPanel" + i + " #intensity_slider";
    var textareaName_intensity = "#lightPanel" + i + " #intensity_val";
    var lightIntensity_slider = $(sliderName_intensity);
    var lightIntensity_val = $(textareaName_intensity);
    lightIntensity_slider.attr("data-slider-min", 0).attr("data-slider-max", 1).attr("data-slider-step", 0.01).attr("data-slider-value", lightIntensity[i]).attr("data-slider-tooltip","hide").slider({});
    bindSliderValParamIndex (lightIntensity_slider, lightIntensity_val, "lightIntensity", i);
	
    //spotLightAngle
    var sliderName_spotLighta = "#lightPanel" + i + " #spotLighta_slider";
    var textareaName_spotLighta = "#lightPanel" + i + " #spotLighta_val";
    var spotLighta_slider = $(sliderName_spotLighta);
    var spotLighta_val = $(textareaName_spotLighta);
    spotLighta_slider.attr("data-slider-min", 0).attr("data-slider-max", 1).attr("data-slider-step", 0.001).attr("data-slider-value", spotLighta[i]).attr("data-slider-tooltip","hide").slider({});
    bindSliderValParamIndex (spotLighta_slider, spotLighta_val, "spotLighta", i);
    
    //pointLightDis
    var sliderName_pLightDis = "#lightPanel" + i + " #pointLGTdis_slider";
    var textarea_pLightDis = "#lightPanel" + i + " #pointLGTdis_val";
    var pointLGTdis_slider = $(sliderName_pLightDis);
    var pointLGTdis_val = $(textarea_pLightDis);
    pointLGTdis_slider.attr("data-slider-min", 0).attr("data-slider-max", 1).attr("data-slider-step", 0.01).attr("data-slider-value", pointLightDis[i]).attr("data-slider-tooltip","hide").slider({});
    bindSliderValParamIndex (pointLGTdis_slider, pointLGTdis_val, "pointLightDis", i);



    //pointLightDecay
    var sliderName_pLightDecay = "#lightPanel" + i + " #pointLGTdecay_slider";
    var textarea_pLightDecay = "#lightPanel" + i + " #pointLGTdecay_val";
    var pointLGTdecay_slider = $(sliderName_pLightDecay);
    var pointLGTdecay_val = $(textarea_pLightDecay);
    pointLGTdecay_slider.attr("data-slider-min", 0).attr("data-slider-max", 1).attr("data-slider-step", 0.01).attr("data-slider-value", pointLightDecay[i]).attr("data-slider-tooltip","hide").slider({});
    bindSliderValParamIndex (pointLGTdecay_slider, pointLGTdecay_val, "pointLightDecay", i);

    ////init colorPicker & add events
    var colorPickerName = "#lightPanel" + i + " .colorPicker";
    var colorString = color2hex(lightColor[i]);
    $(colorPickerName).attr("value", colorString);
    
    

    $(colorPickerName).minicolors({
        position: 'bottom right',
        theme: 'bootstrap',
        //defaultValue: colorString,
        change: function(value) {
            if( !value ) return;
            if( typeof console === 'object' ) {
                var rgbObject = $(this).minicolors('rgbObject');
                for (var i = 0; i < lightNum; i++)
                {
                    if (currentLight == i)
                    {
                        lightColor[i][0] =rgbObject.r / 255;
                        lightColor[i][1] =rgbObject.g / 255;
                        lightColor[i][2] =rgbObject.b / 255;
                        setLightMarkFill(i);//function in addLights.js
                    }
                }
                //add event: add border if it is white#ffffff;
                var addBorderElem = $(this).parent().find(".minicolors-swatch-color");
                if (value =="#ffffff")
                {
                    addBorderElem.addClass('colorPickerBorder');
                }else{
                    addBorderElem.removeClass('colorPickerBorder');
                }
            }
        },
    });
    
    //init: add border if it is white#ffffff;
    if (colorString == "#ffffff")
    {
        $(colorPickerName).parent().find(".minicolors-swatch-color").addClass('colorPickerBorder');
    }
}


// -------------------------------- object function --------------------------------------- //
function setupObjectFunctions(i)
{
    /////switch multiple objects - object on events
    var objectPanelName = '#objectPanel' + i;
    $(objectPanelName).on('shown.bs.collapse', function(){
        currentObject = i;
        console.log("current: object - " + currentObject);
    }).on('hidden.bs.collapse', function(){
        currentObject = null;
    })

    /////init checkbox

    //objectOn
    /*object options*/
    /*var checkboxName_showPlane = '#objectPanel' + i + ' #PlaneSelect';
    var showPlaneElem = $(checkboxName_showPlane);
    initCheckbox(showPlane[i], showPlaneElem);

    var checkboxName_showCylinder = '#objectPanel' + i + ' #CylinderSelect';
    var showCylinderElem = $(checkboxName_showCylinder);
    initCheckbox(showCylinder[i], showCylinderElem);

    var checkboxName_showEllipsoid = '#objectPanel' + i + ' #EllipsoidSelect';
    var showEllipsoidElem = $(checkboxName_showEllipsoid);
    initCheckbox(showEllipsoid[i], showEllipsoidElem);

    var checkboxName_showCone = '#objectPanel' + i + ' #ConeSelect';
    var showConeElem = $(checkboxName_showCone);
    initCheckbox(showCone[i], showConeElem);

    var checkboxName_showHyperboloidA = '#objectPanel' + i + ' #Hyperboloid_a_Select';
    var showHyperboloidAElem = $(checkboxName_showHyperboloidA);
    initCheckbox(showHyperboloidA[i], showHyperboloidAElem);

    var checkboxName_showHyperboloidB = '#objectPanel' + i + ' #Hyperboloid_b_Select';
    var showHyperboloidBElem = $(checkboxName_showHyperboloidB);
    initCheckbox(showHyperboloidB[i], showHyperboloidBElem);

    var checkboxName_showEParaboloid = '#objectPanel' + i + ' #EParaboloidSelect';
    var showEParaboloidElem = $(checkboxName_showEParaboloid);
    initCheckbox(showEParaboloid[i], showEParaboloidElem);

    var checkboxName_showHParaboloid = '#objectPanel' + i + ' #HParaboloidSelect';
    var showHParaboloidElem = $(checkboxName_showHParaboloid);
    initCheckbox(showHParaboloid[i], showHParaboloidElem);*/

    var checkboxName_showObject = '#objectPanel' + i + ' #objectSelect';
    var showObjectElem = $(checkboxName_showObject);
    initCheckbox(showObject[i], showObjectElem);

    var checkboxName_showPObject = '#objectPanel' + i + ' #PObjectSelect';
    var showPObjectElem = $(checkboxName_showPObject);
    initCheckbox(showPObject[i], showPObjectElem);

    var checkboxName_showDObject = '#objectPanel' + i + ' #DObjectSelect';
    var showDObjectElem = $(checkboxName_showDObject);
    initCheckbox(showDObject[i], showDObjectElem);

    var checkboxName_showDiffuse = '#objectPanel' + i + ' #diffuseSelect';
    var showDiffuseElem = $(checkboxName_showDiffuse);
    initCheckbox(showDiffuse[i], showDiffuseElem);

    var checkboxName_showSpec = '#objectPanel' + i + ' #specSelect';
    var showSpecElem = $(checkboxName_showSpec);
    initCheckbox(showSpec[i], showSpecElem);

    //objectsel dropdown
    //init

    // var wa;
    // console.log(objectsel[0]);
    // if (objectsel[i] == 1)
    // {
    //     wa = 'Plane ';
    // }else if (objectsel[i] == 2)
    // {
    //     wa = 'Generalized_Cylinder ';
    // }
    // else if (objectsel[i] == 3)
    // {
    //     wa = 'Ellipsoid ';
    // }
    // else if (objectsel[i] == 4)
    // {
    //     wa = 'Cone ';
    // }
    // else if (objectsel[i] == 5)
    // {
    //     wa = 'Hyperboloid1 ';
    // }else if (objectsel[i] == 6)
    // {
    //     wa = 'Hyperboloid2 ';
    // }else if (objectsel[i] == 7)
    // {
    //     wa = 'Elliptic_Paraboloid ';
    // }else if (objectsel[i] == 8)
    // {
    //     wa = 'Hyperbolic_Paraboloid ';
    // }
    // var selstring = wa + '<span class=\"caret\"></span>';
    // $("#objectsel .btn").html(selstring);




    //events
    $(objectPanelNameId + "#objectsel").on("hide.bs.dropdown", function(){
        $(objectPanelNameId + "#objectsel .caret").removeClass("caret-up");
    });
    $(objectPanelNameId + "#objectsel").on("show.bs.dropdown", function(){
        $(objectPanelNameId + "#objectsel .caret").addClass("caret-up");
    });

    var objectPanelNameId = "#objectPanel" + i + " ";
    var objectTypeName = ['Plane', 'Generalized_Cylinder', 'Ellipsoid', 'Cone', 'Hyperboloid1',
        'Hyperboloid2', 'Elliptic_Paraboloid', 'Hyperbolic_Paraboloid'];
    for (var j=0; j < objectTypeName.length; j++){
        if (objectsel[i] == j)
        {
            $(objectPanelNameId + "#objectsel .btn").html(objectTypeName[j] + '<span class=\"caret\"></span>');
        }
    }



    for (var j=0; j < 8; j++) {
        $(objectPanelNameId + "#objectsel_" + j).click((function(e){
            return function() {
                $(objectPanelNameId + "#objectsel .btn").html(objectTypeName[e] + ' <span class="caret"></span>');
                objectsel[i] = e;
                console.log("click", e);
            }
        })(j))
    }

    // var objectPanelNameId = "#objectPanel" + i + " ";
    // // var objectsel_1_name = "#objectsel_1";
    // $(objectPanelNameId + "#objectsel_1").click(function(){
    //     $("#objectsel .btn").html('Plane <span class="caret"></span>');
    //     objectsel[i] = 1;
    // })
    // var objectsel_2_name = "#objectPanel" + i + " #objectsel_2";
    // $(objectPanelNameId + "#objectsel_2").click(function(){
    //     $("#objectsel .btn").html('Generalized_Cylinder <span class="caret"></span>');
    //     objectsel[i] = 2;
    // })
    // var objectsel_3_name = "#objectPanel" + i + " #objectsel_3";
    // $(objectPanelNameId + "#objectsel_3").click(function(){
    //     $("#objectsel .btn").html('Ellipsoid <span class="caret"></span>');
    //     objectsel[i] = 3;
    // })
    // $("#objectsel_4").click(function(){
    //     $("#objectsel .btn").html('Cone <span class="caret"></span>');
    //     objectsel[i] = 4;
    // })
    // $("#objectsel_5").click(function(){
    //     $("#objectsel .btn").html('Hyperboloid1 <span class="caret"></span>');
    //     objectsel[i] = 5;
    // })
    // $("#objectsel_6").click(function(){
    //     $("#objectsel .btn").html('Hyperboloid2 <span class="caret"></span>');
    //     objectsel[i] = 6;
    // })
    // $("#objectsel_7").click(function(){
    //     $("#objectsel .btn").html('Elliptic_Paraboloid <span class="caret"></span>');
    //     objectsel[i] = 7;
    // })
    // $("#objectsel_8").click(function(){
    //     $("#objectsel .btn").html('Hyperbolic_Paraboloid <span class="caret"></span>');
    //     objectsel[i] = 8;
    // })


    //////slider events

    //objectIntensity
    var sliderName_intensity = "#objectPanel" + i + " #object_intensity_slider";
    var textareaName_intensity = "#objectPanel" + i + " #object_intensity_val";
    var objectIntensity_slider = $(sliderName_intensity);
    var objectIntensity_val = $(textareaName_intensity);
    objectIntensity_slider.attr("data-slider-min", 0).attr("data-slider-max", 1).attr("data-slider-step", 0.01).attr("data-slider-value", objectIntensity[i]).attr("data-slider-tooltip","hide").slider({});
    bindSliderValParamIndex (objectIntensity_slider, objectIntensity_val, "objectIntensity", i);

    //spotObjectAngle
    var sliderName_spotObjecta = "#objectPanel" + i + " #spotObjecta_slider";
    var textareaName_spotObjecta = "#objectPanel" + i + " #spotObjecta_val";
    var spotObjecta_slider = $(sliderName_spotObjecta);
    var spotObjecta_val = $(textareaName_spotObjecta);
    spotObjecta_slider.attr("data-slider-min", 0).attr("data-slider-max", 1).attr("data-slider-step", 0.001).attr("data-slider-value", spotObjecta[i]).attr("data-slider-tooltip","hide").slider({});
    bindSliderValParamIndex (spotObjecta_slider, spotObjecta_val, "spotObjecta", i);

    //pointObjectDis
    var sliderName_pObjectDis = "#objectPanel" + i + " #object_dis_slider";
    var textarea_pObjectDis = "#objectPanel" + i + " #object_dis_val";
    var pointLGTdis_slider = $(sliderName_pObjectDis);
    var pointLGTdis_val = $(textarea_pObjectDis);
    pointLGTdis_slider.attr("data-slider-min", 0).attr("data-slider-max", 1).attr("data-slider-step", 0.01).attr("data-slider-value", pointObjectDis[i]).attr("data-slider-tooltip","hide").slider({});
    bindSliderValParamIndex (pointLGTdis_slider, pointLGTdis_val, "pointObjectDis", i);



    // object position
    // object position X
    var sliderName_objectPX = "#objectPanel" + i + " #object_x_slider";
    var textarea_objectPX = "#objectPanel" + i + " #object_x_val";
    var objectPX_slider = $(sliderName_objectPX);
    var objectPX_val = $(textarea_objectPX);
    objectPX_slider.attr("data-slider-min", -10).attr("data-slider-max", 10).attr("data-slider-step", 0.01).attr("data-slider-value", objectX[i]).attr("data-slider-tooltip","hide").slider({});
    bindSliderValParamIndex (objectPX_slider, objectPX_val, "objectX", i);
    // object position Y
    var sliderName_objectPY = "#objectPanel" + i + " #object_y_slider";
    var textarea_objectPY = "#objectPanel" + i + " #object_y_val";
    var objectPY_slider = $(sliderName_objectPY);
    var objectPY_val = $(textarea_objectPY);
    objectPY_slider.attr("data-slider-min", -10).attr("data-slider-max", 10).attr("data-slider-step", 0.01).attr("data-slider-value", objectY[i]).attr("data-slider-tooltip","hide").slider({});
    bindSliderValParamIndex (objectPY_slider, objectPY_val, "objectY", i);
    // object position Z
    var sliderName_objectPZ = "#objectPanel" + i + " #object_z_slider";
    var textarea_objectPZ = "#objectPanel" + i + " #object_z_val";
    var objectPZ_slider = $(sliderName_objectPZ);
    var objectPZ_val = $(textarea_objectPZ);
    objectPZ_slider.attr("data-slider-min", -30).attr("data-slider-max", 30).attr("data-slider-step", 0.01).attr("data-slider-value", objectZ[i]).attr("data-slider-tooltip","hide").slider({});
    bindSliderValParamIndex (objectPZ_slider, objectPZ_val, "objectZ", i);

    var sliderName_ks = "#objectPanel" + i + " #ks_slider";
    var textarea_ks = "#objectPanel" + i + " #ks_val";
    var ks_slider = $(sliderName_ks);
    var ks_val = $(textarea_ks);
    ks_slider.attr("data-slider-min", 0).attr("data-slider-max", 1).attr("data-slider-step", 0.01).attr("data-slider-value", ks[i]).attr("data-slider-tooltip","hide").slider({});
    bindSliderValParamIndex (ks_slider, ks_val, "ks", i);

    var sliderName_IOR = "#objectPanel" + i + " #IOR_slider";
    var textarea_IOR = "#objectPanel" + i + " #IOR_val";
    var IOR_slider = $(sliderName_IOR);
    var IOR_val = $(textarea_IOR);
    IOR_slider.attr("data-slider-min", -1).attr("data-slider-max", 1).attr("data-slider-step", 0.01).attr("data-slider-value", IOR[i]).attr("data-slider-tooltip","hide").slider({});
    bindSliderValParamIndex (IOR_slider, IOR_val, "IOR", i);

    var sliderName_S0 = "#objectPanel" + i + " #S0_slider";
    var textarea_S0 = "#objectPanel" + i + " #S0_val";
    var S0_slider = $(sliderName_S0);
    var S0_val = $(textarea_S0);
    S0_slider.attr("data-slider-min", 0).attr("data-slider-max", 1).attr("data-slider-step", 0.01).attr("data-slider-value", S0[i]).attr("data-slider-tooltip","hide").slider({});
    bindSliderValParamIndex (S0_slider, S0_val, "S0", i);

    var sliderName_S1 = "#objectPanel" + i + " #S1_slider";
    var textarea_S1 = "#objectPanel" + i + " #S1_val";
    var S1_slider = $(sliderName_S1);
    var S1_val = $(textarea_S1);
    S1_slider.attr("data-slider-min", 0).attr("data-slider-max", 1).attr("data-slider-step", 0.01).attr("data-slider-value", S1[i]).attr("data-slider-tooltip","hide").slider({});
    bindSliderValParamIndex (S1_slider, S1_val, "S1", i);

    var sliderName_S2 = "#objectPanel" + i + " #S2_slider";
    var textarea_S2 = "#objectPanel" + i + " #S2_val";
    var S2_slider = $(sliderName_S2);
    var S2_val = $(textarea_S2);
    S2_slider.attr("data-slider-min", 0).attr("data-slider-max", 1).attr("data-slider-step", 0.01).attr("data-slider-value", S2[i]).attr("data-slider-tooltip","hide").slider({});
    bindSliderValParamIndex (S2_slider, S2_val, "S2", i);

    var sliderName_v2x = "#objectPanel" + i + " #v2x_slider";
    var textarea_v2x = "#objectPanel" + i + " #v2x_val";
    var v2x_slider = $(sliderName_v2x);
    var v2x_val = $(textarea_v2x);
    v2x_slider.attr("data-slider-min", 0).attr("data-slider-max", 1).attr("data-slider-step", 0.01).attr("data-slider-value", v2x[i]).attr("data-slider-tooltip","hide").slider({});
    bindSliderValParamIndex (v2x_slider, v2x_val, "v2x", i);

    var sliderName_v2y = "#objectPanel" + i + " #v2y_slider";
    var textarea_v2y = "#objectPanel" + i + " #v2y_val";
    var v2y_slider = $(sliderName_v2y);
    var v2y_val = $(textarea_v2y);
    v2y_slider.attr("data-slider-min", 0).attr("data-slider-max", 1).attr("data-slider-step", 0.01).attr("data-slider-value", v2y[i]).attr("data-slider-tooltip","hide").slider({});
    bindSliderValParamIndex (v2y_slider, v2y_val, "v2y", i);

    var sliderName_v2z = "#objectPanel" + i + " #v2z_slider";
    var textarea_v2z = "#objectPanel" + i + " #v2z_val";
    var v2z_slider = $(sliderName_v2z);
    var v2z_val = $(textarea_v2z);
    v2z_slider.attr("data-slider-min", 0).attr("data-slider-max", 1).attr("data-slider-step", 0.01).attr("data-slider-value", v2z[i]).attr("data-slider-tooltip","hide").slider({});
    bindSliderValParamIndex (v2z_slider, v2z_val, "v2z", i);

    //pointObjectDecay
    var sliderName_pObjectDecay = "#objectPanel" + i + " #object_decay_slider";
    var textarea_pObjectDecay = "#objectPanel" + i + " #object_decay_val";
    var pointLGTdecay_slider = $(sliderName_pObjectDecay);
    var pointLGTdecay_val = $(textarea_pObjectDecay);
    pointLGTdecay_slider.attr("data-slider-min", 0).attr("data-slider-max", 1).attr("data-slider-step", 0.01).attr("data-slider-value", pointObjectDecay[i]).attr("data-slider-tooltip","hide").slider({});
    bindSliderValParamIndex (pointLGTdecay_slider, pointLGTdecay_val, "pointObjectDecay", i);

    ////init colorPicker & add events
    var colorPickerName = "#objectPanel" + i + " .colorPicker";
    var colorString = color2hex(objectColor[i]);
    $(colorPickerName).attr("value", colorString);



    $(colorPickerName).minicolors({
        position: 'bottom right',
        theme: 'bootstrap',
        //defaultValue: colorString,
        change: function(value) {
            if( !value ) return;
            if( typeof console === 'object' ) {
                var rgbObject = $(this).minicolors('rgbObject');
                for (var i = 0; i < objectNum; i++)
                {
                    if (currentObject == i)
                    {
                        objectColor[i][0] =rgbObject.r / 255;
                        objectColor[i][1] =rgbObject.g / 255;
                        objectColor[i][2] =rgbObject.b / 255;
                        setObjectMarkFill(i);//function in addObjects.js
                    }
                }
                //add event: add border if it is white#ffffff;
                var addBorderElem = $(this).parent().find(".minicolors-swatch-color");
                if (value =="#ffffff")
                {
                    addBorderElem.addClass('colorPickerBorder');
                }else{
                    addBorderElem.removeClass('colorPickerBorder');
                }
            }
        },
    });

    //init: add border if it is white#ffffff;
    if (colorString == "#ffffff")
    {
        $(colorPickerName).parent().find(".minicolors-swatch-color").addClass('colorPickerBorder');
    }
}


// ------------------------------------------------ Other functions ---------------------------------------------- //

function initCheckbox(param, elem){
    if (param == 1) {
    elem.prop('checked', true);
    }else {
    elem.prop('checked', false);
    }
}

//for lights/objects
function bindSliderValParamIndex(slider, val, param, index){
	//init textarea
	val.val(window[param][index]);

	//update textarea when in slide
	slider.on("slide", function(slideEvt) {
		window[param][index] = slideEvt.value;	
		val.val(window[param][index]);
	});
	
	//update slider when textarea change
	val.on("change", function(){
		window[param][index] = Number($(this).val());
		slider.slider("destroy").attr("data-slider-value", window[param][index]).attr("data-value", window[param][index]).attr("value", window[param][index]);
		slider.slider({});
		slider.on("slide", function(slideEvt) {
			window[param][index] = slideEvt.value;	
			val.val(window[param][index]);
		});
	});

	//textarea allSelected when on focus;
	val.focus(function() {
    	var $this = $(this);
    	$this.select();

    	// Work around Chrome's little problem
    	$this.mouseup(function() {
        // Prevent further mouseup intervention
        	$this.unbind("mouseup");
        	return false;
    	});
	});

	//textarea restrict only input number
	val.keydown(function(e){onlyNumber(e)});
}

//for others except lights/objects
function bindSliderValParam(slider, val, param){
    //init textarea
    val.val(window[param]);

    //update textarea when in slide
    slider.on("slide", function(slideEvt) {
        window[param] = slideEvt.value;  
        val.val(window[param]);
    });
    
    //update slider when textarea change
    val.on("change", function(){
        window[param] = Number($(this).val());
        slider.slider("destroy").attr("data-slider-value", window[param]).attr("data-value", window[param]).attr("value", window[param]);
        slider.slider({});
        slider.on("slide", function(slideEvt) {
            window[param] = slideEvt.value;  
            val.val(window[param]);
        });
    });

    //textarea allSelected when on focus;
    val.focus(function() {
        var $this = $(this);
        $this.select();

        // Work around Chrome's little problem
        $this.mouseup(function() {
        // Prevent further mouseup intervention
            $this.unbind("mouseup");
            return false;
        });
    });

    //textarea restrict only input number
    val.keydown(function(e){onlyNumber(e)});
}

function onlyNumber(e)
{
	var ctrlDown = e.ctrlKey||e.metaKey; // Mac support
	var code = e.keyCode || e.which;
    // Allow: delete, backspace, enter, leftarrow, rightarrow, "." and "-"s
    if ( ($.inArray(code, [46, 8, 13, 37, 39, 190, 173, 189]) !== -1) ||
         // Allow: Ctrl+A
        (code == 65 && ctrlDown === true) ||
         // Allow: Ctrl+C
        (code == 67 && ctrlDown === true) ||
         // Allow: Ctrl+V
        (code == 86 && ctrlDown === true) ||
         // Allow: Ctrl+X
        (code == 88 && ctrlDown === true) ||
         // Allow: home, end, left, right
        (code >= 35 && code <= 39)) {
             // let it happen, don't do anything
             return;
    };
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
}

// Converts an color array to a hex string
function color2hex(color) {
    var hex = [
        (Math.round(color[0]*255)).toString(16),
        (Math.round(color[1]*255)).toString(16),
        (Math.round(color[2]*255)).toString(16)
    ];
    $.each(hex, function(nr, val) {
        if (val.length === 1) hex[nr] = '0' + val;
    });
    return '#' + hex.join('');
}




