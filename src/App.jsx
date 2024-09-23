import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";

import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Checkin from "./pages/Checkin";
import ProtectedRoute from "./ui/ProtectedRoute";

import PageNotFound from "./pages/PageNotFound";

import AppLayout from "./ui/AppLayout";
import { Toaster } from "react-hot-toast";
import Booking from "./pages/Booking";

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="/dashboard" />} />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/bookings/:bookingId" element={<Booking />} />

            <Route path="/cabins" element={<Cabins />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/users" element={<Users />} />
            <Route path="/checkin/:bookingId" element={<Checkin />} />
            <Route path="/account" element={<Account />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Toaster
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
            },
          }}
          gutter={12}
          position="top-center"
        />
      </BrowserRouter>
    </>
  );
}

export default App;
