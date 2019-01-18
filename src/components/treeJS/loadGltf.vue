<template>
  <div class="">
    <canvas width=""></canvas>
  </div>
</template>

<script>
// import * as THREE from "three";
import GLTFLoader from "three-gltf-loader";
export default {
  data() {
    return {
      scene: null,
      camera: null,
      render: null,
      cube: null,
      controls: null
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
        "../../../static/resources/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf",
        gltf => {
          // called when the resource is loaded
          let n = 1;
          gltf.scene.scale.x = n;
          gltf.scene.scale.y = n;
          gltf.scene.scale.z = n;
          this.scene.add(gltf.scene);
          this.scene.background = new THREE.Color("rgb(255,255,255)");
          this.camera.position.x = 0;
          this.camera.position.y = 0;
          this.camera.position.z = 2;
          this.controls = this.addOrbitControls(this.camera);

          this.animate();
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
    },
    registerEvent() {
      document.addEventListener("mousemove", onMousemove, false);
    },
    onMousemove() {},
    addOrbitControls(camera) {
      let controls = new THREE.OrbitControls(camera);
      controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
      controls.dampingFactor = 0.25;
      // controls.screenSpacePanning = false;

      return controls;
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
      this.render.render(this.scene, this.camera);
    }
  },
  destroyed() {}
};
</script>

<style lang="scss">
</style>
