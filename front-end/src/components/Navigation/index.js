import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const colorNavyBlue = '#1A1E43';
const colorWhite = '#FFFFFF';

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
        &.nav-item-active {
            color: red;
        }
    `
};

function PrimaryNavMenu() {
    return (
        <PrimaryNavMenuStyle.Nav>
            <h2>Menu</h2>
            <ul>
                <li><PrimaryNavMenu.NavLinkNew to="/admin/">Home</PrimaryNavMenu.NavLinkNew></li>
                <li><PrimaryNavMenu.NavLinkNew to="/admin/info">Info</PrimaryNavMenu.NavLinkNew></li>
                <li><PrimaryNavMenu.NavLinkNew to="/admin/projects">Projects</PrimaryNavMenu.NavLinkNew></li>
                <li><PrimaryNavMenu.NavLinkNew to="/admin/work-experience">Work Experience</PrimaryNavMenu.NavLinkNew></li>
            </ul>
        </PrimaryNavMenuStyle.Nav>
    );
};


export {
    PrimaryNavMenu,
};