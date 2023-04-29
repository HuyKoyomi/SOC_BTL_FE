import MainLayout from "@layout/MainLayout";
import { lazy } from "react";

const CommonRoutes = [
  {
    path: "/",
    name: "Đăng nhập",
    layout: null,
    component: lazy(() => import("./Login")),
    isPublic: true,
    exact: true,
  },
  {
    path: "/home",
    name: "Home",
    layout: MainLayout,
    component: lazy(() => import("./Home")),
    isPublic: true,
    exact: true,
  },
];
export default CommonRoutes;
