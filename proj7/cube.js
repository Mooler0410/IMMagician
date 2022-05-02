/****************** For SliderBar Parameter ******************/
var mouseFlag = 0;// 0 : moving ; 1: stop

var canvasWidth;
var canvasHeight;

var normalWidth;
var normalHeight;

var currentLight = 0;
var lightNum = 1;

var currentObject = 0;
var objectNum = 2;

var mouseXY = [];
mouseXY[0] = [0.3, -0.3];     //default light
// var mouseXYcamera = [0., -0.];
var mouseXYcamera = [-0.070, -0.376];
var mouseXYview = [-0.125, 0.25];
  
var lightsPosition = 0;
var lightsOnly = 0;
var smoothStep = 0;
var cameraControl = 1;
var viewControl = 0;
var centerView = 1;

var cameraDis;
cameraDis = 10.0;

var cameraTilt;
cameraTilt = 0.0;

var lightColor = [];
lightColor[0] =[1.0, 1.0 ,1.0];


var lightIntensity = [];
lightIntensity[0] = 1.0;

var pointLightDis = [];
pointLightDis[0] = 0.5;

var spotLighta = [];
spotLighta[0] = 0.5;

var pointLightDecay = [];
pointLightDecay[0] = 0.1;

var randomArea = [];
randomArea[0] = 1;

var showDiffuse = [];
showDiffuse[0] = 1;

var showSpec = [];   
showSpec[0] = 1;

var showDLight = [];
showDLight[0] = 0;

var showPLight = [];
showPLight[0] = 1;

var showALight = [];
showALight[0] = 0;

var showObject = [];
showObject[0] = 1;

//object parameters
/*var showPlane = [];
showPlane[0] = 0;

var showCylinder = [];
showCylinder[0] = 0;

var showEllipsoid = [];
showEllipsoid[0] = 0;

var showCone = [];
showCone[0] = 0;

var showHyperboloidA = [];
showHyperboloidA[0] = 0;

var showHyperboloidB = [];
showHyperboloidB[0] = 0;

var showEParaboloid = [];
showEParaboloid[0] = 0;

var showHParaboloid = [];
showHParaboloid[0] = 0;*/


var objectColor = [];
objectColor[0] =[0.0, 1.0 ,0.0];


var objectIntensity = [];
objectIntensity[0] = 1.0;

// object position parameters
var objectX = [];
objectX[0] = 1.5;

var objectY = [];
objectY[0] = 2.0;

var objectZ = [];
objectZ[0] = 0.7;

var ks = [];
ks[0] = 0.5;

var IOR = [];
IOR[0] = 0.2;

var S0 = [];
S0[0] = 0.3;

var S1 = [];
S1[0] = 0.3;

var S2 = [];
S2[0] = 0.3;

var v2x = [];
v2x[0] = 0.;

var v2y = [];
v2y[0] = 0.;

var v2z = [];
v2z[0] = 1.;

var pointObjectDis = [];
pointObjectDis[0] = 0.5;

var spotObjecta = [];
spotObjecta[0] = 0.5;

var pointObjectDecay = [];
pointObjectDecay[0] = 0.1;

var showDObject = [];
showDObject[0] = 0;

var showPObject = [];
showPObject[0] = 1;

var styleBright,
    styleDark;

var alphaR;
var alphaG;
var alphaB;

var logIOR5;//[-1, 1]
var BGdis;

var FGdis;

var reflMap;//1: plane; 2:hemisphere
var objectsel = [];
objectsel[0] = 0;
objectsel[1] = 2;
var FGshiftX0;
var FGshiftY;
var FGscaleX;
var FGscaleY;

var fresnelIntensity;
var fresnelB; //cos = 0.95
var fresnelC; //cos = 0.7
var checkFresnel;
var realFresnel;
var transposeImage = 0;

showObject[1] = 1;
objectX[1] = 1.5;
objectY[1] = 2.0;
objectZ[1] = 0.7;
ks[1] = 0.5;
IOR[1] = 0.;
S0[1] = 0.3;
S1[1] = 0.3;
S2[1] = 0.3;
v2x[1] = 0.;
v2y[1] = 0.;
v2z[1] = 1.;
objectColor[1] =[0.0, 1.0 ,0.0];
objectsel[1] = 2;

