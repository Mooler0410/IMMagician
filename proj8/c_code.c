
        #define max_lights 14

        precision mediump float;

        varying vec2 f_texcoord;
        varying vec3 fNormal; //(0,0,1)

        varying float lightN;

        varying vec3 pLight[max_lights];
        float lightshadow[max_lights];

        varying vec2 mouseXYcopy;

        uniform sampler2D uSamplerColor0, uSamplerColor1, uSamplerNormal, uSamplerForeground, uSamplerBackground, uSamplerAlpha;

        uniform int currentLight;

        uniform bool lightsOnly;

        uniform vec3 lightColor[max_lights];
        uniform float lightIntensity[max_lights];
        uniform float pointLightDecay[max_lights];

        uniform bool showDiffuse[max_lights];
        uniform bool showSpec[max_lights];

        uniform bool showVersion[max_lights];
        uniform bool showDirectional[max_lights];
        uniform bool showPointLight[max_lights];
        uniform bool showSpotLight[max_lights];

        uniform float styleBright, styleDark;
        uniform float alphaR, alphaG, alphaB, reflection_degree;
        uniform float logIOR, BGdis;

        uniform float FGdis;

        uniform int reflMap;// 1: plane, 2:hemisphere
        uniform float FGshiftX;
        uniform float FGshiftY;
        uniform float FGscaleX;
        uniform float FGscaleY;

        uniform float dayTime;
        uniform float cameraDistance;
        uniform float cameraX;
        uniform float cameraY;
        uniform float cameraZ;
        uniform float viewX;
        uniform float viewY;
        uniform float viewZ;

        uniform float fresnelIntensity;
        uniform float fresnelB;
        uniform float fresnelC;
        uniform bool checkFresnel;
        uniform bool checkSoft;
        uniform bool realVersion;
        uniform bool directionalLight;
        uniform bool pointLight;

        vec4 normal()
        {
            //Generate real normal direction from a rgb map.
            vec4 normalMap = texture2D(uSamplerNormal, vec2(f_texcoord.s, f_texcoord.t) );
            vec3 normalDisplace = normalMap.rgb;
            normalDisplace = 2.0*normalDisplace - 1.0;
            normalDisplace = normalize(normalDisplace);
            return vec4(normalize(fNormal + normalDisplace), normalMap.a);
        }
        vec4 diffuse(vec3 n, vec3 currentP){
            vec4 color = vec4(0,0,0,1);
            float lightWeight = 0.0;
        
            for (int i = 0; i < max_lights; i++){
                if (float(i)< float(lightN)){   
                    vec3 vLight = normalize( pLight[i] - currentP);
                    float cosTheta = ( dot(n, vLight) + 1.0 )/2.0;
                    float t = (cosTheta - styleDark) / (styleBright - styleDark);
                    if (t>1.0) {t=1.0;} 
                    if (t<0.0) {t=0.0;}
        
                    if (checkSoft){t = t * t * (3.0 - 2.0 * t);}
         
                    if (showDiffuse[i]){   
                        color += (1.0 - t) * vec4(lightColor[i], 1.0) * lightIntensity[i];
                        lightWeight+=lightIntensity[i];
                    }
                }
                else{
                    break;
                }
            }
        
            vec4 T = color;//lightWeight;
        
            vec4 c0 = vec4(0.0,0.0,0.0,1.0);//dark
            vec4 c1 = vec4(1.0,1.0,1.0,1.0);//bright
        
            vec4 colorFinal = c0 * (1.0 - T) + c1 * T;
            if (lightsOnly ){
                return T;
            }
            else{
                return colorFinal;
            }
        }


        float plane_intersect_solver(vec3 plane_point,vec3 ni, vec3 pe, vec3 npe){
            if  (dot(ni, npe) < 0.){
                float k = - dot(ni, (pe - plane_point)) / dot(ni, npe);
                return k;
            }
            else{
                return 10000.0;
            }
        }

        vec3 plane_normal_solver(vec3 ni){
            return normalize(ni); //plain solution
        }


        float sphere_intersect_solver(vec3 center, float radius, vec3 pe, vec3 npe){
            // ((pe + k * npe) - (center - pe))^2 = radius^2

            float b = dot(npe, (center - pe));
            float c = dot((pe - center), (pe - center)) - radius * radius;
            float delta = b*b - c;
            if (delta < 0.) {
                return 10000.0;
            }
            if (b < 0.) {
                return 10000.0;
            }

            float t = b - sqrt(delta);
            return t;
            
        }
        vec3 sphere_normal_solver(vec3 center, float radius, vec3 pe, vec3 npe){
            // ((pe + k * npe) - (center - pe))^2 = radius^2
            float b = dot(npe, (center - pe));
            float c = dot((pe - center), (pe - center)) - radius * radius;
            float delta = b*b - c;

            float t = b - sqrt(delta);

            vec3 intersect_norm = (pe + t * npe - (center - pe));
            return normalize(intersect_norm);
        }


        vec3 refract(vec3 n, vec3 in_vec){ // Photorealistic equation
            float ior = pow(2.0, logIOR);
            float cos1 = dot(n, in_vec); //vLight
            float delta = 1.0 + ior * ior * ( (cos1 * cos1) - 1.0 );
            vec3 refract_n;
            if(delta >= 0.){ 
                //line 162
                float cos2 = sqrt(delta);
                refract_n = -1.0 * ior * in_vec + (ior * cos1 - cos2) * n; // vec3(0,0,1) -> vLight
            }
            else{
                refract_n = vec3(-256.0, -256.0, -256.0); //No refraction.
            }
            return refract_n;
        }

        vec3 reflect_2(vec3 n, vec3 in_vec){ // Photorealistic equation
            float cos1 = dot(n, in_vec); //vLight
            vec3 reflect_n = in_vec - 2. * cos1 * n;
            return reflect_n;
        }

        //compute the real ratio.
        float fresnelBlend(vec3 n, vec3 in_vec){
            float cos = dot(n, in_vec );
            float fresnel;

            float ior = pow(2.0, logIOR);
            ior = 1.0 / ior;
        
            float square = 1.0 - ior * ior * (1.0 - cos * cos);
            if (square < 0.0) {
                square = 0.0;
            }
        
            float rs = (ior * cos - square) / (ior * cos + square);
            rs = rs * rs;
        
            float rp = (ior * square - cos) / (ior * square + cos);
            rp = rp * rp;
        
            fresnel = (rs + rp) / 2.0;
            

            if (fresnelIntensity > 0.0){
                fresnel = 1.0 * fresnelIntensity + fresnel * ( 1.0 - fresnelIntensity);
            }
            else{
                fresnel = fresnel * (1.0 + fresnelIntensity);
            }
            return fresnel;
        }

        vec3 tracing_func(vec3 s1_p, float s1_r, vec3 s1_c,
                        vec3 s2_p, float s2_r, vec3 s2_c,
                        vec3 p1_n, vec3 p1_p, vec3 p1_c,
                        vec3 p2_n, vec3 p2_p, vec3 p2_c,
                        float K, vec3 in_point, vec3 in_vec){

            vec4 finalColor = vec4(0.0, 0.0, 0.0, 1.0); // default color.
            float recur_threshold = 1.0;

            vec3 cur_normal; //final normal direction
            vec3 cur_posi; //final position and final distance
            
            //plane1
            float plane_d_1 = plane_intersect_solver(p1_p, p1_n, in_point, in_vec); //line 223.
            vec3 plane_norm_1 = p1_n;

            //plane2
            float plane_d_2 = plane_intersect_solver(p2_p, p2_n, in_point, in_vec);
            vec3 plane_norm_2 = p2_n;

            //sphere1
            float sphere_d_1 = sphere_intersect_solver(s1_p, s1_r, in_point, in_vec);
            vec3 sphere_norm_1 = sphere_normal_solver(s1_p, s1_r, in_point, in_vec);

            //sphere2
            float sphere_d_2 = sphere_intersect_solver(s2_p, s2_r, in_point, in_vec);
            vec3 sphere_norm_2 = sphere_normal_solver(s2_p, s2_r, in_point, in_vec);
            
            float shortest_distance = 4096.0 ;

            vec3 obj_color;
            float transparent = 0.;

            //sphere 1 is transparent.
            //sphere 2 is not transparent.
            //all the plane is not transparent.

            if (shortest_distance > plane_d_1) {
                shortest_distance = plane_d_1;
                vec3 ip = in_point + shortest_distance * in_vec;
                float tx = (ip.x - float(int(ip.x / 2.)) * 2.) / 2.;
                float ty = (ip.y - float(int(ip.y / 4.)) * 4.) / 4.;
                obj_color = texture2D(uSamplerColor1, vec2(tx, ty)).rgb;
                cur_normal = plane_norm_1;
                cur_posi = in_point + plane_d_1 * in_vec;
                transparent = -1.0;
            }

            if (shortest_distance > plane_d_2) {
                shortest_distance = plane_d_2;
                // define the mapping color and mapping normal vector here haha
                vec3 ip = in_point + shortest_distance * in_vec;
                float tx = (ip.x - float(int(ip.x / 4.)) * 4.) / 4.;
                float ty = (ip.z - float(int(ip.z / 2.)) * 2.) / 2.;
                obj_color = texture2D(uSamplerForeground, vec2(tx, ty)).rgb;
                cur_normal = plane_norm_2;
                cur_posi = in_point + plane_d_2 * in_vec;
                transparent = -1.0;
            }


            if (shortest_distance > sphere_d_1) {
                shortest_distance = sphere_d_1;
                obj_color = s1_c;
                cur_normal = sphere_norm_1;
                cur_posi = in_point + sphere_d_1 * in_vec;
                transparent = 1.0;
            }

            if (shortest_distance > sphere_d_2) {
                shortest_distance = sphere_d_2;
                obj_color = s2_c;
                cur_normal = sphere_norm_2;
                cur_posi = in_point + sphere_d_2 * in_vec;
                transparent = -1.0;
            }
            

            float kn = 0.5;
            finalColor = diffuse(cur_normal, cur_posi); //+ 0.3 * vec4(spec(cur_normal, npe, cur_posi), 0.);
            finalColor.rgb = 0.6 * finalColor.rgb + 0.4 * obj_color; //Line 290
            vec3 Cn = finalColor.rgb;


            if (shortest_distance == 4096.0){   
                //the tracing stops, for no further reflection and refraction. Doesn't hit anything.
                return Cn; 
            }
            else{
                if(K < recur_threshold){
                    //reach threshold, stop tracing.
                    return Cn;
                }
                else{                                       
                    //sphere 1 has referaction; sphere 2 has no. 
                    //need to compute the reflection and refraction
                    
                    vec3 rfl_v = reflect_2(cur_normal, in_vec);
                    vec3 rfr_t = refract(cur_normal, in_vec);

                    if(rfr_t.r < - 20.0){
                        //which means total reflection.
                        //total relection.
                        float K_rfl = K*(1.0-kn);  //Line 313
                        return kn * Cn +  (1.0 - kn)  * tracing_func(s1_p, s1_r, s2_p, s2_r, p1_n, p1_p, p2_n, p2_p, K_rfl, cur_posi, rfl_v); 
                    }
                    else{
                        if(transparent > 0.0){
                            float fresnel_rfl = 0.5;//set a default value for no fresnel.
                            if(realVersion){
                                float fresnel_rfl = fresnelBlend(cur_normal, in_vec);
                            }

                            float K_rfl = K*(1.0 - kn)*fresnel_rfl;
                            float K_rfr = K*(1.0 - kn)*(1.0 - fresnel_rfl);
                            return kn * Cn + 
                            (1.0 - kn) * ((1.0 - fresnel_rfl) * tracing_func(s1_p, s1_r, s2_p, s2_r, p1_n, p1_p, p2_n, p2_p, K_rfl, cur_posi, rfl_v) 
                                    + fresnel_rfl * tracing_func(s1_p, s1_r, s2_p, s2_r, p1_n, p1_p, p2_n, p2_p, K_rfr, cur_posi, rfr_t));
                        }
                        else{
                            //not a transparent object.
                            float K_rfl = K*(1.0 - kn);
                            return kn * Cn +  (1.0 - kn)  * tracing_func(s1_p, s1_r, s2_p, s2_r, p1_n, p1_p, p2_n, p2_p, K_rfl, cur_posi, rfl_v); 
                        }
                    }
                }
            }
        }


        void main()
        {
            // Need a vector to record all objects.
            // Need a vector to record whether a object is transparent or not.
            vec4 finalColor = vec4(0.0, 0.0, 0.0, 1.0); // default color.

            vec3 pe = 0.1*cameraDistance * vec3(cameraX, - cameraY, cameraZ); // pe is the original position of the eye camera.
            // pe = vec3(5.0, -5.0, 5.0);
            vec3 n2 = normalize(vec3(5.0,10.0,5.0) - pe); // set center of canvas

            // n2 = normalize(n2 + 0.3 * vec3(viewX, viewY, viewZ)); // set center of canvas
            // n2 = normalize(vec3(0.0, 1.0, 0.0)); // only for debug
            vec3 V_up = vec3(0.0, 1.0, 0.0); // set head direction
            V_up = vec3(0.0, 0.0, 1.0);
            vec3 n0 = normalize(cross(n2, V_up)); // set canvas 
            vec3 n1 = normalize(cross(n0, n2));

            float screen_distance = 5.0;

            float s0 = 5.; //width and height.
            float s1 = 8.;
            vec3 pc = pe + screen_distance * n2;
            vec3 p00 = pc - (s0 * n0 + s1 * n1) / 2.0;

            vec3 pp = p00 + f_texcoord.s * s0 * n0 + f_texcoord.t * s1 * n1; // pp is the position in 3d space
            vec3 npe = normalize(pp - pe); // eye direction


            //plane1
            vec3 plane_ni_1 = vec3(0., 0., 1.); // plane norm direction.
            vec3 plane_color_1 = vec3(0.0, 0., 0.5); //
            vec3 plane_position_1 = vec3(0., 0., 0.); //plane position
            //plane2
            vec3 plane_ni_2 = vec3(0., -1., 0.); // plane norm direction.
            vec3 plane_color_2 = vec3(0., 0.5, 0.0); //
            vec3 plane_position_2 = vec3(0., 10., 0.); //plane position
            //sphere1
            vec3 sphere_position1 = vec3(5.0, 8.0, 5.0); // plane norm direction.
            vec3 sphere_color1 = vec3(0., 0.5, 0.5);
            float sphere_radius1 = 1.0;
            //sphere2
            vec3 sphere_position2 = vec3(5.0, 8.0, 1.0); // plane norm direction.
            vec3 sphere_color2 = vec3(0.5, 0., 0.5);
            float sphere_radius2 = 1.0;

            float K = 1.0;
            finalColor.rgb = tracing_func(sphere_position1, sphere_radius1, sphere_color1, 
                                        sphere_position2, sphere_radius2, sphere_color2,
                                        plane_ni_1, plane_position_1, plane_color_1,
                                        plane_ni_2, plane_position_2, plane_color_2,
                                        K, pe, npe);
            
            gl_FragColor = finalColor;
        }

        vec3 trace(in vec3 pos, in vec3 dir, in Light light) {
        
            HitInfo info;
            vec3 c = vec3(0.5);
        
            for(int i = 0; i < 3; i++) {
                if(intersect(pos, dir, info, light)) {
                    bool shadow = false;
                    vec3 L = normalize(light.position - info.pos);
                    vec3 N = normalize(info.normal);
                    vec3 V = normalize(pos - info.pos);
                    float intense;
                    vec3 shadowRayOrigin = info.pos;
        
                    vec3 shadowRayDirection = L;
                    float dist = length(light.position - info.pos);
        
                    if(info.reflectType == 5) {
                        Material sphere = sphere(uLambertianColor);
        
                        intense = intensityAt(light, info, shadow, pos, sphere, c);
                        c = c * intense;
                    }
        
                    if(info.reflectType == 0) { // ground
        
                        vec2 uv;
                        uv.x = info.u;
                        uv.y = info.v;
                        vec3 tempC = texture(uFloorTexture, uv).xyz;
                        Material plane = plane(tempC);
        
                        intense = intensityAt(light, info, shadow, pos, plane, c);
                        c = c * intense;
                                //c = phongShading(N, L, V, light, plane, info,shadow)*intense;
                        //dir = info.normal + random_in_unit_sphere();
                        
               
        
                    } else if(info.reflectType == 1) { // lambertian

        
                        Material sphere = sphere(uLambertianColor);
                        intense = intensityAt(light, info, shadow, pos, sphere, c);
                        c = c * intense;

                    } else if(info.reflectType == 2) { // specular
        
                        Material mirror = mirror();
        
                        intense = intensityAt(light, info, shadow, pos, mirror, c);
                        c = c * intense;
        
                                //c = phongShading(N, L, V, light, mirror, info,shadow)*intense;
                        dir = normalize(reflect(dir, info.normal) + uFuzziness * random_in_unit_sphere());
                        if(dot(info.normal, dir) < 0.0)
                            break;
                    } else if(info.reflectType == 3) { // dielectric
                        vec3 n;
                        float eta, cosine;
                        float prob;
                        Material mirror = mirror();
                        if(dot(dir, info.normal) < 0.0) {
                            n = info.normal;
                            eta =  1.0/uIndexOfRefraction;
                            cosine = -dot(dir, info.normal) / length(dir);
                        } else {
                           
                            n = -info.normal;
                            eta = uIndexOfRefraction;
                            cosine = uIndexOfRefraction * dot(dir, info.normal) / length(dir);
                        }
                        vec3 r = refract(normalize(dir), normalize(n), eta);
                        bool isRefracted = r.x!=0.0|| r.y!=0.0 ||r.z!=0.0;
                        if(isRefracted){
                            prob = schlick(cosine, uIndexOfRefraction);
                        }

                        if(random()<prob){
                            intense = intensityAt(light, info, shadow, pos, mirror, c);
                            c = c * intense;
                            dir = normalize(reflect(dir, n));
                        }
                        else{

                            dir = normalize(r);
                        }
                        //dir= r;
                        //dir = r == vec3(0.0) || random() < schlick(cosine, uIndexOfRefraction) ? reflect(dir, n) : r;
                    }
                } 
                else {
                    vec3 pp;
                    bool test = envSphere(pos, dir, SPHERE_POS4, 20.0, 0.00001, 1000.0, pp);
                    vec2 uv = sphereMap(pp, SPHERE_POS4, 20.0);
                    vec3 tempS = texture(uSphereEnvironment, uv).xyz;
                                                                            //c *= backgroundColor(dir);
                    c = tempS;
                    break;
                }
            }
            return c;
        }

        vec3 tracing_func_iter(vec3 s1_p, float s1_r, vec3 s1_c,
                            vec3 s2_p, float s2_r, vec3 s2_c,
                            vec3 p1_n, vec3 p1_p, vec3 p1_c,
                            vec3 p2_n, vec3 p2_p, vec3 p2_c,
                            float K, vec3 in_point, vec3 in_vec){

            vec4 finalColor = vec4(0.0, 0.0, 0.0, 1.0); // default color.
            float recur_threshold = 1.0;

            vec3 cur_normal; //final normal direction
            vec3 cur_posi; //final position and final distance
            //plane1
            float plane_d_1 = plane_intersect_solver(p1_p, p1_n, in_point, in_vec); //line 223.
            vec3 plane_norm_1 = p1_n;

            //plane2
            float plane_d_2 = plane_intersect_solver(p2_p, p2_n, in_point, in_vec);
            vec3 plane_norm_2 = p2_n;

            //sphere1
            float sphere_d_1 = sphere_intersect_solver(s1_p, s1_r, in_point, in_vec);
            vec3 sphere_norm_1 = sphere_normal_solver(s1_p, s1_r, in_point, in_vec);

            //sphere2
            float sphere_d_2 = sphere_intersect_solver(s2_p, s2_r, in_point, in_vec);
            vec3 sphere_norm_2 = sphere_normal_solver(s2_p, s2_r, in_point, in_vec);
            
            float shortest_distance = 4096.0 ;

            vec3 obj_color;

            int transparent = -1; // 0: ground, no further reflection or refraction. 1: transparent sphere rafra + refle. 2: untransparent sphere: only refle.

            //sphere 1 is transparent.
            //sphere 2 is not transparent.
            //all the plane is not transparent.

            if (shortest_distance > plane_d_1) {
                shortest_distance = plane_d_1;
                vec3 ip = in_point + shortest_distance * in_vec;
                float tx = (ip.x - float(int(ip.x / 2.)) * 2.) / 2.;
                float ty = (ip.y - float(int(ip.y / 4.)) * 4.) / 4.;
                obj_color = texture2D(uSamplerColor1, vec2(tx, ty)).rgb;
                cur_normal = plane_norm_1;
                cur_posi = in_point + plane_d_1 * in_vec;
                transparent = 0;
            }

            if (shortest_distance > plane_d_2) {
                shortest_distance = plane_d_2;
                // define the mapping color and mapping normal vector here haha
                vec3 ip = in_point + shortest_distance * in_vec;
                float tx = (ip.x - float(int(ip.x / 4.)) * 4.) / 4.;
                float ty = (ip.z - float(int(ip.z / 2.)) * 2.) / 2.;
                obj_color = texture2D(uSamplerForeground, vec2(tx, ty)).rgb;
                cur_normal = plane_norm_2;
                cur_posi = in_point + plane_d_2 * in_vec;
                transparent = 0;
            }


            if (shortest_distance > sphere_d_1) {
                shortest_distance = sphere_d_1;
                obj_color = s1_c;
                cur_normal = sphere_norm_1;
                cur_posi = in_point + sphere_d_1 * in_vec;
                transparent = 1;
            }

            if (shortest_distance > sphere_d_2) {
                shortest_distance = sphere_d_2;
                obj_color = s2_c;
                cur_normal = sphere_norm_2;
                cur_posi = in_point + sphere_d_2 * in_vec;
                transparent = 2;
            }
            

            float kn = 0.5;
            finalColor = diffuse(cur_normal, cur_posi); //+ 0.3 * vec4(spec(cur_normal, npe, cur_posi), 0.);
            finalColor.rgb = 0.6 * finalColor.rgb + 0.4 * obj_color; //Line 290
            vec3 Cn = finalColor.rgb;

            if(transparent == 0){
                return Cn;
            }
            else if(transparent == 2){
                vec3 rfl_v = reflect_2(cur_normal, in_vec);

                //reflection
                vec3 cur_normal_rfl; //final normal direction
                vec3 cur_posi_rfl; //final position and final distance
                //plane1
                float plane1_d_rfl = plane_intersect_solver(p1_p, p1_n, cur_posi, rfl_v); //line 223.
                vec3 plane1_norm_rfl; = p1_n;
                //plane2
                float plane2_d_rfl = plane_intersect_solver(p2_p, p2_n, cur_posi, rfl_v);
                vec3 plane2_norm_rfl = p2_n;
                //sphere1
                float sphere1_d_rfl = sphere_intersect_solver(s1_p, s1_r, cur_posi, rfl_v);
                vec3 sphere1_norm_rfl = sphere_normal_solver(s1_p, s1_r, cur_posi, rfl_v);
                    //sphere2
                float sphere2_d_rfl = sphere_intersect_solver(s2_p, s2_r, cur_posi, rfl_v);
                vec3 sphere2_norm_rfl = sphere_normal_solver(s2_p, s2_r, cur_posi, rfl_v);
                    
                float shortest_distance_rfl = 4096.0 ;

                vec3 obj_color_rfl;
                    
                    //sphere 1 is transparent.
                    //sphere 2 is not transparent.
                    //all the plane is not transparent.

                if (shortest_distance_rfl > plane1_d_rfl) {
                    shortest_distance_rfl = plane1_d_rfl;
                    vec3 ip = in_point + shortest_distance_rfl * rfl_v;
                    float tx = (ip.x - float(int(ip.x / 2.)) * 2.) / 2.;
                    float ty = (ip.y - float(int(ip.y / 4.)) * 4.) / 4.;
                    obj_color_rfl = texture2D(uSamplerColor1, vec2(tx, ty)).rgb;
                    cur_normal_rfl = plane1_norm_rfl;
                    cur_posi_rfl = in_point + plane1_d_new * rfl_v;
                }

                if (shortest_distance_rfl > plane2_d_rfl) {
                    shortest_distance_rfl = plane2_d_rfl;
                    // define the mapping color and mapping normal vector here haha
                    vec3 ip = in_point + shortest_distance_rfl * rfl_v;
                    float tx = (ip.x - float(int(ip.x / 4.)) * 4.) / 4.;
                    float ty = (ip.z - float(int(ip.z / 2.)) * 2.) / 2.;
                    obj_color_rfl = texture2D(uSamplerForeground, vec2(tx, ty)).rgb;
                    cur_normal_rfl = plane2_norm_rfl;
                    cur_posi_rfl = in_point + plane2_d_new * rfl_v;
                }


                if (shortest_distance_rfl > sphere1_d_rfl) {
                    shortest_distance_rfl = sphere1_d_rfl;
                    obj_color_rfl = s1_c;
                    cur_normalcur_normal_rfl_rfl = sphere1_norm_rfl;
                    cur_posi_rfl = in_point + sphere1_d_rfl * rfl_v;
                }

                if (shortest_distance_rfl > sphere2_d_rfl) {
                    shortest_distance_rfl = sphere2_d_rfl;
                    obj_color_rfl = s2_c;
                    cur_normal_rfl = sphere2_norm_rfl;
                    cur_posi_rfl = in_point + sphere2_d_rfl * rfl_v;
                }

                vec4 finalColor_rfl = vec4(0.0, 0.0, 0.0, 1.0); // default color.
                finalColor_rfl = diffuse(cur_normal_rfl, cur_posi_rfl); //+ 0.3 * vec4(spec(cur_normal, npe, cur_posi), 0.);
                finalColor_rfl.rgb = 0.6 * finalColor_new.rgb + 0.4 * obj_color_new; //Line 290    

                return kn * Cn +  K_rfl  * finalColor_rfl; 
            }
            else if(transparent == 1){
                vec3 rfl_v = reflect_2(cur_normal, in_vec);
                vec3 rfr_t = refract(cur_normal, in_vec);

                if(rfr_t.r < - 20.0){
                    //which means total reflection.
                    //total relection.
                    float K_rfl = K*(1.0-kn);  //Line 313

                        //Only reflection
                    vec3 cur_normal_rfl; //final normal direction
                    vec3 cur_posi_rfl; //final position and final distance
                    //plane1
                    float plane1_d_rfl = plane_intersect_solver(p1_p, p1_n, cur_posi, rfl_v); //line 223.
                    vec3 plane1_norm_rfl; = p1_n;
                    //plane2
                    float plane2_d_rfl = plane_intersect_solver(p2_p, p2_n, cur_posi, rfl_v);
                    vec3 plane2_norm_rfl = p2_n;
                    //sphere1
                    float sphere1_d_rfl = sphere_intersect_solver(s1_p, s1_r, cur_posi, rfl_v);
                    vec3 sphere1_norm_rfl = sphere_normal_solver(s1_p, s1_r, cur_posi, rfl_v);
                    //sphere2
                    float sphere2_d_rfl = sphere_intersect_solver(s2_p, s2_r, cur_posi, rfl_v);
                    vec3 sphere2_norm_rfl = sphere_normal_solver(s2_p, s2_r, cur_posi, rfl_v);
                        
                    float shortest_distance_rfl = 4096.0 ;

                    vec3 obj_color_rfl;
                    
                        //sphere 1 is transparent.
                        //sphere 2 is not transparent.
                        //all the plane is not transparent.

                    if (shortest_distance_rfl > plane1_d_rfl) {
                        shortest_distance_rfl = plane1_d_rfl;
                        vec3 ip = in_point + shortest_distance_rfl * rfl_v;
                        float tx = (ip.x - float(int(ip.x / 2.)) * 2.) / 2.;
                        float ty = (ip.y - float(int(ip.y / 4.)) * 4.) / 4.;
                        obj_color_rfl = texture2D(uSamplerColor1, vec2(tx, ty)).rgb;
                        cur_normal_rfl = plane1_norm_rfl;
                        cur_posi_rfl = in_point + plane1_d_new * rfl_v;
                    }

                    if (shortest_distance_rfl > plane2_d_rfl) {
                        shortest_distance_rfl = plane2_d_rfl;
                        // define the mapping color and mapping normal vector here haha
                        vec3 ip = in_point + shortest_distance_rfl * rfl_v;
                        float tx = (ip.x - float(int(ip.x / 4.)) * 4.) / 4.;
                        float ty = (ip.z - float(int(ip.z / 2.)) * 2.) / 2.;
                        obj_color_rfl = texture2D(uSamplerForeground, vec2(tx, ty)).rgb;
                        cur_normal_rfl = plane2_norm_rfl;
                        cur_posi_rfl = in_point + plane2_d_new * rfl_v;
                    }


                    if (shortest_distance_rfl > sphere1_d_rfl) {
                        shortest_distance_rfl = sphere1_d_rfl;
                        obj_color_rfl = s1_c;
                        cur_normalcur_normal_rfl_rfl = sphere1_norm_rfl;
                        cur_posi_rfl = in_point + sphere1_d_rfl * rfl_v;
                    }

                    if (shortest_distance_rfl > sphere2_d_rfl) {
                        shortest_distance_rfl = sphere2_d_rfl;
                        obj_color_rfl = s2_c;
                        cur_normal_rfl = sphere2_norm_rfl;
                        cur_posi_rfl = in_point + sphere2_d_rfl * rfl_v;
                    }

                    vec4 finalColor_rfl = vec4(0.0, 0.0, 0.0, 1.0); // default color.
                    finalColor_rfl = diffuse(cur_normal_rfl, cur_posi_rfl); //+ 0.3 * vec4(spec(cur_normal, npe, cur_posi), 0.);
                    finalColor_rfl.rgb = 0.6 * finalColor_new.rgb + 0.4 * obj_color_new; //Line 290

                    return kn * Cn +  K_rfl  * finalColor_rfl; 
                }
                else{
                    float fresnel_rfl = 0.5;//set a default value for no fresnel.
                    if(realVersion){
                        float fresnel_rfl = fresnelBlend(cur_normal, in_vec);
                    }

                    float K_rfl = K*(1.0 - kn)*fresnel_rfl;
                    float K_rfr = K*(1.0 - kn)*(1.0 - fresnel_rfl);
                    
                    
                    //refraction
                    vec3 cur_normal_new; //final normal direction
                    vec3 cur_posi_new; //final position and final distance
                    //plane1
                    float plane1_d_new = plane_intersect_solver(p1_p, p1_n, cur_posi, rfr_t); //line 223.
                    vec3 plane1_norm_new = p1_n;

                    //plane2
                    float plane2_d_new = plane_intersect_solver(p2_p, p2_n, cur_posi, rfr_t);
                    vec3 plane2_norm_new = p2_n;

                    //sphere1
                    float sphere1_d_new = sphere_intersect_solver(s1_p, s1_r, cur_posi, rfr_t);
                    vec3 sphere1_norm_new = sphere_normal_solver(s1_p, s1_r, cur_posi, rfr_t);

                    //sphere2
                    float sphere2_d_new = sphere_intersect_solver(s2_p, s2_r, cur_posi, rfr_t);
                    vec3 sphere2_norm_new = sphere_normal_solver(s2_p, s2_r, cur_posi, rfr_t);
                    
                    float shortest_distance_new = 4096.0 ;

                    vec3 obj_color_new;
                    
                    //sphere 1 is transparent.
                    //sphere 2 is not transparent.
                    //all the plane is not transparent.

                    if (shortest_distance_new > plane1_d_new) {
                        shortest_distance_new = plane1_d_new;
                        vec3 ip = in_point + shortest_distance_new * rfr_t;
                        float tx = (ip.x - float(int(ip.x / 2.)) * 2.) / 2.;
                        float ty = (ip.y - float(int(ip.y / 4.)) * 4.) / 4.;
                        obj_color_new = texture2D(uSamplerColor1, vec2(tx, ty)).rgb;
                        cur_normal_new = plane1_norm_new;
                        cur_posi_new = in_point + plane1_d_new * rfr_t;
                    }

                    if (shortest_distance_new > plane2_d_new) {
                        shortest_distance_new = plane2_d_new;
                        // define the mapping color and mapping normal vector here haha
                        vec3 ip = in_point + shortest_distance_new * rfr_t;
                        float tx = (ip.x - float(int(ip.x / 4.)) * 4.) / 4.;
                        float ty = (ip.z - float(int(ip.z / 2.)) * 2.) / 2.;
                        obj_color_new = texture2D(uSamplerForeground, vec2(tx, ty)).rgb;
                        cur_normal_new = plane2_norm_new;
                        cur_posi_new = in_point + plane2_d_new * rfr_t;
                    }


                    if (shortest_distance_new > sphere1_d_new) {
                        shortest_distance_new = sphere1_d_new;
                        obj_color_new = s1_c;
                        cur_normal_new = sphere1_norm_new;
                        cur_posi_new = in_point + sphere1_d_new * rfr_t;
                    }

                    if (shortest_distance_new > sphere2_d_new) {
                        shortest_distance_new = sphere2_d_new;
                        obj_color_new = s2_c;
                        cur_normal_new = sphere2_norm_new;
                        cur_posi_new = in_point + sphere2_d_new * rfr_t;
                    }
                
                    vec4 finalColor_new = vec4(0.0, 0.0, 0.0, 1.0); // default color.
                    finalColor_new = diffuse(cur_normal_new, cur_posi_new); //+ 0.3 * vec4(spec(cur_normal, npe, cur_posi), 0.);
                    finalColor_new.rgb = 0.6 * finalColor_new.rgb + 0.4 * obj_color_new; //Line 290

                    //reflection
                    vec3 cur_normal_rfl; //final normal direction
                    vec3 cur_posi_rfl; //final position and final distance
                    //plane1
                    float plane1_d_rfl = plane_intersect_solver(p1_p, p1_n, cur_posi, rfl_v); //line 223.
                    vec3 plane1_norm_rfl; = p1_n;
                    //plane2
                    float plane2_d_rfl = plane_intersect_solver(p2_p, p2_n, cur_posi, rfl_v);
                    vec3 plane2_norm_rfl = p2_n;
                    //sphere1
                    float sphere1_d_rfl = sphere_intersect_solver(s1_p, s1_r, cur_posi, rfl_v);
                    vec3 sphere1_norm_rfl = sphere_normal_solver(s1_p, s1_r, cur_posi, rfl_v);
                    //sphere2
                    float sphere2_d_rfl = sphere_intersect_solver(s2_p, s2_r, cur_posi, rfl_v);
                    vec3 sphere2_norm_rfl = sphere_normal_solver(s2_p, s2_r, cur_posi, rfl_v);
                    
                    float shortest_distance_rfl = 4096.0 ;

                    vec3 obj_color_rfl;
                    
                    //sphere 1 is transparent.
                    //sphere 2 is not transparent.
                    //all the plane is not transparent.

                    if (shortest_distance_rfl > plane1_d_rfl) {
                        shortest_distance_rfl = plane1_d_rfl;
                        vec3 ip = in_point + shortest_distance_rfl * rfl_v;
                        float tx = (ip.x - float(int(ip.x / 2.)) * 2.) / 2.;
                        float ty = (ip.y - float(int(ip.y / 4.)) * 4.) / 4.;
                        obj_color_rfl = texture2D(uSamplerColor1, vec2(tx, ty)).rgb;
                        cur_normal_rfl = plane1_norm_rfl;
                        cur_posi_rfl = in_point + plane1_d_new * rfl_v;
                    }

                    if (shortest_distance_rfl > plane2_d_rfl) {
                        shortest_distance_rfl = plane2_d_rfl;
                        // define the mapping color and mapping normal vector here haha
                        vec3 ip = in_point + shortest_distance_rfl * rfl_v;
                        float tx = (ip.x - float(int(ip.x / 4.)) * 4.) / 4.;
                        float ty = (ip.z - float(int(ip.z / 2.)) * 2.) / 2.;
                        obj_color_rfl = texture2D(uSamplerForeground, vec2(tx, ty)).rgb;
                        cur_normal_rfl = plane2_norm_rfl;
                        cur_posi_rfl = in_point + plane2_d_new * rfl_v;
                    }


                    if (shortest_distance_rfl > sphere1_d_rfl) {
                        shortest_distance_rfl = sphere1_d_rfl;
                        obj_color_rfl = s1_c;
                        cur_normalcur_normal_rfl_rfl = sphere1_norm_rfl;
                        cur_posi_rfl = in_point + sphere1_d_rfl * rfl_v;
                    }

                    if (shortest_distance_rfl > sphere2_d_rfl) {
                        shortest_distance_rfl = sphere2_d_rfl;
                        obj_color_rfl = s2_c;
                        cur_normal_rfl = sphere2_norm_rfl;
                        cur_posi_rfl = in_point + sphere2_d_rfl * rfl_v;
                    }

                    vec4 finalColor_rfl = vec4(0.0, 0.0, 0.0, 1.0); // default color.
                    finalColor_rfl = diffuse(cur_normal_rfl, cur_posi_rfl); //+ 0.3 * vec4(spec(cur_normal, npe, cur_posi), 0.);
                    finalColor_rfl.rgb = 0.6 * finalColor_rfl.rgb + 0.4 * obj_color_rfl; //Line 290

                    return kn * Cn + K_rfr * finalColor_new.rgb + K_rfl * finalColor_rlf.agb;
                }

            }

            if (shortest_distance == 4096.0){   
                //the tracing stops, for no further reflection and refraction. Doesn't hit anything.
                return Cn; 
            }
        }