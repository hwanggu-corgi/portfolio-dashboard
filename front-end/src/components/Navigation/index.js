import React from 'react';
import styled from 'styled-components';

const colorNavyBlue = '#1A1E43';
const colorWhite = '#FFFFFF';

const PrimaryNavMenuStyle = {
    Nav: styled.nav`
        max-width: 15rem;
        border-radius: 0.94rem;
        background-color: ${colorNavyBlue};
        color: ${colorWhite};
        height: 100%;

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