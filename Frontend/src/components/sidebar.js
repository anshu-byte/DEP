import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { FaHome, FaUserMinus, FaUsersCog } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { gapi } from 'gapi-script';
import { GoogleLogout } from 'react-google-login';

const drawerWidth = 15;
const clientId = `${process.env.REACT_APP_OAuth_CLIENT_ID}`;

const BACKEND_URL = `${process.env.REACT_APP_BACKEND_URL}`;
export default function PermanentDrawerLeft(props) {
  const navigate = useNavigate();

  const onSignoutSuccess = () => {
    alert('You have been logged out successfully');

    navigate('/');
    window.location.reload();
  };
  const logout = () => {
    gapi.load('auth2', function () {
      gapi.auth2.init();
    });
    var auth2 = gapi.auth2.getAuthInstance();
    navigate('/');
    auth2.signOut();
    window.location.reload();

    alert('Logged out successfully');
  };
  const toDashboard = () => {
    navigate('/dashboard', {
      state: {
        userName: props.userName,
        userImg: props.userImg,
        userEmail: props.userEmail,
        userFlag: props.userFlag,
      },
    });
  };
  const toManageUser = async () => {
    const resp = await fetch(`${BACKEND_URL}/user/${props.userEmail}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'jwt-token': localStorage.getItem('token'),
      },
    });
    const response = await resp.json();

    if (response != 1) {
      alert('YOU ARE NOT THE ADMIN');
      return;
    }

    navigate('/manageuser', {
      state: {
        userName: props.userName,
        userImg: props.userImg,
        userEmail: props.userEmail,
        userFlag: props.userFlag,
      },
    });
  };

  return (
    <Box sx={{ display: 'flex' }} className="Drawer">
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: ` ${drawerWidth}%`, ml: `${drawerWidth}%` }}
      ></AppBar>
      <Drawer
        sx={{
          width: `${drawerWidth}%`,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: `${drawerWidth}%`,
            boxSizing: 'border-box',
            backgroundColor: '#4d5bf9',
            borderTopRightRadius: '20px',
            borderBottomRightRadius: '20px',

            color: '#fff',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />

        <span className="userImgContainer">
          <img className="userImage" src={props.userImg}></img>
        </span>

        <span className="userInfo">Welcome {props.userName}</span>
        <span className="userInfo">{props.userEmail}</span>

        <Divider />
        {props.userFlag == 1 ? (
          <ul className="ulSideBar">
            <li onClick={toDashboard} className="liSideBar">
              <span className="iconSideBar">
                <FaHome />
              </span>
              <span className="titleSideBar">Dashboard</span>
            </li>

            <li onClick={toManageUser} className="liSideBar">
              <span className="iconSideBar">
                <FaUsersCog />
              </span>

              <span className="titleSideBar">Manage Users</span>
            </li>

            <li onClick={logout} className="liSideBar">
              <span className="iconSideBar">
                <FaUserMinus />
              </span>

              <GoogleLogout
                clientId={clientId}
                render={(renderProps) => (
                  <span
                    className="titleSideBar"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    Logout
                  </span>
                )}
                buttonText="Sign Out"
                onLogoutSuccess={onSignoutSuccess}
              ></GoogleLogout>
            </li>
          </ul>
        ) : (
          <ul className="ulSideBar">
            <li onClick={toDashboard} className="liSideBar">
              <span className="iconSideBar">
                <FaHome />
              </span>
              <span className="titleSideBar">Dashboard</span>
            </li>

            <li onClick={logout} className="liSideBar">
              <span className="iconSideBar">
                <FaUserMinus />
              </span>

              <GoogleLogout
                clientId={clientId}
                render={(renderProps) => (
                  <span
                    className="titleSideBar"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    Logout
                  </span>
                )}
                buttonText="Sign Out"
                onLogoutSuccess={onSignoutSuccess}
              ></GoogleLogout>
            </li>
          </ul>
        )}

        <Divider />
      </Drawer>
    </Box>
  );
}
