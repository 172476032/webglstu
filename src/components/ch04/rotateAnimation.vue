<template>
  <div class="swapper">
    <canvas id="webgl"
            width="400px"
            height="400px"></canvas>
  </div>
</template>

<script>
import vShaderSource from "@/shaders/vRotateAnimation.glsl";
import fShaderSource from "@/shaders/fRotateAnimation.glsl";
import { initShaders } from "@/libs/myWebglUtils.js";
import Matrix4 from "@/libs/cuon-matrix.js";

export default {
  data() {
    return {
      ctgl: null,
      angle: 0
    };
  },
  components: {},
  mounted() {
    console.log("glsl", vShaderSource, fShaderSource);
    this.loadPoint();
  },
  computed: {},
  methods: {
    //矩阵变化：旋转angle度
    rotateMatrix(gl, angle) {
      let matrix = new Matrix4();
      let rotateMatrix = matrix.setRotate(angle, 0.0, 0.0, 1.0);
      let rotatemat4 = gl.getUniformLocation(gl.program, "rotatemat4");
      if (rotatemat4 < 0) {
        alert("获取rotatemat4位置属性失败");
      }
      gl.uniformMatrix4fv(rotatemat4, false, rotateMatrix.elements);
    },
    initVertexBuffers(gl, array, index) {
      let verties = new Float32Array(array);
      var num = array.length / 2;
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
      gl.vertexAttribPointer(index, 2, gl.FLOAT, false, 0, 0);
      //连接index变量与分配给他的缓冲区对象
      gl.enableVertexAttribArray(index);
      return num;
    },
    loadPoint() {
      let canvas = document.getElementById("webgl");
      let gl = canvas.getContext("webgl");
      this.ctgl = gl;
      if (!gl) {
        alert("获取浏览器webgl上下文失败");
      }
      //初始化顶点着色器和片元着色器
      if (!initShaders(gl, vShaderSource, fShaderSource)) {
        alert("着色器初始化失败");
      }
      //注册点击事件
      canvas.onclick = evt => {
        console.log("evt: ", evt);
        let rect = evt.target.getBoundingClientRect();
        console.log("rect: ", rect);
      };
      this.tick();
    },
    tick(timestrap) {
      console.log(timestrap);
      this.draw(this.ctgl);
      window.requestAnimationFrame(this.tick);
    },
    draw(gl) {
      //指定删除颜色
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      //清除颜色缓冲区，设置背景色
      gl.clear(gl.COLOR_BUFFER_BIT);
      //旋转一定的角度
      this.rotateMatrix(gl, this.angle);
      //从webgl系统程序对象里面获取position存储的位置
      let a_position = gl.getAttribLocation(gl.program, "position");
      if (a_position < 0) {
        alert("获取a_position位置属性失败");
      }
      //初始化顶点缓冲区
      let num = this.initVertexBuffers(
        gl,
        [0.5, 0.5, 0.5, 0.3, -0.5, 0.6],
        a_position,
        this.angle
      );
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
      gl.drawArrays(gl.TRIANGLES, 0, num);
      this.angle += 5;
    }
  },
  destroyed() {}
};
</script>

<style >
</style>
