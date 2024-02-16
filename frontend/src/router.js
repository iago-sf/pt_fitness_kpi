import { createRouter, createWebHistory } from "vue-router"
import { useAuthStore } from "./store/auth.store"

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/s/:id",
    name: "RedirectShortedUrl",
    component: () => import("@/views/RedirectShortedUrl.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/Register.vue"),
  },
  {
    path: "/logout",
    name: "Logout",
    component: () => import("@/views/Logout.vue"),
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/",
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (authStore.isAuthenticated && (to.name == "Login" || to.name == "Register")) {
    next({ name: "Home" })
  } else {
    next()
  }
})

export default router
