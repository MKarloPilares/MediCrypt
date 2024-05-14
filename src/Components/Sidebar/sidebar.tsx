import React, { useState } from 'react';
import CIcon from '@coreui/icons-react';
import { cilScreenDesktop, cilBook, cilPencil, cilList } from '@coreui/icons';

import './sidebar.css'; // Import CSS file for styling

const Sidebar = ({setCurrentPage,sendToggle}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };


  return (
    <>
    <div>
    <button className={`toggle-button ${isOpen ? 'open' : ''}`} onClick={() => {toggleSidebar(); sendToggle(isOpen)}}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </button>
    </div>
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <ul className="sidebar-menu">
        
        <li onClick={() => setCurrentPage('DashBoard')}><CIcon icon={cilScreenDesktop} style={{width: '45px', height: '45px'}}/>  DASHBOARD</li>
        <li><CIcon icon={cilBook} style={{width: '45px', height: '45px'}}/> LESSONS</li>
        <li onClick={() => setCurrentPage('Assessment')}><CIcon icon={cilPencil} style={{width: '45px', height: '45px'}}/> ASSESSMENT</li>
      </ul>
    </div>
    </>
  );
};

export default Sidebar;
