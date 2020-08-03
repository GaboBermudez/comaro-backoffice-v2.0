import Vue from "vue";
import "./pollyfills";
import VueRouter from "vue-router";
import VueRouterPrefetch from "vue-router-prefetch";
import VueNotify from "vue-notifyjs";
import lang from "element-ui/lib/locale/lang/en";
import locale from "element-ui/lib/locale";
import axios from "axios";
import firebase from "firebase/app";
import firebaseConfig from "src/firebase/firebaseConfig";
import App from "./App.vue";

// Plugins
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import SideBar from "./components/UIComponents/SidebarPlugin";
import initProgress from "./progressbar";

// router setup
import routes from "./routes/routes";

// library imports

import "./assets/sass/paper-dashboard.scss";
import "./assets/sass/demo.scss";

import sidebarLinks from "./sidebarLinks";
import "./registerServiceWorker";

// breadcrumbs
import { Breadcrumb, BreadcrumbItem } from "element-ui";

// store
import store from "./store";

Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);

// axios
Vue.prototype.$axios = axios;

// plugin setup
Vue.use(VueRouter);
Vue.use(VueRouterPrefetch);
Vue.use(GlobalDirectives);
Vue.use(GlobalComponents);
Vue.use(VueNotify);
Vue.use(SideBar, { sidebarLinks: sidebarLinks });
locale.use(lang);

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: "active",
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});

// router middleware
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;

  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

initProgress(router);

let app;

firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    new Vue({
      el: "#app",
      render: h => h(App),
      router,
      store
    });
  }
});

/* eslint-disable no-new */
