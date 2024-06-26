import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SOE_Table from './SOE_Table';
import NavbarComp from './NavbarComp';
import PermanentDrawerLeft from './sidebar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

const BACKEND_URL = `${process.env.REACT_APP_BACKEND_URL}`;
export default function SOE() {
  const { state } = useLocation();
  const [tableShow, setTableShow] = useState(false);
  // const [all_projects,setall_projects] = useState(null);

  let obj = {
    userName: state.userName,
    userEmail: state.userEmail,
    userImg: state.userImg,
    projId: state.projId,
    project_title: state.project_title,
    projProfName: state.projProfName,
    project_grant: state.project_grant,
    table_data: state.table_data,
    summary_table_data: state.summary_table_data,
    userFlag: state.userFlag,
  };

  async function fetch_proj_on_click() {
    setTableShow(true);
    return;
    const resp = await fetch(`${BACKEND_URL}/user/${obj.userEmail}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const response = await resp.json();
    if (response != 1) {
      alert('You Are not an Admin , access Denied ');
      return;
    }

    const resp2 = await fetch(`${BACKEND_URL}/project/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sort: 1 }),
    });

    const json_response = await resp2.json();

    // setall_projects(json_response);
    setTableShow(true);
  }
  const [comment, setComment] = useState('');

  const handleSubmit = () => {};

  const [openAddCommentPopup, setOpenAddCommentPopup] = useState(false);
  return (
    <div>
      <NavbarComp />
      {/* {tableShow ? <SOE_Table data={all_projects} /> : null} */}
      {/* <div className="projectInfo"> */}

      {/* </div> */}
      <div className="projectHeading">
        <div className="projInfo">
          <span>Project Id: {state.projId.toString().substring(1)}</span>
          <span>Project Title: {state.project_title}</span>

          <span>PI Name: {state.projProfName}</span>
          <span>Total Cost: ₹{state.project_grant}</span>
        </div>
        <div className="hr"></div>
        <h2>Statement of Expenditure</h2>
      </div>
      <SOE_Table {...obj} />

      <PermanentDrawerLeft {...obj}></PermanentDrawerLeft>
    </div>
  );
}
