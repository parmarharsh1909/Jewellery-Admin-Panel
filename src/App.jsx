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
import AddMensProduct from "./modules/products/AddMensProduct";
import ListMensProducts from "./modules/products/ListMensProducts";
import EditMensProduct from "./modules/products/EditMensProducts";
import EditWomensProduct from "./modules/products/EditWomensProduct";
import AddWomensProduct from "./modules/products/AddWomensProduct";
import ListWomensProducts from "./modules/products/ListWomensProducts";
import ViewProduct from "./modules/products/ViewProduct";
// import MensOrders from './modules/orders/MensOrders';
import Orders from "./modules/orders/Orders";
import WomensOrders from "./modules/orders/WomensOrders";
import Users from "./modules/user/Users";
import Offers from "./modules/offers/Offers";
import Payments from "./modules/payments/Payments";
import Feedback from "./modules/feedback/Feedback";
import Settings from "./modules/settings/Settings";
import Inquiries from "./modules/inquiries/Inquiries";
// import { User, Users as UsersIcon } from "lucide-react";

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
          <Route path="products/view/:id" element={<ViewProduct />} />
          <Route path="products/mens/edit/:id" element={<EditMensProduct />} />
          <Route
            path="products/womens/edit/:id"
            element={<EditWomensProduct />}
          />
          <Route path="products/mens/add" element={<AddMensProduct />} />
          <Route path="products/mens/manage" element={<ListMensProducts />} />
          <Route path="products/womens/add" element={<AddWomensProduct />} />
          <Route
            path="products/womens/manage"
            element={<ListWomensProducts />}
          />
          {/* <Route path="orders/mens" element={<MensOrders />} /> */}
          <Route path="orders/womens" element={<WomensOrders />} />
          <Route path="/orders/manageorder" element={<Orders />} />
          <Route path="users/manage" element={<Users />} />
          <Route path="payments" element={<Payments />} />
          <Route path="offers" element={<Offers />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="inquiries" element={<Inquiries />} />
          <Route path="settings" element={<Settings />} />
          <Route path="logout" element={<Navigate to="/login" replace />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
