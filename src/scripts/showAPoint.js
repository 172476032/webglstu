//顶点着色器
var vShaderSource =
  "void main() {\n" +
  "gl_Position = vec4(0, 0, 0, 1.0);\n" +
  "gl_PointSize = 10.0;\n" +
  "}\n"
//片元着色器
var fShaderSource =
  "void main() {\n" +
  "gl_FragColor = vec4(1.0, 0, 0, 1.0);\n" +
  "}\n"


function main() {
  var canvas = document.getElementById("webgl")
  var gl = canvas.getContext("webgl");
  if (!gl) {
    alert("获取浏览器webgl上下文失败")
  }
  //初始化顶点着色器和片元着色器
  if (!initShaders(gl, vShaderSource, fShaderSource)) {
    alert("着色器初始化失败")
  }
  //指定删除颜色
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  gl.clear(gl.COLOR_BUFF_BIT);
  gl.drawArrays(gl.POINTS, 0, 1)
}