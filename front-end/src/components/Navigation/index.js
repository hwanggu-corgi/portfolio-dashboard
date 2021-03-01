import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const colorNavyBlue = '#1A1E43';
const colorWhite = '#FFFFFF';
const borderRadius = "0.94rem";

const PrimaryNavMenuStyle = {
    Nav: styled.nav`
        max-width: 15rem;
        border-radius: 0.94rem;
        background-color: ${colorNavyBlue};
        color: ${colorWhite};
        margin: 2.39rem 1.17rem;

        h2 {
            padding: 2.30rem 2.0rem;
            margin: 0;
        }

        ul {
            margin: 0;
            padding: 0;
            list-style-type: none;
        }

        li {
            padding: 1.03rem 2.0rem;
            Cursor: pointer;
            width: calc(15rem - 2.0rem * 2);
        }
    `,
    NavLinkNew : styled(NavLink)`
        text-decoration: none;
        color: ${colorWhite};

        &.active {
            font-weight: bold;
        }
    `
};

function PrimaryNavMenu() {
    return (
        <PrimaryNavMenuStyle.Nav>
            <h2>Menu</h2>
            <ul>
                <li><PrimaryNavMenuStyle.NavLinkNew exact to="/admin">Home</PrimaryNavMenuStyle.NavLinkNew></li>
                <li><PrimaryNavMenuStyle.NavLinkNew to="/admin/info">Info</PrimaryNavMenuStyle.NavLinkNew></li>
                <li><PrimaryNavMenuStyle.NavLinkNew to="/admin/projects">Projects</PrimaryNavMenuStyle.NavLinkNew></li>
                <li><PrimaryNavMenuStyle.NavLinkNew to="/admin/work-experience">Work Experience</PrimaryNavMenuStyle.NavLinkNew></li>
            </ul>
        </PrimaryNavMenuStyle.Nav>
    );
};

const UserIconStyle = {

};

function userIcon() {
    return (
        <UserIconStyle.Header>

        </UserIconStyle.Header>
    );
};

const SecondaryNavMenuStyle = {
    Header: styled.nav`
       border-radius: ${borderRadius};
       padding: 0.52rem;
    `,
    Nav : styled.nav`
        text-decoration: none;
        color: ${colorWhite};

        &.active {
            font-weight: bold;
        }
    `
};

function SecondaryNavMenu() {
    return (
        <SecondaryNavMenuStyle.Header>

        </SecondaryNavMenuStyle.Header>
    );
};



export {
    PrimaryNavMenu,
    SecondaryNavMenu,
};