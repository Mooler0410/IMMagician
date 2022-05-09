float general_quadrics_th(int type,
                                float a02, float a12, float a22, float a21, float a00,
                                float s0, float s1, float s2,
                                vec3 v2, vec3 vup, vec3 pc,
                                vec3 pe, vec3 npe) {
            // find roots
            vec3 n0 = normalize(cross(vup, v2));
            vec3 n1 = normalize(cross(n0, v2));
            vec3 n2 = normalize(v2);

            if (type==5)   //plane
            {
                float th;
                th = -1.*dot(n2,pe-pc)/dot(n2,npe);
                if (th>=0. && dot(n2,npe)<0.)
                    return th;
            }

            float A = a02 * dot(n0, npe) * dot(n0, npe) / (s0 * s0) + a12 * dot(n1, npe) * dot(n1, npe) / (s1 * s1) + a22 * dot(n2, npe) * dot(n2, npe) / (s2 * s2);
            float B = 2.0 * a02 * dot(n0, npe) * dot(n0, pe - pc) / (s0 * s0) + 2.0 * a12 * dot(n1, npe) * dot(n1, pe - pc) / (s1 * s1) + 2.0 * a22 * dot(n2, npe) * dot(n2, pe - pc) / (s2 * s2) + a21 * dot(n2, npe) / s2;
            float C = a02 * dot(n0, pe - pc) * dot(n0, pe - pc) / (s0 * s0) + a12 * dot(n1, pe - pc) * dot(n1, pe - pc) / (s1 * s1) + a22 * dot(n2, pe - pc) * dot(n2, pe - pc) / (s2 * s2) + a21 * dot(n2, pe - pc) / s2 + a00;
            float delta = B * B - 4.0 * A * C;

            if (delta >= 0.0 && -B - sqrt(delta) >= 0.0) {
                float th = (-B - sqrt(delta)) / (2.0 * A);
                return th;
            } else {
                return MAX_TH;
            }
        }

vec4 general_quadrics(int type,
                            float a02, float a12, float a22, float a21, float a00,
                            float s0, float s1, float s2,
                            vec3 v2, vec3 vup, vec3 pc,
                            vec3 pe, vec3 npe) {

            // find roots
            vec3 n0 = normalize(cross(vup, v2));
            vec3 n1 = normalize(cross(n0, v2));
            vec3 n2 = normalize(v2);

            if(type==5)
            {
                float th;
                th = -1.*dot(n2,pe-pc)/dot(n2,npe);
                vec3 ph = pe + th * npe;
                vec3 fp = 2.0 * a02 * n0 * dot(n0, ph - pc) / (s0 * s0) + 2.0 * a12 * n1 * dot(n1, ph - pc) / (s1 * s1) + 2.0 * a22 * n2 * dot(n2, ph - pc) / (s2 * s2) + a21 * n2 / s2;
                fp = normalize(fp);

                float x = dot(n0, ph - pc);
                float y = dot(n1, ph - pc);
                float u = x - float(floor(x));
                if (x < 0.0)
                u = 1.0 - u;
                float v = y - float(floor(y));
                if (y < 0.0)
                v = 1.0 - v;

                vec4 c = texture2D(uSamplerTexture, vec2(u, v));

                return diffuse(fp, ph, c) + spec(fp, npe, ph, c);
            }
            float A = a02 * dot(n0, npe) * dot(n0, npe) / (s0 * s0) + a12 * dot(n1, npe) * dot(n1, npe) / (s1 * s1) + a22 * dot(n2, npe) * dot(n2, npe) / (s2 * s2);
            float B = 2.0 * a02 * dot(n0, npe) * dot(n0, pe - pc) / (s0 * s0) + 2.0 * a12 * dot(n1, npe) * dot(n1, pe - pc) / (s1 * s1) + 2.0 * a22 * dot(n2, npe) * dot(n2, pe - pc) / (s2 * s2) + a21 * dot(n2, npe) / s2;
            float C = a02 * dot(n0, pe - pc) * dot(n0, pe - pc) / (s0 * s0) + a12 * dot(n1, pe - pc) * dot(n1, pe - pc) / (s1 * s1) + a22 * dot(n2, pe - pc) * dot(n2, pe - pc) / (s2 * s2) + a21 * dot(n2, pe - pc) / s2 + a00;
            float delta = B * B - 4.0 * A * C;

            if (delta >= 0.0 && -B - sqrt(delta) >= 0.0) {
                float th = (-B - sqrt(delta)) / (2.0 * A);
                vec3 ph = pe + th * npe;
                vec3 fp = 2.0 * a02 * n0 * dot(n0, ph - pc) / (s0 * s0) + 2.0 * a12 * n1 * dot(n1, ph - pc) / (s1 * s1) + 2.0 * a22 * n2 * dot(n2, ph - pc) / (s2 * s2) + a21 * n2 / s2;
                fp = normalize(fp);

                float x = dot(n0, ph - pc);
                float y = dot(n1, ph - pc);
                float u = x - float(floor(x));
                if (x < 0.0)
                u = 1.0 - u;
                float v = y - float(floor(y));
                if (y < 0.0)
                v = 1.0 - v;

                vec4 c = texture2D(uSamplerTexture, vec2(u, v));

                return diffuse(fp, ph, c) + spec(fp, npe, ph, c);
            } else {
                return vec4(0., 0., 0., 1.);
            }
}


