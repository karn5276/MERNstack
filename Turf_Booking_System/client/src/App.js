import './App.css';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import About from "./pages/About";
import Footer from './components/common/footer.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import VerifyOtp from './pages/VerifyOtp.jsx';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useSelector } from 'react-redux';

// Dashboard
import PrivateRoute from './components/core/auth/PrivateRoute.jsx';
import Dashboard from './pages/Dashboard.jsx';
import MyProfile from './components/core/Dashboard/MyProfile.jsx';
import Error from './pages/Error.jsx';
import Index from './components/core/Dashboard/setting/Index.jsx';
import BuyTurfs from './components/core/Dashboard/BuyTurfs.jsx';
import PurchaseHistory from './components/core/Dashboard/PurchaseHistory.jsx';
import { ACCOUNT_TYPE } from "./utils/constants";

// Turf
import RegisterTurf from './components/core/Dashboard/AddTurf/Index.jsx';
import MyTurfs from './components/core/Dashboard/MyTurf/MyTurfs.jsx';
import EditTurf from './components/core/Dashboard/EditTurf/EditTurf.jsx';
import Modal from './components/common/Modal.jsx';
import Turf from './pages/Turf.jsx';
import Dashboardinstructor from './components/core/Dashboard/InstructorDashboard/Dashboardinstructor.jsx';
import HomeSearch from './components/common/HomeSearch.jsx';

function App() {

  const user = useSelector((state) => state.profile.user);

  return (
    <div className="App">
      
      <Navbar></Navbar>
      

      {/* <Navbar></Navbar> */}
      <div>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path='/about' element={<About></About>}></Route>
          <Route path='/contact' element={<About></About>}></Route>
          <Route path="/turfs/:turfId" element={<Turf />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email" element={<VerifyOtp></VerifyOtp>}></Route>

          <Route path="/search" element={<Modal />} />
          <Route path="/homeSearch" element={<HomeSearch></HomeSearch>}/>




          <Route element={<PrivateRoute><Dashboard /></PrivateRoute>}>
               {/* below all are the children of above route  */}
            <Route path="dashboard/my-profile" element={<MyProfile />} /> 
            <Route path="dashboard/settings" element={<Index />} />

            {user?.accountType === ACCOUNT_TYPE.USER && (
            <>
              {/* <Route
                path="dashboard/buy-turfs"
                element={<BuyTurfs />}
              /> */}
              <Route
                path="dashboard/purchase-history"
                element={<PurchaseHistory />}
              />
            </>
          )}
          {user?.accountType === ACCOUNT_TYPE.OWNER && (
            <>
              <Route path="dashboard/add-turf" element={<RegisterTurf />} />
              <Route path="dashboard/my-turfs" element={<MyTurfs />} />
              <Route path="dashboard/edit-turf/:turfId" element={<EditTurf />} />
              <Route path="dashboard/owner" element={<Dashboardinstructor />} />
            </>
          )}
          {/* {user?.accountType === ACCOUNT_TYPE.ADMIN && (
            <>
              <Route path="dashboard/admin-panel" element={<AdminPannel />} />
            </>
          )} */}
        </Route>




          <Route path='*' element={<Error></Error>}></Route>

        </Routes>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
