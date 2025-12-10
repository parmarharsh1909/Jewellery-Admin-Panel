import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./modules/auth/Login";
import Dashboard from "./modules/dashboard/Dashboard";
import ListMainCategories from "./modules/categories/ListMainCategories";
import AddMainCategories from "./modules/categories/AddMainCategories";
import EditMainCategories from "./modules/categories/EditMainCategories";
import ListSubCategories from "./modules/categories/ListSubCategories";
import AddSubCategories from "./modules/categories/AddSubCategories";
import EditSubCategories from "./modules/categories/EditSubCategories";
import Products from "./modules/products/Products";
import ManageProduct from "./modules/products/ManageProduct";
import AddMensProduct from "./modules/products/AddMensProduct";
import ManageMensProducts from "./modules/products/ManageMensProducts";
import AddWomensProduct from "./modules/products/AddWomensProduct";
import ManageWomensProducts from "./modules/products/ManageWomensProducts";
import ViewProduct from "./modules/products/ViewProduct";
import EditProduct from "./modules/products/EditProduct";
// import MensOrders from './modules/orders/MensOrders';
import Orders from "./modules/orders/Orders";
// import WomensOrders from './modules/orders/WomensOrders';
import Customers from "./modules/users/users";
import Payments from "./modules/payments/Payments";
import Settings from "./modules/settings/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          {/* Main Categories Routes */}
          <Route path="categories/main/list" element={<ListMainCategories />} />
          <Route path="categories/main/add" element={<AddMainCategories />} />
          <Route
            path="categories/main/edit/:id"
            element={<EditMainCategories />}
          />
          {/* Sub Categories Routes */}
          <Route path="categories/sub/list" element={<ListSubCategories />} />
          <Route path="categories/sub/add" element={<AddSubCategories />} />
          <Route
            path="categories/sub/edit/:id"
            element={<EditSubCategories />}
          />
          <Route path="products" element={<Products />} />
          <Route path="products/manage" element={<ManageProduct />} />
          <Route path="products/view/:id" element={<ViewProduct />} />
          <Route path="products/edit/:id" element={<EditProduct />} />
          <Route path="products/mens/add" element={<AddMensProduct />} />
          <Route path="products/mens/manage" element={<ManageMensProducts />} />
          <Route path="products/womens/add" element={<AddWomensProduct />} />
          <Route
            path="products/womens/manage"
            element={<ManageWomensProducts />}
          />
          {/* <Route path="orders/mens" element={<MensOrders />} /> */}
          {/* <Route path="orders/womens" element={<WomensOrders />} /> */}
          <Route path="/orders/manageorder" element={<Orders />} />
          <Route path="customers/manage" element={<Customers />} />
          <Route path="payments" element={<Payments />} />
          <Route path="settings" element={<Settings />} />
          <Route path="logout" element={<Navigate to="/login" replace />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
