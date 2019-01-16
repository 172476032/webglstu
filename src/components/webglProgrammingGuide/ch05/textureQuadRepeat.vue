<template>
  <div class="swapper">
    <canvas width="400px"
            id="webgl"
            height="400px"></canvas>
  </div>
</template>

<script>
import vShaderSource from "@/shaders/vTextureQuad.glsl";
import fShaderSource from "@/shaders/fTextureQuad.glsl";
import { initShaders } from "@/libs/myWebglUtils.js";
export default {
  data() {
    return {};
  },
  components: {},
  mounted() {
    console.log("glsl", vShaderSource, fShaderSource);
    this.main();
  },
  computed: {},
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
      gl.clear(gl.COLOR_BUFFER_BIT);

      //配置顶点坐标
      let n = this.initVertexBuffers(gl);
      if (n < 0) {
        console.log("Failed to set the vertex information");
        return;
      }
      // Set texture
      if (!this.initTextures(gl, n)) {
        console.log("Failed to intialize the texture.");
        return;
      }

      //片元着色器将对应的纹素从纹理抽取出来，并赋给片元
    },
    initTextures(gl, n) {
      let texture = gl.createTexture();
      if (!texture) {
        console.log("Failed to create the texture object");
        return false;
      }
      //获取u_sampler
      let u_sampler = gl.getUniformLocation(gl.program, "u_sampler");
      if (!u_sampler) {
        console.log("Failed to get the storage location of u_Sampler");
        return false;
      }
      let img = new Image();
      if (!img) {
        console.log("Failed to create the image object");
        return false;
      }
      img.onload = () => {
        this.loadTexture(gl, n, texture, u_sampler, img);
      };
      img.src = "../../../static/resources/sky.JPG";
      return true;
    },
    //加载纹理图像
    loadTexture(gl, n, texture, u_sampler, img) {
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
      gl.uniform1i(u_sampler, 0);
      gl.clear(gl.COLOR_BUFFER_BIT); // Clear <canvas>
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, n); // Draw the rectangle
    },
    initVertexBuffers(gl) {
      let verticesTexCoords = new Float32Array([
        // Vertex coordinates, texture coordinate
        -0.5,
        0.5,
        -0.3,
        1.7,
        -0.5,
        -0.5,
        -0.3,
        -0.2,
        0.5,
        0.5,
        1.7,
        1.7,
        0.5,
        -0.5,
        1.7,
        -0.2
      ]);
      let n = 4; // The number of vertices

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
      //Get the storage location of a_Position, assign and enable buffer
      let a_Position = gl.getAttribLocation(gl.program, "a_position");
      if (a_Position < 0) {
        console.log("Failed to get the storage location of a_position");
        return -1;
      }
      gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 4, 0);
      gl.enableVertexAttribArray(a_Position); // Enable the assignment of the buffer object

      // Get the storage location of a_TexCoord
      let a_TexCoord = gl.getAttribLocation(gl.program, "a_texcoord");
      if (a_TexCoord < 0) {
        console.log("Failed to get the storage location of a_texcoord");
        return -1;
      }
      // Assign the buffer object to a_TexCoord letiable
      gl.vertexAttribPointer(
        a_TexCoord,
        2,
        gl.FLOAT,
        false,
        FSIZE * 4,
        FSIZE * 2
      );
      gl.enableVertexAttribArray(a_TexCoord); // Enable the assignment of the buffer object

      return n;
    }
  },
  destroyed() {}
};
</script>

<style >
</style>
