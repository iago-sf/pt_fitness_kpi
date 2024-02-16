<script setup>
import { onMounted, ref } from "vue"
import gsap from "gsap"
import axios from "axios"
import { useRoute } from "vue-router"

const route = useRoute()

const loaded = ref(false)
const tl = ref(null)

function checkLoaded() {
  if (loaded.value) resolveAnimation()
}

function playLoadingAnimation() {
  let t = 0.36
  tl.value = gsap.timeline({ repeat: -1, yoyo: true, onRepeat: checkLoaded })
  tl.value
    .fromTo("#bar", { x: 0 }, { duration: t, x: 180, ease: "power2.inOut" })
    .fromTo(
      "#bar",
      { scaleX: 0.05, transformOrigin: "0% 0%" },
      { duration: t / 2, scaleX: 1, transformOrigin: "0% 0%", ease: "power2.inOut" }
    )
    .fromTo(
      "#bar",
      { scaleX: 1 },
      { duration: t / 2, scaleX: 0.05, transformOrigin: "100% 0%", ease: "power2.inOut" }
    )
}

function resolveAnimation() {
  let t = 0.3
  tl.value.kill()
  gsap.set("#bar", { width: 0, scaleX: 1, x: 0 })

  gsap
    .timeline()
    .to("#bar", 0.18, { width: 240, backgroundColor: "#FF8740", ease: "power2.out" })
    .to("#bar", 0.14, { scaleX: 0.28, transformOrigin: "50% 0%", ease: "power2.out" })
    .to("#text", 0.14, { autoAlpha: 0, ease: "power2.out" }, 0)
    .to("#loader", 1, { top: "200px", ease: "power2.out" })
}

onMounted(() => {
  playLoadingAnimation()
  getRedirect()
})

const getRedirect = async () => {
  const { data } = await axios.get("/api/redirect/" + route.params.id)

  if (data.url) window.location.href = data.url
  else window.location.href = "/"
}
</script>

<template>
  <div class="relative h-screen bg-primer">
    <div id="loader" class="Loader" @click="loaded = true">
      <div class="Loader_Container">
        <div id="bar" class="Loader_Bar"></div>
        <div id="text" class="Loader_Text">Redirecting...</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.Loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.Loader_Container {
  width: 240px;
  position: relative;
}

.Loader_Bar {
  width: 60px;
  height: 6px;
  background-color: black;
}

.Loader_Text {
  color: #f4f4f4;
  font-size: 38px;
  font-family: "Verdana";
  font-weight: 700;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  white-space: nowrap;
}
</style>
