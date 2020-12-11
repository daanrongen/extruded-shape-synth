precision mediump float;

uniform vec2 resolution;
uniform vec2 mouse;
uniform highp float time;

float square(vec2 pos, float size) {
  vec2 normCoords = gl_FragCoord.xy / resolution;

  float aspect = resolution.x / resolution.y;
  size *= 0.1;

  if (length((normCoords.x - pos.x) * aspect) < size &&
      length(normCoords.y - pos.y) < size) {
    return 1.0;
  } else {
    return 0.;
  }
}

float line(vec2 normalised_Coordinate, float funct) {
  return step(funct, normalised_Coordinate.y) -
         step(funct, normalised_Coordinate.y - 0.01));
}

float circle(vec2 pos, float size) {
  size = 1. / size;
  size *= 10.;
  float aspect = resolution.x / resolution.y;

  vec2 normCoord = vec2(gl_FragCoord.x / (resolution.x) * aspect,
                        gl_FragCoord.y / resolution.y);

  float colour = distance(normCoord, pos);
  return smoothstep(colour * size, colour * size + 0.02, 1.);
}

void main() {
  vec2 pos = gl_FragCoord.xy / resolution;
  float y = 0.5 + (sin(pos.x * 6.28) * 0.5);
  vec3 color = vec3(y);

  float rect = square(vec2(0.35, 0.5), 1.);
  float rect2 = square(vec2(0.15, 0.35), 1.);

  float circleOne = circle(vec2(0.2, 0.8), 1.);

  vec3 squareOne = vec3(0.3, 0.1, 0.5) * rect;
  vec3 squareTwo = vec3(0.2, 0.1, 0.15) * rect2;

  float lines = line(pos, y);
  color = vec3(lines, 0.0, 0.0);

  gl_FragColor = vec4(color + squareOne + squareTwo + circleOne, 1.0);
}
