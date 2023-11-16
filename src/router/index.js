// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("@/components/LogIn.vue"),
  },
  {
    path: "/Home",
    name: "Home",

    component: () => import("@/layouts/default/NavMenu.vue"),
    children: [
      {
        path: "/AccountManagement",
        name: "AccountManagement",
        component: () => import("../components/AccountManagement.vue"),
      },
      {
        path: "/StudentManagement",
        name: "StudentManagement",
        component: () => import("../components/StudentManagement.vue"),
      },
      {
        path: "/coursemanagement",
        name: "coursemanagement",
        component: () => import("@/components/CourseManagement.vue"),
      },
      {
        path: "/ArticleManagement",
        name: "ArticleManagement",
        component: () => import("@/components/ArticleManagement.vue"),
      },

      // Các tuyến đường khác của ứng dụng nếu cần
    ],
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
