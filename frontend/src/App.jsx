import { Routes,Route } from "react-router"
import Home from "./pages/Home"
import Login from "./components/Login"
import Signup from "./components/Signup"
import { Toaster } from "react-hot-toast"
import RecruiterDashboard from "./pages/RecruiterDashboard"
import AddJobform from "./components/AddJobform"
import ManageallJob from "./components/ManageallJob"
import Applications from "./components/Applications"
import ProtectedRoute from "./components/ProtectedRoute"
import ErrorBoundary from "./pages/ErrorBoundry"
import EachJobdetail from "./components/EachJobdetail"
import FindJobs from "./pages/FindJobs"

function App() {

  return (
    <ErrorBoundary>
    <div className="app px-4 sm:[px-5vw] md:px-[7vw] lg:px-[9vw]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/findjobs" element={<FindJobs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/job/:id" element={<EachJobdetail />} />

        <Route path="/recruiterdashboard" element={<ProtectedRoute><RecruiterDashboard /></ProtectedRoute>}>
         <Route path="addjob" element={<AddJobform />} />
         <Route path="alljobs" element={<ManageallJob />} />
         <Route path="applications" element={<Applications />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
    </ErrorBoundary>
  )
}

export default App
