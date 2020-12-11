precision highp float;
uniform vec2 mouse;
uniform float time;
varying vec3 myNormal;

void main() {
  vec3 light = vec3(0., 10., 5.);
  vec3 invert = vec3(1., 1., 1.);
  invert = myNormal * invert;

  light = normalize(light);
  float prod = max(0., dot(myNormal, light));

  gl_FragColor = vec4(prod, prod, prod, 1.0) + vec4(vec3(0.15), 1.);
}