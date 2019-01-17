<template>
  <div class="">
    <canvas width=""></canvas>
  </div>
</template>

<script>
import * as THREE from "three";
import GLTFLoader from "three-gltf-loader";

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
    this.main();
  },
  computed: {},
  methods: {
    main() {
      this.initThree();
      this.addGltf();
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
    addGltf() {
      const loader = new GLTFLoader();
      loader.load(
        "../../../static/resources/gltf/littlest_tokyo/scene.gltf",
        gltf => {
          // called when the resource is loaded
          this.scene.add(gltf.scene);
          this.camera.position.z = 1000;
          this.render.render(this.scene, this.camera);
        },
        xhr => {
          // called while loading is progressing
          console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
        },
        error => {
          // called when loading has errors
          console.error("An error happened", error);
        }
      );
    }
  },
  destroyed() {}
};
</script>

<style lang="scss">
</style>
