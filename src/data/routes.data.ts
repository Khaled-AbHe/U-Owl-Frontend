import { signInAction } from "../actions/sign-in.action";
import signOutAction from "../actions/sign-out.action";
import { signUpAction } from "../actions/sign-up.action";
import MainLayout from "../layouts/MainLayout";
import signInLoader from "../loaders/login.loader";
import mainLayoutLoader from "../loaders/main-layout.loader";
import {
  BecomeAdealer,
  Cart,
  Home,
  Location,
  Reservations,
  SignIn,
  SignUp,
  Trailers,
  Trucks,
} from "../pages";
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
    label: "Truck",
    path: "trucks",
    element: Trucks,
    action: undefined,
    loader: undefined,
  },
  {
    isIndex: false,
    label: "Trailer",
    path: "trailers",
    element: Trailers,
    action: undefined,
    loader: undefined,
  },
  {
    isIndex: false,
    label: "Reservations",
    path: "reservations",
    element: Reservations,
    action: undefined,
    loader: undefined,
  },
  {
    isIndex: false,
    label: "Become A Dealer",
    path: "joinDealer",
    element: BecomeAdealer,
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
    label: "Cart",
    path: "cart",
    element: Cart,
    action: undefined,
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
    element: undefined,
    loader: undefined,
    subroutes: authRoutes
  },
  {
    path: "/superAdmin",
    element: undefined,
    loader: undefined,
    subroutes: superRoutes
  },
  {
    path: "/locationAdmin",
    element: undefined,
    loader: undefined,
    subroutes: locationRoutes
  },
]