showObject[2] = 1;
objectX[2] = 1.5;
objectY[2] = 2.0;
objectZ[2] = 0.7;
ks[2] = 0.5;
IOR[2] = 0.;
S0[2] = 0.3;
S1[2] = 0.3;
S2[2] = 0.3;
v2x[2] = 0.;
v2y[2] = 0.;
v2z[2] = 1.;
objectColor[2] =[0.0, 1.0 ,0.0];
objectsel[2] = 2;

showObject[3] = 1;
objectX[3] = 1.5;
objectY[3] = 2.0;
objectZ[3] = 0.7;
ks[3] = 0.5;
IOR[3] = 0.;
S0[3] = 0.3;
S1[3] = 0.3;
S2[3] = 0.3;
v2x[3] = 0.;
v2y[3] = 0.;
v2z[3] = 1.;
objectColor[3] =[0.0, 1.0 ,0.0];
objectsel[3] = 4;

function initParameters(){
    lightColor[0] =[1.0, 1.0, 1.0];
    //baseColor = [0.0, 0.1, 0.0];
    lightIntensity[0] = 1.0;
    // spotLighta[0] = 0.5;
    pointLightDis[0] = 0.5;
    pointLightDecay[0] = 0.0;
    showDiffuse[0] = 1;
    showSpec[0] = 1;
    showDLight[0] = 0;
    showPLight[0] = 1;
    //object parameters
/*    showPlane[0] = 0;
    showCylinder[0] = 0;
    showEllipsoid[0] = 0;
    showCone[0] = 0;
    showHyperboloidA[0] = 0;
    showHyperboloidB[0] = 0;
    showEParaboloid[0] = 0;
    showHParaboloid[0] = 0;*/

    // object position parameters
    showObject[0] = 1;
    objectX[0] = 1.5;
    objectY[0] = 2.0;
    objectZ[0] = 0.;
    ks[0] = 0.5;
    IOR[0] = 0.2;
    S0[0] = 20;
    S1[0] = 20;
    S2[0] = 0.3;
    v2x[0] = 0.;
    v2y[0] = 0.;
    v2z[0] = 1.;
    objectColor[0] =[0.0, 1.0 ,0.0];

    showObject[1] = 1;
    objectX[1] = 1.5;
    objectY[1] = 2.0;
    objectZ[1] = 0.3;
    ks[1] = 0.5;
    IOR[1] = 0.;
    S0[1] = 0.3;
    S1[1] = 0.3;
    S2[1] = 0.3;
    v2x[1] = 0.;
    v2y[1] = 0.;
    v2z[1] = 1.;
    objectColor[1] =[0.0, 1.0 ,0.0];
    objectsel[1] = 2;

    showObject[2] = 1;
    objectX[2] = 1.;
    objectY[2] = 3.;
    objectZ[2] = 0.5;
    ks[2] = 0.5;
    IOR[2] = 0.;
    S0[2] = 0.5;
    S1[2] = 0.5;
    S2[2] = 0.5;
    v2x[2] = 0.;
    v2y[2] = 0.;
    v2z[2] = 1.;
    objectColor[2] =[0.0, 1.0 ,0.0];
    objectsel[2] = 2;

    showObject[3] = 1;
    objectX[3] = -0.5;
    objectY[3] = 0.5;
    objectZ[3] = 0.7;
    ks[3] = 0.5;
    IOR[3] = 0.;
    S0[3] = 0.3;
    S1[3] = 0.3;
    S2[3] = 0.3;
    v2x[3] = 0.;
    v2y[3] = 0.;
    v2z[3] = 1.;
    objectColor[3] =[0.0, 1.0 ,0.0];
    objectsel[3] = 4;


    //style section parameters
    styleBright = 0.75;
    styleDark = 0.95;

    //highlight parameters
    //highlightA = 0.5;
    //highlightB = 0.25;

    //Diffuse Alpha parameters
    alphaR = 0.6;
    alphaG = 0.5;
    alphaB = 0.5;
    
    //refraction parameters
    logIOR = 0.25;//[-1, 1]
    BGdis = 0.6;
    
    //reflection parameters
    FGdis = 0.2;
    reflMap = 1;//1: plane; 2:hemisphere
    //objectsel = 3;//ellipsoid
    FGshiftX = 0;
    FGshiftY = 0;
    FGscaleX = 0.5;
    FGscaleY = 0.5;
    
    //Fresnel parameters
    fresnelIntensity = 0;
    fresnelB = 0.3; //cos = 0.95
    fresnelC = 0.6; //cos = 0.7
    checkFresnel = 0;
    realFresnel = 0;

    // Height Light parameters
    //hLightDistance = 1.0;
    //hLightIntensity = 1.0;
    //hLightBack = 0.05;
    //useEnvMap = 0;
}


