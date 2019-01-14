import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import showAPoint from "@/components/ch02/showAPoint.vue"
import showAPointbtvar from "@/components/ch02/showAPointByVar.vue"
import clickedPoints from "@/components/ch02/clickedPoints.vue"
import multiPoints from "@/components/ch03/multiPoints.vue"
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
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
    }, {
      path: "/ch03/multiPoints",
      name: "multiPoints",
      component: multiPoints
    }

  ]
})
