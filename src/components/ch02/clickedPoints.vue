<template>
  <div class="swapper"
       style="border:1px solid red">
    <canvas id="webgl"
            width="400px"
            height="400px"></canvas>
  </div>
</template>

<script>
import vShaderSource from "@/shaders/vshowAPointByVar.glsl";
import fShaderSource from "@/shaders/fshowAPointByVar.glsl";
import { initShaders } from "@/libs/myWebglUtils.js";

export default {
  data() {
    return {};
  },
  components: {},
  mounted() {
    console.log("glsl", vShaderSource, fShaderSource);
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
      gl.clearColor(1.0, 0.0, 1.0, 1.0);
      //清除颜色缓冲区，设置背景色
      gl.clear(gl.COLOR_BUFFER_BIT);
      //注册点击事件
      canvas.onclick = evt => {
        console.log("evt: ", evt);
        let rect = evt.target.getBoundingClientRect();
        console.log("rect: ", rect);
      };

      //从webgl系统程序对象里面获取position存储的位置
      let a_position = gl.getAttribLocation(gl.program, "position");
      if (a_position < 0) {
        alert("获取a_position位置属性失败");
      }
      //将顶点位置传给attribute对象
      gl.vertexAttrib3f(a_position, 0.0, 0.0, 0.0, 1.0);
      //从webgl系统程序对象里面获取pointSize存储的位置
      let a_pointSize = gl.getAttribLocation(gl.program, "pointSize");
      if (a_pointSize < 0) {
        alert("获取a_pointSize位置属性失败");
      }
      //将顶点大小传给sttribute对象
      gl.vertexAttrib1f(a_pointSize, 10.0);
      //从webgl系统程序对象里面获取fragcolor存储的位置
      let a_fragColor = gl.getUniformLocation(gl.program, "color"); //此方法无任何属性和方法
      if (a_fragColor < 0) {
        alert("获取a_fragColor位置属性失败");
      }
      //将颜色设置传给sttribute对象
      gl.uniform4f(a_fragColor, 0.0, 1.0, 0.0, 1.0);

      gl.drawArrays(gl.POINTS, 0, 1);
    }
  },
  destroyed() {}
};
</script>

<style >
</style>
