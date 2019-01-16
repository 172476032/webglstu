import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import showAPoint from "@/components/webglProgrammingGuide/ch02/showAPoint.vue";
import showAPointbtvar from "@/components/webglProgrammingGuide/ch02/showAPointByVar.vue";
import clickedPoints from "@/components/webglProgrammingGuide/ch02/clickedPoints.vue";
import multiPoints from "@/components/webglProgrammingGuide/ch03/multiPoints.vue";
import triangelematrix from "@/components/webglProgrammingGuide/ch04/triangelematrix.vue";
import rotateAnimation from "@/components/webglProgrammingGuide/ch04/rotateAnimation.vue";
import multiAttributeinterleaved from "@/components/webglProgrammingGuide/ch05/multiAttributeinterleaved.vue";
import multiAttributeinterleavedColor from "@/components/webglProgrammingGuide/ch05/multiAttributeinterleavedColor.vue";
import multiAttributeinterleavedColoredTriangles from "@/components/webglProgrammingGuide/ch05/multiAttributeinterleavedColoredTriangles.vue";
import fragCoordTriangles from "@/components/webglProgrammingGuide/ch05/fragCoordTriangles.vue";
import textureQuad from "@/components/webglProgrammingGuide/ch05/textureQuad.vue"
import textureQuadRepeat from "@/components/webglProgrammingGuide/ch05/textureQuadRepeat.vue"
import lookAtTriangles from "@/components/webglProgrammingGuide/ch07/lookAtTriangles.vue"


//THREE.JS
import rotateCube from "@/components/treeJS/rotateCube.vue"



Vue.use(Router);

export default new Router({
  routes: [{
      path: "/",
      name: "HelloWorld",
      component: HelloWorld
    },
    //THREE.JS
    {
      path: "/threejs/rotateCube",
      name: "rotateCube",
      component: rotateCube
    },

    //webgl编程指南
    {
      path: "/ch07/lookAtTriangles",
      name: "lookAtTriangles",
      component: lookAtTriangles
    },
    {
      path: "/ch02/showapoint",
      name: "showAPoint",
      component: showAPoint
    },
    {
      path: "/ch02/showapointbyvar",
      name: "showapointbyvar",
      component: showAPointbtvar
    },
    {
      path: "/ch02/clickedPoints",
      name: "clickedPoints",
      component: clickedPoints
    },
    {
      path: "/ch03/multiPoints",
      name: "multiPoints",
      component: multiPoints
    },
    {
      path: "/ch04/triangelematrix",
      name: "triangelematrix",
      component: triangelematrix
    },
    {
      path: "/ch04/rotateAnimation",
      name: "rotateAnimation",
      component: rotateAnimation
    },
    {
      path: "/ch05/multiAttributeinterleaved",
      name: "multiAttributeinterleaved",
      component: multiAttributeinterleaved
    },
    {
      path: "/ch05/multiAttributeinterleavedColor",
      name: "multiAttributeinterleavedColor",
      component: multiAttributeinterleavedColor
    },
    {
      path: "/ch05/multiAttributeinterleavedColoredTriangles",
      name: "multiAttributeinterleavedColoredTriangles",
      component: multiAttributeinterleavedColoredTriangles
    },
    {
      path: "/ch05/fragCoordTriangles",
      name: "fragCoordTriangles",
      component: fragCoordTriangles
    }, {
      path: "/ch05/textureQuad",
      name: "textureQuad",
      component: textureQuad
    }, {
      path: "/ch05/textureQuadRepeat",
      name: "textureQuadRepeat",
      component: textureQuadRepeat
    }
  ]
});
