 attribute vec4 position ;
 attribute float pointSize;
 uniform mat4 rotatemat4 ;
 void main() {
  gl_Position = rotatemat4*position;
  gl_PointSize =pointSize;
  }