vec4 diffuse(vec3 n, vec3 currentP){
            vec4 color = vec4(0,0,0,1);
            float lightWeight = 0.0;

            for (int i = 0; i < max_lights; i++)
            {
                if (float(i)< float(lightN))
                {   
                    vec3 vLight = normalize( pLight[i] - currentP);
                    float cosTheta = ( dot(n, vLight) + 1.0 )/2.0;
                    float t = (cosTheta - styleDark) / (styleBright - styleDark);
                    if (t>1.0) t=1.0; if (t<0.0) t=0.0;

                    if (checkSoft){
                        t = t * t * (3.0 - 2.0 * t);
                    }
                    if (showDiffuse[i])
                    {   
                        color += (1.0 - t) * vec4(lightColor[i], 1.0) * lightIntensity[i];
                        lightWeight+=lightIntensity[i];
                    }

                }else{
                    break;
                }
            }

            vec4 T = color;//lightWeight;

            vec4 c0 = vec4(0.0,0.0,0.0,1.0);//dark
            vec4 c1 = vec4(1.0,1.0,1.0,1.0);//bright

            vec4 colorFinal = c0 * (1.0 - T) + c1 * T;
            if (lightsOnly )
            {
                return T;
            }else{
                return colorFinal;
            }
        }



        


//Reflected texture is treated as ultimate plane.
vec3 reflect1(vec3 n)
{

    float reflectIntensity = 1.0;
            vec3 reflect = - 1.0 * vec3(0.0, 0.0, 1.0) + 2.0 * dot(n, vec3(0.0, 0.0, 1.0)) * n;
            vec2 reflCoord = f_texcoord + (reflect.xy / reflect.z) * FGdis + vec2( -mouseXYcopy.x * 0.5, mouseXYcopy.y * 0.5) ;//+ vLight0.xy ;
            vec2 v = (reflCoord - vec2(0.5, 0.5)) / 0.5;
            reflCoord.x = v.x * ( 1.0 - FGscaleX ) - FGshiftX + 0.5;
            reflCoord.y = v.y * ( 1.0 - FGscaleY ) - FGshiftY + 0.5;

            vec2 noise = 0.1 * vec2(fract(sin(dot(reflCoord ,vec2(12.9898,78.233))) * 43758.5453), fract(sin(dot(reflCoord ,vec2(12.9898,78.233))) * 43758.5453));
            reflCoord = reflCoord + reflection_degree * noise;


            if (reflCoord.x > 1.0 || reflCoord.x < 0.0){
                reflCoord.x = reflCoord.x - float(floor(reflCoord.x));
                if ( floor(reflCoord.x) / 2.0 == 0.0)
                {
                    reflCoord.x = 1.0 - reflCoord.x;
                }
            }
            if (reflCoord.y > 1.0 || reflCoord.y < 0.0){
                reflCoord.y = reflCoord.y - float(floor(reflCoord.y));
                if ( floor(reflCoord.y) / 2.0 == 0.0)
                {
                    reflCoord.y = 1.0 - reflCoord.y;
                }
            }
            vec4 reflColor = texture2D(uSamplerForeground, reflCoord) ; //texture2D获取到了 第二个坐标参数对应的纹理的颜色。

            if (checkFresnel){
                reflColor = vec4(1.0,1.0,1.0,1.0);
            }
            return reflColor.rgb * reflectIntensity;
}