//Locs
var objectNumLoc;

var canvasWidthLoc;
var canvasHeightLoc;

var normalWidthLoc;
var normalHeightLoc;

var currentLightLoc;
var lightNumLoc;
var mouseLoc;
var mouseXYcameraLoc;
var mouseXYviewLoc;

var lightsOnlyLoc;
var smoothStepLoc;
var lightColorLoc;
var lightIntensityLoc;
var pointLightDisLoc;
var pointLightDecayLoc;
var spotLightaLoc;
var cameraDisLoc;
var cameraTiltLoc;

var centerViewLoc;

var showDiffuseLoc;
var showSpecLoc;

var showDLightLoc;
var showPLightLoc;
var showALightLoc;
var randomAreaLoc;

//object parameters
/*var showPlaneLoc;
var showCylinderLoc;
var showEllipsoidLoc;
var showConeLoc;
var showHyperboloidALoc;
var showHyperboloidBLoc;
var showEParaboloidLoc;
var showHParaboloidLoc;*/

// object position Loc

var showObjectLoc;
var objectXLoc;
var objectpiLoc;
var v2Loc;
var objectpi=[];
var v2=[];
var objectColorLoc;
var objectYLoc;
var objectZLoc;
var ksLoc;
var IORLoc;
var S0Loc;
var S1Loc;
var S2Loc;
var v2xLoc;
var v2yLoc;
var v2zLoc;

var styleBrightLoc, styleDarkLoc;
var alphaRLoc, alphaGLoc, alphaBLoc;
var logIORLoc, BGdisLoc;
var FGdisLoc;
var reflMapLoc;
var objectselLoc;
var FGshiftXLoc, FGshiftYLoc, FGscaleXLoc, FGscaleXLoc;
var transposeImageLoc;

var fresnelIntensityLoc;
var fresnelBLoc, fresnelCLoc;
var checkFresnelLoc;
var realFresnelLoc;


/****************** For Basic shader ******************/

var gl;
var points = [];
var colors = [];
var normals = [];
var texCoords = [];

var numVertices = 36;

var color0Loc;
var color1Loc;

