 attribute vec4 position ;
 attribute float pointSize;
 attribute vec4 a_color;
 varying vec4 v_color;
 void main() {
  gl_Position = position;
  gl_PointSize =pointSize;
  v_color=a_color;
  }