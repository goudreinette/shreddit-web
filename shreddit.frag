precision mediump float;

// uniforms
uniform sampler2D u_tex0;
uniform vec2 u_resolution;
uniform vec2 u_tex0_size;
uniform float uSteps;
uniform float uTimes;

vec2 shuffle(vec2 xy, vec2 p) {
    vec2 i = floor(fract(xy) * p) / p;
    vec2 f = fract(xy * p) / p;
    i.x += step(1.-i.x, .5) / (p.x * 2.);
    i.y += step(1.-i.y, .5) / (p.y * 2.);
    return fract(i * 2. + f);
}

void main()
{
    vec2 uv = gl_FragCoord.xy/u_resolution;
    uv.y *= u_tex0_size.x/u_tex0_size.y;
    uv = shuffle(uv, vec2(uSteps, uTimes));
    uv = shuffle(uv, vec2(uTimes, uSteps));
    gl_FragColor = texture2D(u_tex0, uv);
}