var darkTexture, darkImage;
var lightTexture, lightImage;
var normalTexture, normalImage;
var reflectTexture, reflectImage;
var refractTexture, refractImage;
var alphaTexture, alphaImage;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    
    var context = canvas.getContext('2d');
    

    /***************/


    colorCube();
    /*console.log(points);
    console.log(texCoords);
    console.log(colors);
    console.log(canvas.width, canvas.height)*/

    /////////////////  Configure WebGL  ////////////////////////

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.05, 0.05, 0.05, 1.0 );

    gl.enable( gl.DEPTH_TEST );
    
    //////////////////  Load shaders and initialize attribute buffers  /////////////////
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    //Vertex colors
    // Load the data into the GPU   
    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );



    // Vertex positions
    // Load the data into the GPU
    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW )

    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 ); 
    gl.enableVertexAttribArray( vPosition );


    // Vertex normals
    // Load the data into the GPU
    var nBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(normals), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer
    var vNormal = gl.getAttribLocation( program, "vNormal" );
    gl.vertexAttribPointer( vNormal, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vNormal );


    // Vertex texture coordinates
    // Load the data into the GPU
    var tBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(texCoords), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer
    var vTex = gl.getAttribLocation( program, "texcoord");
    gl.vertexAttribPointer( vTex, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray( vTex );


    initTextures();

    normalImage.src = image3.src;
    requestCORSIfNotSameOrigin(normalImage, normalImage.src);
    console.log(normalImage.src);
  
  
    lightImage.src = image2.src;
    requestCORSIfNotSameOrigin(lightImage, lightImage.src);
    console.log(lightImage.src);
  
  
    darkImage.src = image1.src;
    requestCORSIfNotSameOrigin(darkImage, darkImage.src);
    console.log(this.darkImage.src);
  
  
    refractImage.src = image5.src;
    requestCORSIfNotSameOrigin(refractImage, refractImage.src);
    console.log(this.refractImage.src);
  
  
    reflectImage.src = image4.src;
    requestCORSIfNotSameOrigin(reflectImage, reflectImage.src);
    console.log(this.refractImage.src);
  
  
    alphaImage.src = image6.src;
    requestCORSIfNotSameOrigin(alphaImage, alphaImage.src);
    console.log(this.alphaImage.src);
  
    normalImage.onload = function() { handleTextureLoaded(normalImage, normalTexture); }

    lightImage.onload = function() { handleTextureLoaded(lightImage, lightTexture); }

    darkImage.onload = function() { handleTextureLoaded(darkImage, darkTexture); }

    refractImage.onload = function() { handleTextureLoaded(refractImage, refractTexture); }

    reflectImage.onload = function() { handleTextureLoaded(reflectImage, reflectTexture); }

    alphaImage.onload = function() { handleTextureLoaded(alphaImage, alphaTexture); }


    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, normalTexture);
    gl.uniform1i(gl.getUniformLocation(program, "uSamplerNormal"), 0);

    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, lightTexture);
    gl.uniform1i(gl.getUniformLocation(program, "uSamplerColor1"), 1);

    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, darkTexture);
    gl.uniform1i(gl.getUniformLocation(program, "uSamplerColor0"), 2);

    gl.activeTexture(gl.TEXTURE3);
    gl.bindTexture(gl.TEXTURE_2D, refractTexture);
    gl.uniform1i(gl.getUniformLocation(program, "uSamplerBackground"), 3);

    gl.activeTexture(gl.TEXTURE4); 
    gl.bindTexture(gl.TEXTURE_2D, reflectTexture);
    gl.uniform1i(gl.getUniformLocation(program, "uSamplerForeground"), 4);

    gl.activeTexture(gl.TEXTURE5); 
    gl.bindTexture(gl.TEXTURE_2D, alphaTexture);
    gl.uniform1i(gl.getUniformLocation(program, "uSamplerAlpha"), 5);


    objectNumLoc = gl.getUniformLocation(program, "objectNum");

    canvasWidthLoc = gl.getUniformLocation(program, "canvasWidth");
    canvasHeightLoc = gl.getUniformLocation(program, "canvasHeight");

    normalWidthLoc = gl.getUniformLocation(program, "normalWidth");
    normalHeightLoc = gl.getUniformLocation(program, "normalHeight");

    currentLightLoc = gl.getUniformLocation (program, "currentLight");
    lightNumLoc = gl.getUniformLocation (program, "lightNum");
    mouseLoc = gl.getUniformLocation( program, "mouseXY");
    mouseXYcameraLoc = gl.getUniformLocation( program, "mouseXYcamera");
    mouseXYviewLoc = gl.getUniformLocation( program, "mouseXYview");
    
    lightsOnlyLoc = gl.getUniformLocation (program, "lightsOnly");
    smoothStepLoc = gl.getUniformLocation (program, "smoothStep");

    
    lightColorLoc = gl.getUniformLocation (program, "lightColor");
    lightIntensityLoc = gl.getUniformLocation (program, "lightIntensity");
    showDiffuseLoc = gl.getUniformLocation( program, "showDiffuse");
    showSpecLoc = gl.getUniformLocation( program, "showSpec");
    pointLightDisLoc = gl.getUniformLocation( program, "pointLightDis");
    pointLightDecayLoc = gl.getUniformLocation( program, "pointLightDecay");
    spotLightaLoc = gl.getUniformLocation (program, "spotLighta");
  
    showDLightLoc = gl.getUniformLocation( program, "showDLight");
    showPLightLoc = gl.getUniformLocation( program, "showPLight");
    showALightLoc = gl.getUniformLocation( program, "showALight");
    randomAreaLoc = gl.getUniformLocation( program, "randomArea");

    //object
