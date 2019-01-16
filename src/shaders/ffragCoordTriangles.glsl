 precision mediump float; //https://blog.csdn.net/wangyuchun_799/article/details/7752322
 uniform float u_width;
 uniform float u_height;
  void main() {
  gl_FragColor = vec4(gl_FragCoord.x /u_width,0.0,gl_FragCoord.y/u_height,1.0);
  }