// Reflected texture is treated as if it is on a hemisphere 1 unit
// away from the surface.
vec3 reflect2(vec3 n)
        {

            float reflectIntensity = 1.0;
            vec2 reflCoord = f_texcoord + n.xy/n.z * FGdis + vec2( -mouseXYcopy.x * 0.5, mouseXYcopy.y * 0.5);
            vec2 v = (reflCoord - vec2(0.5, 0.5)) / 0.5;
            reflCoord.x = v.x * ( 1.0 - FGscaleX ) - FGshiftX +0.5;
            reflCoord.y = v.y * ( 1.0 - FGscaleY ) - FGshiftY + 0.5;

            vec2 noise = 0.1 * vec2(fract(sin(dot(reflCoord ,vec2(12.9898,78.233))) * 43758.5453), fract(sin(dot(reflCoord ,vec2(12.9898,78.233))) * 43758.5453));
            reflCoord = reflCoord + reflection_degree * noise;

            if (reflCoord.x > 1.0 || reflCoord.x < 0.0)
            {
                reflCoord.x = reflCoord.x - float(floor(reflCoord.x));
                if ( floor(reflCoord.x) / 2.0 == 0.0)
                {
                    reflCoord.x = 1.0 - reflCoord.x;
                }
            }
            if (reflCoord.y > 1.0 || reflCoord.y < 0.0)
            {
                reflCoord.y = reflCoord.y - float(floor(reflCoord.y));
                if ( floor(reflCoord.y) / 2.0 == 0.0)
                {
                    reflCoord.y = 1.0 - reflCoord.y;
                }
            }

            vec4 reflColor = texture2D(uSamplerForeground, reflCoord);
            if (checkFresnel){
                reflColor = vec4(1.0,1.0,1.0,1.0);
            }
            return reflColor.rgb * reflectIntensity;
        }





vec3 refract2(vec3 n) // Photorealistic equation
        {
            float refractIntensity = 1.0;
            float ior = pow(2.0, logIOR);
            float cos1 = dot(n, vec3(0, 0, 1.0)); //vLight
            float cos2 = sqrt(1.0 + ior * ior * ( (cos1 * cos1) - 1.0 ));
            vec3 refract = -1.0 * ior * vec3(0, 0, 1.0) + (ior * cos1 - cos2) * n; // vec3(0,0,1) -> vLight
            vec2 refrCoord = f_texcoord + (refract.xy / refract.z ) * (2.0 * BGdis);
            vec4 refrColor = texture2D(uSamplerBackground, refrCoord);
            if (checkFresnel == true)
            {
                refrColor = vec4(0,0,0,1.0);
            }
            return refrColor.rgb * refractIntensity;
        }

vec3 refract(vec3 n) // Ergun's way
        {
            float refractIntensity = 1.0;
            float s = logIOR;
            vec3 l = vec3(0,0,-1);//eye ray
            vec3 temp =  cross (-n, l);
            vec3 Vsurface = cross (temp, -n) ;
            vec3 refract;
            if ( s > 0.0 ) refract = l * (1.0 - (-s)) + (-n) * (-s);
            if ( s < 0.0 ) refract = l * (1.0 - (s) ) + Vsurface * ( s);


            vec2 refrCoord = f_texcoord + (refract.xy / refract.z ) * (2.0 * BGdis);
            vec4 refrColor = texture2D(uSamplerBackground, refrCoord);
            if (checkFresnel == true)
            {
                refrColor = vec4(0,0,0,1.0);
            }
            return refrColor.rgb * refractIntensity;
        }

vec3 fresnelBlend(vec3 n, vec3 refl, vec3 refr){
    float cos = dot(n, vec3(0, 0, 1.0) );
    float fresnel;
    if (realVersion) {
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
    }
    if (fresnelIntensity > 0.0){
        fresnel = 1.0 * fresnelIntensity + fresnel * ( 1.0 - fresnelIntensity);
    }
    else{
        fresnel = fresnel * (1.0 + fresnelIntensity);
    }
    return fresnel
}