/*    showPlaneLoc = gl.getUniformLocation( program, "showPlane");
    showCylinderLoc = gl.getUniformLocation( program, "showCylinder");
    showEllipsoidLoc = gl.getUniformLocation( program, "showEllipsoid");
    showConeLoc = gl.getUniformLocation( program, "showCone");
    showHyperboloidALoc = gl.getUniformLocation( program, "showHyperboloidA");
    showHyperboloidBLoc = gl.getUniformLocation( program, "showHyperboloidB");
    showEParaboloidLoc = gl.getUniformLocation( program, "showEParaboloid");
    showHParaboloidLoc = gl.getUniformLocation( program, "showHParaboloid");*/

    // object location
    showObjectLoc = gl.getUniformLocation( program, "showObject");
    objectXLoc = gl.getUniformLocation( program, "objectX");
    objectYLoc = gl.getUniformLocation( program, "objectY");
    objectZLoc = gl.getUniformLocation( program, "objectZ");
    objectpiLoc = gl.getUniformLocation( program, "quadrics_pi");
    v2Loc = gl.getUniformLocation( program, "v2");
    objectColorLoc = gl.getUniformLocation( program, "quadrics_color");
    S0Loc = gl.getUniformLocation( program, "s0");
    ksLoc = gl.getUniformLocation( program, "object_ks");
    IORLoc = gl.getUniformLocation( program, "IOR");
    S1Loc = gl.getUniformLocation( program, "s1");
    S2Loc = gl.getUniformLocation( program, "s2");
    v2xLoc = gl.getUniformLocation( program, "v2x");
    v2yLoc = gl.getUniformLocation( program, "v2y");
    v2zLoc = gl.getUniformLocation( program, "v2z");

    cameraDisLoc = gl.getUniformLocation( program, "cameraDis");
    cameraTiltLoc = gl.getUniformLocation( program, "cameraTilt");
    centerViewLoc = gl.getUniformLocation( program, "centerView");
            

    styleBrightLoc = gl.getUniformLocation( program, "styleBright");
    styleDarkLoc = gl.getUniformLocation( program, "styleDark");
    alphaRLoc = gl.getUniformLocation( program, "alphaR");
    alphaGLoc = gl.getUniformLocation( program, "alphaG");
    alphaBLoc = gl.getUniformLocation( program, "alphaB");
    logIORLoc = gl.getUniformLocation( program, "logIOR");
    BGdisLoc = gl.getUniformLocation( program, "BGdis");
    FGdisLoc = gl.getUniformLocation( program, "FGdis");
    reflMapLoc = gl.getUniformLocation ( program, "reflMap");
    objectselLoc = gl.getUniformLocation ( program, "quadrics_type");
    FGshiftXLoc = gl.getUniformLocation( program, "FGshiftX");
    FGshiftYLoc = gl.getUniformLocation( program, "FGshiftY");
    FGscaleXLoc = gl.getUniformLocation( program, "FGscaleX");
    FGscaleYLoc = gl.getUniformLocation( program, "FGscaleY");
    transposeImageLoc = gl.getUniformLocation (program, "transposeImage")

    fresnelIntensityLoc = gl.getUniformLocation ( program, "fresnelIntensity");
    fresnelBLoc = gl.getUniformLocation( program, "fresnelB");
    fresnelCLoc = gl.getUniformLocation( program, "fresnelC");
    checkFresnelLoc = gl.getUniformLocation( program, "checkFresnel");
    realFresnelLoc = gl.getUniformLocation( program, "realFresnel")

    render();
};

function initTextures() {
    

    normalTexture = gl.createTexture();
    normalImage = new Image();
    
    lightTexture = gl.createTexture();
    lightImage = new Image();
    
    darkTexture = gl.createTexture();
    darkImage = new Image();
    
    refractTexture = gl.createTexture();
    refractImage = new Image();
    
    reflectTexture = gl.createTexture();
    reflectImage = new Image();
    
    alphaTexture = gl.createTexture();
    alphaImage = new Image();
    
    

}

