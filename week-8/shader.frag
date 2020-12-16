precision highp float;

varying vec3 myNormal;

void main() {
  vec3 light = vec3(0.0, 40.0, 0.);
  light = normalize(light);

  float prod = dot(myNormal, light);

  gl_FragColor = vec4(prod, prod, prod, 1.0);
}
