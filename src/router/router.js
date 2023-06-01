import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import store from "@/vuex/store";

import vAuthorization from "@/components/authorization/v-authorization";
import vRegistration from "@/components/registration/v-registration";
import vConfirmRegistration from "@/components/registration/v-confirm-registration";
import vPersonalArea from "@/components/personal-area/v-personal-area";
import vCatalogWrapper from "@/components/catalog/v-catalog-wrapper";
import vCartWrapper from "@/components/cart/v-cart-wrapper";
import vOrderNav from "@/components/order/v-order-nav";
import vOrderWrapper from "@/components/order/order-now/v-order-wrapper";
import vOrderHistoryWrapper from "@/components/order/order-history/v-order-history-wrapper";
import vOrderHistoryMain from "@/components/order/order-history/v-order-history-main";
import vRecoveryPasswordPhone from "@/components/authorization/recovery-password/v-recovery-password-phone";
import vRecoveryPasswordVerificationCode from "@/components/authorization/recovery-password/v-recovery-password-verification-code";
import vRecoveryPasswordNew from "@/components/authorization/recovery-password/v-recovery-password-new";
import vSettings from "@/components/personal-area/v-settings";
import vChangePassword from "@/components/personal-area/change-password/v-change-password";
import vProduct from "@/components/v-product";
import vCompletionRegistration from "@/components/registration/v-completion-registration";
import vBanRegistration from "@/components/registration/v-ban-registration";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/authorization",
      name: "authorization",
      component: vAuthorization,
      meta: { requiresAuth: false },
    },
    {
      path: "/registration",
      name: "registration",
      component: vRegistration,
      props: true,
      meta: { requiresAuth: false },
    },
    {
      path: "/registration/confirmation",
      name: "confirmation",
      component: vConfirmRegistration,
      props: true,
      meta: { requiresAuth: false },
    },
    {
      path: "/personal-area",
      name: "personal-area",
      component: vPersonalArea,
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: "/catalog",
      name: "catalog",
      component: vCatalogWrapper,
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: "/cart",
      name: "cart",
      component: vCartWrapper,
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: "/order-nav",
      name: "order-nav",
      component: vOrderNav,
      meta: { requiresAuth: true },
    },
    {
      path: "/order-now",
      name: "order-now",
      component: vOrderWrapper,
      meta: { requiresAuth: true },
    },
    {
      path: "/order-history",
      name: "order-history",
      component: vOrderHistoryWrapper,
      meta: { requiresAuth: true },
    },
    {
      path: "/order/:id/",
      name: "order-history-main",
      component: vOrderHistoryMain,
      meta: { requiresAuth: true },
    },
    {
      path: "/recovery-password",
      name: "recovery-password",
      component: vRecoveryPasswordPhone,
      meta: { requiresAuth: false },
    },
    {
      path: "/verification-code",
      name: "recovery-password-verification-code",
      component: vRecoveryPasswordVerificationCode,
      meta: { requiresAuth: false },
    },
    {
      path: "/new-password",
      name: "recovery-password-new",
      component: vRecoveryPasswordNew,
      meta: { requiresAuth: false },
    },
    {
      path: "/settings",
      name: "settings",
      component: vSettings,
      meta: { requiresAuth: true },
    },
    {
      path: "/change-password",
      name: "change-password",
      component: vChangePassword,
      meta: { requiresAuth: true },
    },
    {
      path: "/product/:good_id",
      name: "product",
      component: vProduct,
      meta: { requiresAuth: true },
    },
    {
      path: "/registration/completion",
      name: "completion",
      component: vCompletionRegistration,
      meta: { requiresAuth: false },
    },
    {
      path: "/registration/ban",
      name: "ban",
      component: vBanRegistration,
      meta: { requiresAuth: false },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.state.isAuthenticated;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !isAuthenticated) {
    next("/authorization");
  } else {
    store.dispatch("GET_ORDER_FROM_API");
    next();
  }
});

export default router;

const app = createApp({});
app.use(router);
