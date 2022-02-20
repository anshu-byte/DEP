
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import NavbarComp from './components/NavbarComp';
import DashboardTAble from './components/Dashboard';
import CustomizedTables from './components/Dashboard2';
import ResponsiveDrawer from './components/sidebar';

import PermanentDrawerLeft from './components/sidebar_final';

function App() {
  return (
    <div className="homePageClass">
       <NavbarComp/>
      
      {/* <Home/> */}
      {/* <DashboardTAble/> */}
       <CustomizedTables/> 
      {/* <ResponsiveDrawer/> */}
      <PermanentDrawerLeft/>
    </div>
  );
}

export default App;
