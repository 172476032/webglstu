<template>
  <div class="rotateCube">

  </div>
</template>

<script>
import * as THREE from "three";
export default {
  data() {
    return {
      scene: null,
      camera: null,
      render: null,
      cube: null
    };
  },
  components: {},
  mounted() {
    console.log("THREE", THREE);
    this.main();
  },
  computed: {},
  methods: {
    main() {
      this.initThree();
      // this.addCube();
      this.addLine();
      // this.animate();
    },
    initThree() {
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      this.render = new THREE.WebGLRenderer();
      this.render.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(this.render.domElement);
    },
    addCube() {
      let geo = new THREE.BoxGeometry(1, 1, 1);
      let material = new THREE.MeshBasicMaterial({
        color: 0x00ff00
      });
      this.cube = new THREE.Mesh(geo, material);
      this.scene.add(this.cube);
      this.camera.position.z = 5;
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.cube.rotateX(0.01);
      this.cube.rotateY(0.01);
      this.render.render(this.scene, this.camera);
    },
    addLine() {
      let geometry = new THREE.Geometry();
      geometry.vertices.push(new THREE.Vector3(-1, 0, 0));
      geometry.vertices.push(new THREE.Vector3(0, 1, 0));
      geometry.vertices.push(new THREE.Vector3(1, 0, 0));
      let material = new THREE.LineBasicMaterial({ color: 0x0000ff });
      let line = new THREE.Line(geometry, material);
      this.scene.add(line);
      this.render.render(this.scene, this.camera);
    }
  },
  destroyed() {}
};
</script>

<style lang="scss">
</style>
