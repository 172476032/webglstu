 attribute vec4 position ;
 attribute float pointSize;
 void main() {
  gl_Position = position;
  gl_PointSize =pointSize;
  }