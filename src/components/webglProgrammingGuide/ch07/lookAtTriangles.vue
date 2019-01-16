<template>
  <div class="">
    <canvas width="600px"
            height="600px"
            id='webgl'></canvas>
  </div>
</template>

<script>
import vShaderSource from "@/shaders/vLookAtTriangles.glsl";
import fShaderSource from "@/shaders/fLookAtTriangles.glsl";
import { initShaders } from "@/libs/myWebglUtils.js";
import Matrix from "@/libs/cuon-matrix.js";
export default {
  data() {
    return {};
  },
  components: {},
  mounted() {
    this.main();
  },
  methods: {
    main() {
      let canvas = document.getElementById("webgl");
      let gl = canvas.getContext("webgl");
      if (!gl) {
        console("获取浏览器webgl上下文失败");
      }
      //初始化顶点着色器和片元着色器
      if (!initShaders(gl, vShaderSource, fShaderSource)) {
        console("着色器初始化失败");
      }
      //指定删除颜色
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      //清除颜色缓冲区，设置背景色
      //初始化顶点缓冲区
      let n = this.initVertexBuffers(gl);
      if (n < 0) {
        console.log("Failed to set the vertex information");
        return;
      }
      gl.clear(gl.COLOR_BUFFER_BIT); // Clear <canvas>
      gl.drawArrays(gl.TRIANGLES, 0, n); // Draw the rectangle
    },
    initVertexBuffers(gl) {
      let verticesTexCoords = new Float32Array([
        // Vertex coordinates and color(RGBA)
        0.0,
        0.5,
        -0.4,
        0.4,
        1.0,
        0.4, // The back green one
        -0.5,
        -0.5,
        -0.4,
        0.4,
        1.0,
        0.4,
        0.5,
        -0.5,
        -0.4,
        1.0,
        0.4,
        0.4,

        0.5,
        0.4,
        -0.2,
        1.0,
        0.4,
        0.4, // The middle yellow one
        -0.5,
        0.4,
        -0.2,
        1.0,
        1.0,
        0.4,
        0.0,
        -0.6,
        -0.2,
        1.0,
        1.0,
        0.4,

        0.0,
        0.5,
        0.0,
        0.4,
        0.4,
        1.0, // The front blue one
        -0.5,
        -0.5,
        0.0,
        0.4,
        0.4,
        1.0,
        0.5,
        -0.5,
        0.0,
        1.0,
        0.4,
        0.4
      ]);
      console.log("11");
      // Create the buffer object
      let vertexTexCoordBuffer = gl.createBuffer();
      if (!vertexTexCoordBuffer) {
        console.log("Failed to create the buffer object");
        return -1;
      }
      // Bind the buffer object to target
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexCoordBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, verticesTexCoords, gl.STATIC_DRAW);
      let FSIZE = verticesTexCoords.BYTES_PER_ELEMENT;
      //缓冲区对象与webgl系统程序对象变量绑定
      let a_position = gl.getAttribLocation(gl.program, "a_position");
      if (a_position < 0) {
        console.log("Failed to get the storage location of a_position");
        return -1;
      }
      gl.vertexAttribPointer(a_position, 3, gl.FLOAT, false, FSIZE * 6, 0);
      gl.enableVertexAttribArray(a_position); // Enable the assignment of the buffer object
      let a_color = gl.getAttribLocation(gl.program, "a_color");
      if (a_color < 0) {
        console.log("Failed to get the storage location of a_color");
        return -1;
      }
      gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
      gl.enableVertexAttribArray(a_color);

      //确定观看视角、视线、上方向等构成的矩阵
      let viewMatrix = new Matrix();
      viewMatrix.setLookAt(0.5, 0.5, 0.2, 0, 0, 0, 0, 0.5, 0);
      let u_viewMatrix = gl.getUniformLocation(gl.program, "u_viewMatrix");
      if (!u_viewMatrix) {
        console.log("Failed to get the storage locations of u_ViewMatrix");
        return;
      }
      gl.uniformMatrix4fv(u_viewMatrix, false, viewMatrix.elements);
      // Unbind the buffer object
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
      return 9;
    }
  },
  destroyed() {}
};
</script>

<style >
</style>
