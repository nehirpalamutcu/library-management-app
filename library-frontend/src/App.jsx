import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/ MainLayout";
import AuthorsPage from "./pages/AuthorsPage";
import BorrowingsPage from "./pages/BorrowingsPage";
import FinesPage from "./pages/FinesPage";
import UserPage from "./pages/UserPage";
function App() {
  const isLoggedIn = !!localStorage.getItem("user");

  return (
    <Router>
      <Routes>
        {/* Root redirects to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login page - no navbar here */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes with layout */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/authors"
          element={
            <ProtectedRoute>
              <MainLayout>
                <AuthorsPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/borrowings"
          element={
            <ProtectedRoute>
              <MainLayout>
                <BorrowingsPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
        path="/fines"
          element={
           <ProtectedRoute>
             <MainLayout>
               <FinesPage />
             </MainLayout>
           </ProtectedRoute>
  }
           />
           <Route
        path="/user"
          element={
           <ProtectedRoute>
             <MainLayout>
               <UserPage />
             </MainLayout>
           </ProtectedRoute>
  }
           />
           

        {/* Catch-all route */}
        <Route
          path="*"
          element={
            isLoggedIn ? (
              <MainLayout>
                <NotFound />
              </MainLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
