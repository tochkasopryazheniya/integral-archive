import React from 'react';
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
       <div className='container'>
           <div className='header'>
               <NavLink to='/' className="header-link">Лента</NavLink>
               <NavLink to='/projects' className="header-link">Проекты</NavLink>
           </div>
       </div>
    );
};

export default Header;