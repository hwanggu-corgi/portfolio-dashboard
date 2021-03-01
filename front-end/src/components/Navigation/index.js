import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const colorNavyBlue = '#1A1E43';
const colorWhite = '#FFFFFF';
const colorGrey = '#D7D7D7';
const colorPurple = '#8A8DCC';
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

const UserStyle = {
    Div: styled.div`
        border: 1px solid ${colorPurple};
        padding: 0.8em;
        display: inline-block;
        border-radius: 50%;
        margin-right: 1em;

        div {
            width: 1.25em;
            height: 1.25em;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        path {
            fill: ${colorPurple};
        }
    `
};

function User() {
    return (
        <UserStyle.Div>
            <div>
                <FontAwesomeIcon icon={faUser}/>
            </div>
        </UserStyle.Div>
    );
};

const SecondaryNavMenuStyle = {
    Header: styled.nav`
       border-radius: ${borderRadius};
       padding: 0.52rem;
       display: flex;
       justify-content: flex-end;
       align-items: center;
    `,
    Nav : styled.nav`
        text-decoration: none;
        color: ${colorWhite};

        &.active {
            font-weight: bold;
        }
    `,
    Span: styled.span`
        margin-right: 0.75rem;

        strong {
            color: ${colorPurple};
        }
    `
};

function SecondaryNavMenu() {
    return (
        <SecondaryNavMenuStyle.Header>
            <SecondaryNavMenuStyle.Span>Hello, <strong>Admin</strong></SecondaryNavMenuStyle.Span>
            <User/>
        </SecondaryNavMenuStyle.Header>
    );
};



export {
    PrimaryNavMenu,
    SecondaryNavMenu,
};