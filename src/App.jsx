import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import { useUser } from "./UserContext"; // ✅ import user context

// Pages
import Home from "./pages/Home";
import AddItem from "./pages/AddItem";
import ViewItems from "./pages/ViewItems";
import ItemDetails from "./pages/ItemDetails";
import ExpiringSoon from "./pages/ExpiringSoon";
import MonthlyAssessment from "./pages/MonthlyAssessment";
import ActivityLog from "./pages/ActivityLog";
import Admin from "./pages/Admin";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/signup";

function App() {
  const { user } = useUser(); // ✅ get user from context

  return (
    <>
      {/* ✅ Show Navbar only if logged in */}
      {user && <Navbar />}

      <div className="page-container">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/add"
            element={
              <PrivateRoute>
                <AddItem />
              </PrivateRoute>
            }
          />
          <Route
            path="/items"
            element={
              <PrivateRoute>
                <ViewItems />
              </PrivateRoute>
            }
          />
          <Route
            path="/items/:id"
            element={
              <PrivateRoute>
                <ItemDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/expiring"
            element={
              <PrivateRoute>
                <ExpiringSoon />
              </PrivateRoute>
            }
          />
          <Route
            path="/monthly"
            element={
              <PrivateRoute>
                <MonthlyAssessment />
              </PrivateRoute>
            }
          />
          <Route
            path="/log"
            element={
              <PrivateRoute>
                <ActivityLog />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />
          <Route
            path="/about"
            element={
              <PrivateRoute>
                <About />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
