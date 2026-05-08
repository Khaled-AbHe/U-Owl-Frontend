import { signInAction } from "../actions/Auth/sign-in.action";
import signOutAction from "../actions/Auth/sign-out.action";
import { signUpAction } from "../actions/Auth/sign-up.action";
import { cartPayAction } from "../actions/Cart/cart-pay.action";
import { removeOrderItemAction } from "../actions/Cart/remove-vehicle.action";
import { dealerFormAction } from "../actions/DealerForm/dealer-form.action";
import AdminLayout from "../layouts/AdminLayout";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import cartLoader from "../loaders/cart.loader";
import locationAdminLoader from "../loaders/location-admin.loader";
import signInLoader from "../loaders/login.loader";
import mainLayoutLoader from "../loaders/main-layout.loader";
import superAdminLoader from "../loaders/super-admin.loader";
import { BecomeAdealer, Cart, Home, Location, SignIn, SignUp, Vehicles } from "../pages";
import LocationDashboard from "../pages/Admin/Location/location-dashboard.page";
import SuperDashboard from "../pages/Admin/Super/super-dashboard.page";

export const mainRoutes = [
  {
    isIndex: true,
    label: "Home",
    path: undefined,
    element: Home,
    action: undefined,
    loader: undefined,
  },
  {
    isIndex: false,
    label: "Vehicles",
    path: "vehicles",
    element: Vehicles,
    action: undefined,
    loader: undefined,
  },
  {
    isIndex: false,
    label: "Find Location",
    path: "location",
    element: Location,
    action: undefined,
    loader: undefined,
  },
  {
    isIndex: false,
    label: "Become A Dealer",
    path: "dealer",
    element: BecomeAdealer,
    action: dealerFormAction,
    loader: undefined,
  },
  {
    isIndex: false,
    label: "Cart",
    path: "cart",
    element: Cart,
    action: undefined,
    loader: cartLoader,
  },
  // useFetcher will call these routes to do some functions, so they wont have elements
  {
    isIndex: false,
    label: "Cart Pay",
    path: "cart/pay",
    element: undefined,
    action: cartPayAction,
    loader: undefined,
  },
  {
    isIndex: false,
    label: "Cart Remove",
    path: "cart/remove",
    element: undefined,
    action: removeOrderItemAction,
    loader: undefined,
  },
];

export const authRoutes = [
  {
    isIndex: true,
    label: "Sign In",
    path: "signIn",
    element: SignIn,
    action: signInAction,
    loader: signInLoader,
  },
  {
    isIndex: false,
    label: "Sign Up",
    path: "signUp",
    element: SignUp,
    action: signUpAction,
    loader: undefined,
  },
  {
    isIndex: false,
    label: "Sign Out",
    path: "signOut",
    element: undefined,
    action: signOutAction,
    loader: undefined,
  },
];

export const superRoutes = [
  {
    isIndex: true,
    label: "Dashboard",
    path: "dashboard",
    element: SuperDashboard,
    action: undefined,
    loader: undefined,
  },
];

export const locationRoutes = [
  {
    isIndex: true,
    label: "Dashboard",
    path: "dashboard",
    element: LocationDashboard,
    action: undefined,
    loader: undefined,
  },
];

export const routes = [
  {
    path: "/",
    element: MainLayout,
    loader: mainLayoutLoader,
    subroutes: mainRoutes,
  },
  {
    path: "/auth",
    element: AuthLayout,
    loader: undefined,
    subroutes: authRoutes,
  },
  {
    path: "/superAdmin",
    element: AdminLayout,
    loader: superAdminLoader,
    subroutes: superRoutes,
  },
  {
    path: "/locationAdmin",
    element: AdminLayout,
    loader: locationAdminLoader,
    subroutes: locationRoutes,
  },
];
