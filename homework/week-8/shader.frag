precision mediump float;

uniform vec2 resolution;
uniform vec2 mouse;
uniform highp float time;

float rand(vec2 pos) {
  return sin(sin(dot(pos, vec2(mouse * 100000.))) * mouse.x * 10000000.);
}

void main() {
  vec2 pos = gl_FragCoord.xy / resolution;
  vec2 intPart = vec2(0.);
  vec2 floatPart = vec2(0.);

  floatPart = fract(pos);

  vec3 colour = vec3(rand(floatPart));

  gl_FragColor = vec4(colour, 1.0);
}