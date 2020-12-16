precision highp float;
varying vec3 myNormal;

void main() {

  myNormal = normal;

  // vec3 newPosition = position + normal;

  gl_Position = projectionMatrix * modelViewMatrix *
                vec4(position + (normal * 0.01), 2.0);
}