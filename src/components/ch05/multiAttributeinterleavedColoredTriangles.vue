<template>
  <div class="swapper"
       style="border:1px solid red">
    <canvas id="webgl"
            width="400px"
            height="400px"></canvas>
  </div>
</template>

<script>
import vShaderSource from "@/shaders/vmultiAttributeinterleavedColor.glsl";
import fShaderSource from "@/shaders/fmultiAttributeinterleavedColor.glsl";
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
    initVertexBuffers(gl, array, a_position,a_pointSize,a_color) {
      let verties = new Float32Array(array);
      let fsize = verties.BYTES_PER_ELEMENT;
      var num = array.length / 6;
      //创建缓冲区对象
      let vertexBuffer = gl.createBuffer();
      if (!vertexBuffer) {
        alert("创建缓冲区对象失败");
        return -1;
      }
      //绑定缓冲区对象到目标
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      //向缓冲区对象写入数据
      gl.bufferData(gl.ARRAY_BUFFER, verties, gl.STATIC_DRAW);
      //缓冲区对象分配给webgl系统的程序对象内的变量
      gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, fsize*6, 0);
      //连接index变量与分配给他的缓冲区对象
      gl.enableVertexAttribArray(a_position);    
      //将顶点大小传给sttribute对象
      gl.vertexAttribPointer(a_pointSize, 1, gl.FLOAT, false, fsize*6, fsize*2);
       //连接index变量与分配给他的缓冲区对象
      gl.enableVertexAttribArray(a_pointSize);
         //将顶点大小传给sttribute对象
      gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, fsize*6, fsize*3);
       //连接index变量与分配给他的缓冲区对象
      gl.enableVertexAttribArray(a_color);
      return num;
    },
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
      //从webgl系统程序对象里面获取position存储的位置
      let a_pointSize = gl.getAttribLocation(gl.program, "pointSize");
      if (a_pointSize < 0) {
        alert("获取a_pointSize位置属性失败");
      }
      //从webgl系统程序对象里面获取position存储的位置
      let a_color = gl.getAttribLocation(gl.program, "a_color");
      if (a_color < 0) {
        alert("获取a_color位置属性失败");
      }
      //初始化顶点缓冲区
      let num = this.initVertexBuffers(
        gl,
        [0.5, 0.5, 10.0,1.0,0.0,0.0,0.5, 0.3,20.0,0.0,1.0,0.0, -0.5, 0.6,30.0,0.0,0.0,1.0],
        a_position,
        a_pointSize,
        a_color
      );

      //将顶点位置传给attribute对象
      // gl.vertexAttrib3f(a_position, 0.0, 0.0, 0.0, 1.0);
    
      //从webgl系统程序对象里面获取fragcolor存储的位置
      let a_fragColor = gl.getUniformLocation(gl.program, "color"); //此方法无任何属性和方法
      if (a_fragColor < 0) {
        alert("获取a_fragColor位置属性失败");
      }
      //将颜色设置传给sttribute对象
      gl.uniform4f(a_fragColor, 0.0, 1.0, 0.0, 1.0);

      gl.drawArrays(gl.TRIANGLES, 0, num);
    }
  },
  destroyed() {}
};
</script>

<style >
</style>
