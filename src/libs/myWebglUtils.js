/**
 * 初始化着色器
 * @param {*} gl 
 * @param {*} type 
 * @param {*} shaderSource  GLSL ES 字符串
 */
const createShader = (gl, type, shaderSource) => {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, shaderSource); //shaderSource着色器字符串，绑定着色器字符串源码
  gl.compileShader(shader) //用于编译一个GLSL着色器，使其成为为二进制数据
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert("着色器对象编译失败")
  }
  return shader
}
/**创建程序对象
 * 
 * @param {*} gl 
 * @param {*} vShaderSource  GLSL ES 顶点着色器字符串
 * @param {*} fShaderSource 
 */
const createProgram = (gl, vShaderSource, fShaderSource) => {
  var program = gl.createProgram();
  var vShader = createShader(gl, gl.VERTEX_SHADER, vShaderSource);
  var fShader = createShader(gl, gl.FRAGMENT_SHADER, fShaderSource)
  gl.attachShader(program, vShader);
  gl.attachShader(program, fShader);

  //链接顶点着色器和片元着色器
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    alert("链接顶点着色器和片元着色器失败")
  }
  return program
}
//初始化着色器
const initShaders = (gl, vShaderSource, fShaderSource) => {
  var program = createProgram(gl, vShaderSource, fShaderSource);
  if (!program) {
    alert("webgl程序对象初始化失败")
  }
  gl.useProgram(program);
  gl.program = program
  return program
}
export {
  initShaders
}