function handleTextureLoaded(image, texture) {
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.generateMipmap(gl.TEXTURE_2D);
    //gl.bindTexture(gl.TEXTURE_2D, 0);
    
}


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

    var lightsOnlyElem = $ ('#lightsOnlySelect:checked');
    lightsOnly = (lightsOnlyElem.val())?1:0;

    var smoothStepElem = $ ('#smoothStepSelect:checked');
    smoothStep = (smoothStepElem.val())?1:0;

    var cameraElem = $ ('#cameraSelect:checked');
    cameraControl = (cameraElem.val())?1:0;

    var viewElem = $ ('#viewSelect:checked');
    viewControl = (viewElem.val())?1:0;

    var centerViewElem = $ ('#centerViewSelect:checked');
    centerView = (centerViewElem.val())?1:0;

    var checkFresnelElem = $('#checkFresnelSelect:checked');
    checkFresnel = (checkFresnelElem.val())?1:0;

    var realFresnelElem = $('#realFresnelSelect:checked');
    realFresnel = (realFresnelElem.val())?1:0;

    var trasposeImageElem = $ ('#transposeImageSelect:checked');
    transposeImage = (trasposeImageElem.val())?1:0;


    for (var i = 0; i < lightNum ; i++)
    {
        var checkboxName_showPLight = '#lightPanel' + i + ' #PLightSelect:checked';
        var showPLightElem = $(checkboxName_showPLight);
        showPLight[i] = (showPLightElem.val())?1:0;

        var checkboxName_showALight = '#lightPanel' + i + ' #ALightSelect:checked';
        var showALightElem = $(checkboxName_showALight);
        showALight[i] = (showALightElem.val())?1:0;

        var checkboxName_randomAreaSelect = '#lightPanel' + i + ' #randomAreaSelect:checked';
        var randomAreaSelectElem = $(checkboxName_randomAreaSelect);
        randomArea[i] = (randomAreaSelectElem.val())?1:0;

        var checkboxName_showDLight = '#lightPanel' + i + ' #DLightSelect:checked';
        var showDLightElem = $(checkboxName_showDLight);
        showDLight[i] = (showDLightElem.val())?1:0;
      
        var checkboxName_showDiffuse = '#lightPanel' + i + ' #diffuseSelect:checked';
        var showDiffuseElem = $(checkboxName_showDiffuse);
        showDiffuse[i] = (showDiffuseElem.val())?1:0;
        
        var checkboxName_showSpec = '#lightPanel' + i + ' #specSelect:checked';
        var showSpecElem = $(checkboxName_showSpec);
        showSpec[i] = (showSpecElem.val())?1:0;
        
    }
    for (var i=0; i < objectNum ;  i++){
        var checkboxName_showObject = '#objectPanel' + i + ' #objectSelect:checked';
        var showObjectElem = $(checkboxName_showObject);
        showObject[i] = (showObjectElem.val())?1:0;
    }
    // console.log(showObject)
    // console.log(showALight);
    //object
/*    for (var i = 0; i < objectNum; i++)
    {
        var checkboxName_showPlane = '#objectPanel' + i + ' #PlaneSelect:checked';
        var showPlaneElem = $(checkboxName_showPlane);
        showPlane[i] = (showPlaneElem.val())?1:0;

        var checkboxName_showCylinder = '#objectPanel' + i + ' #CylinderSelect:checked';
        var showCylinderElem = $(checkboxName_showCylinder);
        showCylinder[i] = (showCylinderElem.val())?1:0;

        var checkboxName_showEllipsoid = '#objectPanel' + i + ' #EllipsoidSelect:checked';
        var showEllipsoidElem = $(checkboxName_showEllipsoid);
        showEllipsoid[i] = (showEllipsoidElem.val())?1:0;

        var checkboxName_showCone = '#objectPanel' + i + ' #ConeSelect:checked';
        var showConeElem = $(checkboxName_showCone);
        showCone[i] = (showConeElem.val())?1:0;

        var checkboxName_showHyperboloidA = '#objectPanel' + i + ' #Hyperboloid_a_Select:checked';
        var showHyperboloidAElem = $(checkboxName_showHyperboloidA);
        showHyperboloidA[i] = (showHyperboloidAElem.val())?1:0;

        var checkboxName_showHyperboloidB = '#objectPanel' + i + ' #Hyperboloid_b_Select:checked';
        var showHyperboloidBElem = $(checkboxName_showHyperboloidB);
        showHyperboloidB[i] = (showHyperboloidBElem.val())?1:0;

        var checkboxName_showEParaboloid = '#objectPanel' + i + ' #EParaboloidSelect:checked';
        var showEParaboloidElem = $(checkboxName_showEParaboloid);
        showEParaboloid[i] = (showEParaboloidElem.val())?1:0;

        var checkboxName_showHParaboloid = '#objectPanel' + i + ' #HParaboloidSelect:checked';
        var showHParaboloidElem = $(checkboxName_showHParaboloid);
        showHParaboloid[i] = (showHParaboloidElem.val())?1:0;
    }*/

    gl.uniform1f(objectNumLoc, objectNum);

    gl.uniform1f(canvasWidthLoc, canvasWidth);
    gl.uniform1f(canvasHeightLoc, canvasHeight);

    gl.uniform1f(normalWidthLoc, normalWidth);
    gl.uniform1f(normalHeightLoc, normalHeight);
    
    gl.uniform1i(currentLightLoc, currentLight);
    gl.uniform1f(lightNumLoc, lightNum);

    gl.uniform2fv(mouseLoc, flatten(mouseXY));//use flatten() to extract data from JS Array, send it to WebGL functions
    gl.uniform2fv(mouseXYcameraLoc, mouseXYcamera);
    gl.uniform2fv(mouseXYviewLoc, mouseXYview);

    gl.uniform1i(lightsOnlyLoc, lightsOnly);
    gl.uniform1i(smoothStepLoc, smoothStep);
    gl.uniform3fv(lightColorLoc, flatten(lightColor));
    gl.uniform1fv(lightIntensityLoc, lightIntensity);
    gl.uniform1fv(spotLightaLoc, spotLighta);
    
    gl.uniform1iv(showDiffuseLoc, showDiffuse);
    gl.uniform1iv(showSpecLoc, showSpec);
    gl.uniform1fv(pointLightDisLoc, pointLightDis);
    gl.uniform1fv(pointLightDecayLoc, pointLightDecay);
    
    gl.uniform1iv(showDLightLoc, showDLight);
    gl.uniform1iv(showPLightLoc, showPLight);
    gl.uniform1iv(showALightLoc, showALight);
    gl.uniform1iv(randomAreaLoc, randomArea);

    // object
