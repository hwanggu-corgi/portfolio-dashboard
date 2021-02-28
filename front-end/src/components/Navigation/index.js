import React, { Component } from 'react';
import styled from 'styled-components';

const colorNavyBlue = '#1A1E43';
const colorWhite = '#FFFFFF';

const PrimaryNavMenuStyle = {
    Nav: styled.nav`
        max-width: 21em;
        border-radius: 1.25em;
        background-color: ${colorNavyBlue};
        color: ${colorWhite};

        & ul {
            margin: 0;
            padding: 0;
            list-style-type: none;
        }
    `
};

function PrimaryNavMenu() {
    return (
        <PrimaryNavMenuStyle.Nav>
            <h2>Menu</h2>
            <ul>
                <li>Home</li>
                <li>Info</li>
                <li>Projects</li>
                <li>Work Experience</li>
            </ul>
        </PrimaryNavMenuStyle.Nav>
    );
};


export {
    PrimaryNavMenu,
};