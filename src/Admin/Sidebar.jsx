
import React from 'react';
import '../App.css'; 

function Sidebar({ setSelectedTab }) {
  const handleClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="Sidebar">
        <h5>HireSync</h5>
      <ul>
        <li onClick={() => handleClick('user')}>User</li>
        <li onClick={() => handleClick('jobs')}>Jobs</li>
        <li onClick={() => handleClick('applications')}>Applications</li>
      </ul>
    </div>
  );
}

export default Sidebar;