/*    gl.uniform1iv(showPlaneLoc, showPlane);
    gl.uniform1iv(showCylinderLoc, showCylinder);
    gl.uniform1iv(showEllipsoidLoc, showEllipsoid);
    gl.uniform1iv(showConeLoc, showCone);
    gl.uniform1iv(showHyperboloidALoc, showHyperboloidA);
    gl.uniform1iv(showHyperboloidBLoc, showHyperboloidB);
    gl.uniform1iv(showEParaboloidLoc, showEParaboloid);
    gl.uniform1iv(showHParaboloidLoc, showHParaboloid);*/

    // object position
    gl.uniform1iv(showObjectLoc, showObject);
    for (var i=0; i < objectNum; i++){
        objectpi[i]=[objectX[i],objectY[i],objectZ[i]];
        v2[i]=[v2x[i],v2y[i],v2z[i]];
    }
    // console.log(lightNum);
    // objectpi[0]=[objectX[0],objectY[0],objectZ[0]];
    // v2[0]=[v2x[0],v2y[0],v2z[0]];
    // objectpi[1]=[objectX[1],objectY[1],objectZ[1]];
    // v2[1]=[v2x[1],v2y[1],v2z[1]];
    // objectpi[2]=[objectX[2],objectY[2],objectZ[2]];
    // v2[2]=[v2x[2],v2y[2],v2z[2]];
    // objectpi[3]=[objectX[3],objectY[3],objectZ[3]];
    // v2[3]=[v2x[3],v2y[3],v2z[3]];
    // objectpi[4]=[objectX[4],objectY[4],objectZ[4]];
    // v2[4]=[v2x[4],v2y[4],v2z[4]];
    // objectpi[5]=[objectX[5],objectY[5],objectZ[5]];
    // v2[5]=[v2x[5],v2y[5],v2z[5]];
    // objectpi[1]=[2.0,1.5,0.3];
    // v2[1]=[0.,0.,1.];
 /*   objectpi=[objectX,objectY,objectZ];
    v2=[v2x,v2y,v2z];*/
    // console.log(objectX);
    // console.log('objectpi', objectpi);
    // console.log('v2', v2);
    gl.uniform1fv(objectXLoc, objectX);
    gl.uniform3fv(v2Loc, flatten(v2));
    gl.uniform3fv(objectpiLoc, flatten(objectpi));
    gl.uniform1fv(objectZLoc, objectZ);
    gl.uniform1fv(objectYLoc, objectY);
    gl.uniform3fv(objectColorLoc, flatten(objectColor));
