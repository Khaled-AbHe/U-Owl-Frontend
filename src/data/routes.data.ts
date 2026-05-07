import { signInAction } from "../actions/sign-in.action";
import signOutAction from "../actions/sign-out.action";
import { signUpAction } from "../actions/sign-up.action";
import AdminLayout from "../layouts/AdminLayout";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import clientPageLoader from "../loaders/client-page.loader";
import locationAdminLoader from "../loaders/location-admin.loader";
import signInLoader from "../loaders/login.loader";
import mainLayoutLoader from "../loaders/main-layout.loader";
import superAdminLoader from "../loaders/super-admin.loader";
import {
  BecomeAdealer,
  Cart,
  Home,
  Location,
  Reservations,
  SignIn,
  SignUp,
  Vehicles,
} from "../pages";
import LocationDashboard from "../pages/Admin/Location/location-dashboard.page";
import SuperDashboard from "../pages/Admin/Super/super-dashboard.page";
import { getAllVehicles } from "../services/api";

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
    loader: () => getAllVehicles(),
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
    label: "Reservations",
    path: "reservations",
    element: Reservations,
    action: undefined,
    loader: clientPageLoader,
  },
  {
    isIndex: false,
    label: "Become A Dealer",
    path: "joinDealer",
    element: BecomeAdealer,
    action: undefined,
    loader: clientPageLoader,
  },
  {
    isIndex: false,
    label: "Cart",
    path: "cart",
    element: Cart,
    action: undefined,
    loader: clientPageLoader,
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
]

export const superRoutes = [
  {
    isIndex: true,
    label: "Dashboard",
    path: "dashboard",
    element: SuperDashboard,
    action: undefined,
    loader: undefined,
  },
]

export const locationRoutes = [
  {
    isIndex: true,
    label: "Dashboard",
    path: "dashboard",
    element: LocationDashboard,
    action: undefined,
    loader: undefined,
  },
]

export const routes = [
  {
    path: "/",
    element: MainLayout,
    loader: mainLayoutLoader,
    subroutes: mainRoutes
  },
  {
    path: "/auth",
    element: AuthLayout,
    loader: undefined,
    subroutes: authRoutes
  },
  {
    path: "/superAdmin",
    element: AdminLayout,
    loader: superAdminLoader,
    subroutes: superRoutes
  },
  {
    path: "/locationAdmin",
    element: AdminLayout,
    loader: locationAdminLoader,
    subroutes: locationRoutes
  },
]