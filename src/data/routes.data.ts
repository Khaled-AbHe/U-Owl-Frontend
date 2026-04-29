import { signInAction } from "../actions/sign-in.action";
import signOutAction from "../actions/sign-out.action";
import { signUpAction } from "../actions/sign-up.action";
import signInLoader from "../loaders/login.loader";
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

export const routes = [
  {
    isIndex: true,
    label: "Home",
    path: "/",
    element: Home,
    action: undefined,
    loader: undefined,
  },
  {
    isIndex: false,
    label: "Truck",
    path: "/trucks",
    element: Trucks,
    action: undefined,
    loader: undefined,
  },
  {
    isIndex: false,
    label: "Trailer",
    path: "/trailers",
    element: Trailers,
    action: undefined,
    loader: undefined,
  },
  {
    isIndex: false,
    label: "Reservations",
    path: "/reservations",
    element: Reservations,
    action: undefined,
    loader: undefined,
  },
  {
    isIndex: false,
    label: "Become A Dealer",
    path: "/joinDealer",
    element: BecomeAdealer,
    action: undefined,
    loader: undefined,
  },
  {
    isIndex: false,
    label: "Find Location",
    path: "/location",
    element: Location,
    action: undefined,
    loader: undefined,
  },
  {
    isIndex: false,
    label: "Sign In",
    path: "/auth/signIn",
    element: SignIn,
    action: signInAction,
    loader: signInLoader,
  },
  {
    isIndex: false,
    label: "Sign Up",
    path: "/auth/signUp",
    element: SignUp,
    action: signUpAction,
    loader: undefined,
  },
  {
    isIndex: false,
    label: "Sign Out",
    path: "/auth/signOut",
    element: undefined,
    action: signOutAction,
    loader: undefined,
  },
  {
    isIndex: false,
    label: "Cart",
    path: "/cart",
    element: Cart,
    action: undefined,
    loader: undefined,
  },
];
