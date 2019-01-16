 attribute vec4 position ;
 attribute float pointSize;
 attribute vec4 a_color;
 void main() {
  gl_Position = position;
  gl_PointSize =pointSize;
  }