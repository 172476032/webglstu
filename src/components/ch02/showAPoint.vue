<template>
  <div class="swapper">
    <canvas id="webgl"
            width="400px"
            height="400px"></canvas>
  </div>
</template>

<script>
import vShaderSource from "@/shaders/vshowAPoint.glsl";
import fShaderSource from "@/shaders/fshowAPoint.glsl";
import { initShaders } from "@/libs/myWebglUtils.js";

export default {
  data() {
    return {};
  },
  components: {},
  mounted() {
    console.log("glsl", vShaderSource);
    this.loadPoint();
  },
  computed: {},
  methods: {
    loadPoint() {
      let canvas = document.getElementById("webgl");
      let gl = canvas.getContext("webgl");
      if (!gl) {
        alert("获取浏览器webgl上下文失败");
      }

      //初始化顶点着色器和片元着色器
      if (!initShaders(gl, vShaderSource, fShaderSource)) {
        alert("着色器初始化失败");
      }
      //指定删除颜色
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.POINTS, 0, 1);
    }
  },
  destroyed() {}
};
</script>

<style >
</style>
