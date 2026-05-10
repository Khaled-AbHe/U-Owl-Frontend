import { signInAction } from "../data/actions/Auth/sign-in.action";
import signOutAction from "../data/actions/Auth/sign-out.action";
import { signUpAction } from "../data/actions/Auth/sign-up.action";
import { createUserAction } from "../data/actions/UserManager/create-user.action";
import { updateUserAction } from "../data/actions/UserManager/update-user.action";
import { deleteUserAction } from "../data/actions/UserManager/delete-user.action";
import { cartPayAction } from "../data/actions/Cart/cart-pay.action";
import { removeOrderItemAction } from "../data/actions/Cart/remove-vehicle.action";
import { dealerFormAction } from "../data/actions/DealerForm/dealer-form.action";
import { BecomeAdealer, Cart, Home, Location, SignIn, SignUp, Vehicles } from "../pages";
import LocationDashboard from "../pages/Admin/Location/location-dashboard.page";
import SuperDashboard from "../pages/Admin/Super/Dashboard/super-dashboard.page";
import UserManager from "../pages/Admin/Super/UserManager/user-manager.page";
import cartLoader from "./loaders/client/cart.loader";
import locationAdminLoader from "./loaders/admin/location/location-admin.loader";
import signInLoader from "./loaders/auth/login.loader";
import mainLayoutLoader from "./loaders/client/main-layout.loader";
import superAdminLoader from "./loaders/admin/super/super-admin.loader";
import userManagerLoader from "./loaders/admin/super/user-manager.loader";
import vehiclesLoader from "./loaders/vehicles/vehicles.loader";
import AdminLayout from "../layouts/admin.layout";
import MainLayout from "../layouts/main.layout";
import AuthLayout from "../layouts/auth.layout";
import VehicleManager from "../pages/Admin/Super/VehicleManager/vehicle-manager.page";
import { createVehicleAction } from "./actions/VehicleManager/create-vehicle.action";
import { deleteVehicleAction } from "./actions/VehicleManager/delete-vehicle.action";
import { updateVehicleAction } from "./actions/VehicleManager/update-vehicle.action";
import vehicleManagerLoader from "./loaders/admin/super/vehicle-manager.loader";

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
    loader: vehiclesLoader,
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
  {
    isIndex: false,
    label: "Users",
    path: "users",
    element: UserManager,
    action: undefined,
    loader: userManagerLoader,
  },
  {
    isIndex: false,
    label: "Create User",
    path: "users/create",
    element: undefined,
    action: createUserAction,
    loader: undefined,
  },
  {
    isIndex: false,
    label: "Update User",
    path: "users/update",
    element: undefined,
    action: updateUserAction,
    loader: undefined,
  },
  {
    isIndex: false,
    label: "Delete User",
    path: "users/delete",
    element: undefined,
    action: deleteUserAction,
    loader: undefined,
  },
  {
    isIndex: false,
    label: "Vehicles",
    path: "vehicles",
    element: VehicleManager,
    action: undefined,
    loader: vehicleManagerLoader,
  },
  {
    isIndex: false,
    label: "Create Vehicle",
    path: "vehicles/create",
    element: undefined,
    action: createVehicleAction,
    loader: undefined,
  },
  {
    isIndex: false,
    label: "Update Vehicle",
    path: "vehicles/update",
    element: undefined,
    action: updateVehicleAction,
    loader: undefined,
  },
  {
    isIndex: false,
    label: "Delete Vehicle",
    path: "vehicles/delete",
    element: undefined,
    action: deleteVehicleAction,
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
