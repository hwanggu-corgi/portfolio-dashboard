import React, { Component } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';


const PrimaryNavMenuStyle = {
    Nav: styled.nav`
        background-color: ;
    `
};

function PrimaryNavMenu() {
    return (
        <Header>
            <nav>
                <div onClick={this.toggleMenu}><FontAwesomeIcon icon={faBars}/></div>
                <Nav><strong><NavLink to="/">Hyungmo Gu</NavLink></strong></Nav>
                <div></div>
            </nav>
        </Header>
    );
};


export {
    PrimaryNavMenu,
};