/*    console.log(flatten(objectColor))*/
    gl.uniform1fv(ksLoc, ks);
    gl.uniform1fv(IORLoc, IOR);
    gl.uniform1fv(S0Loc, S0);
    gl.uniform1fv(S1Loc, S1);
    gl.uniform1fv(S2Loc, S2);
    gl.uniform1fv(v2xLoc, v2x);
    gl.uniform1fv(v2yLoc, v2y);
    gl.uniform1fv(v2zLoc, v2z);
    
    gl.uniform1f(cameraDisLoc, cameraDis);
    gl.uniform1f(cameraTiltLoc, cameraTilt);
    gl.uniform1i(centerViewLoc, centerView);
    
    gl.uniform1f(styleBrightLoc, styleBright);
    gl.uniform1f(styleDarkLoc, styleDark);
    gl.uniform1f(alphaRLoc, alphaR);
    gl.uniform1f(alphaGLoc, alphaG);
    gl.uniform1f(alphaBLoc, alphaB);
    
    gl.uniform1f(logIORLoc, logIOR);
    gl.uniform1f(BGdisLoc, BGdis);
    gl.uniform1f(FGdisLoc, FGdis);
    gl.uniform1i(reflMapLoc, reflMap);
    // console.log(objectsel)
    gl.uniform1iv(objectselLoc, objectsel);
    gl.uniform1f(FGshiftXLoc, FGshiftX);
    gl.uniform1f(FGshiftYLoc, FGshiftY);
    gl.uniform1f(FGscaleXLoc, FGscaleX);
    gl.uniform1f(FGscaleYLoc, FGscaleY);
    gl.uniform1i(transposeImageLoc, transposeImage);

    gl.uniform1f(fresnelIntensityLoc, fresnelIntensity);
    gl.uniform1f(fresnelBLoc, fresnelB);
    gl.uniform1f(fresnelCLoc, fresnelC);
    gl.uniform1i(checkFresnelLoc, checkFresnel);
    gl.uniform1i(realFresnelLoc, realFresnel);

    gl.drawArrays( gl.TRIANGLES, 0, numVertices );


    requestAnimFrame(render);
}



function quad(a, b, c, d) {

    var vertices = [
        vec4(-1.0, -1.0, 1.0, 1.0),
        vec4(-1.0, 1.0, 1.0, 1.0),
        vec4(1.0, 1.0, 1.0, 1.0),
        vec4(1.0, -1.0, 1.0, 1.0),
        vec4(-1.0, -1.0, -1.0, 1.0),
        vec4(-1.0, 1.0, -1.0, 1.0),
        vec4(1.0, 1.0, -1.0, 1.0),
        vec4(1.0, -1.0, -1.0, 1.0)
        ];
    // var vertices = [
    //     vec4(-0.3, -0.3, 0.4, 1.0),
    //     vec4(-0.2, 0.5, 0.4, 1.0),
    //     vec4(0.5, 0.5, 0.4, 1.0),
    //     vec4(0.5, -0.2, 0.4, 1.0),
    //     vec4(-0.3, -0.3, -0.3, 1.0),
    //     vec4(-0.3, 0.4, -0.3, 1.0),
    //     vec4(0.4, 0.4, -0.3, 1.0),
    //     vec4(0.4, -0.3, -0.3, 1.0)
    // ];

    var vertexColors = [
        [0.0, 0.0, 0.0, 1.0],
        [1.0, 0.0, 0.0, 1.0],
        [1.0, 1.0, 0.0, 1.0],
        [0.0, 1.0, 0.0, 1.0],
        [0.5, 0.5, 1.0, 1.0], // we can see this face
        [1.0, 0.0, 1.0, 1.0],
        [0.0, 1.0, 1.0, 1.0],
        [1.0, 1.0, 1.0, 1.0]
        ];

    var faceNormal = cross(subtract(vertices[a],vertices[b]), subtract(vertices[c],vertices[b]));

    var vertexTexCoords = [
        vec2(0.0, 0.0),
        vec2(1.0, 0.0),
        vec2(1.0, 1.0),
        vec2(0.0, 1.0)
    ];

    // the order is corresponding to the points push order
    texCoords.push(vertexTexCoords[0] );
    texCoords.push(vertexTexCoords[3] );
    texCoords.push(vertexTexCoords[2] );
    texCoords.push(vertexTexCoords[0] );
    texCoords.push(vertexTexCoords[2] );
    texCoords.push(vertexTexCoords[1] );

    var indices = [a, b, c, a, c, d];
    for(var i = 0; i < indices.length; ++i) {
        points.push(vertices[indices[i]] );

        // for vertex colors use
        // colors.push(vertexColors[indices[i]] );

        // for solid colored faces use
        colors.push(vertexColors[a] );

        normals.push(faceNormal);
    }
}

function colorCube() {
    quad(1, 0, 3, 2);
    quad(2, 3, 7, 6);
    quad(3, 0, 4, 7);
    quad(6, 5, 1, 2);
    quad(4, 5, 6, 7);
    quad(5, 4, 0, 1);
}
function requestCORSIfNotSameOrigin(img, url) {
    if ((new URL(url)).origin !== window.location.origin) {
      img.crossOrigin = "";
    }
  }
