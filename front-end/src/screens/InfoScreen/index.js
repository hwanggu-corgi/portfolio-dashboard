import React from 'react';
import styled from 'styled-components';
import constants from '../../constants';

const containerPadding = "1.31rem";

const InfoScreenStyle = {
    Section: styled.section`
        border: 1px solid ${constants.colorGrey};
        border-radius: ${constants.borderRadius};
        padding: ${containerPadding};
        flex-grow: 1;
    `,
    Span: styled.span`
        font-size: 1.5rem;
        color: ${constants.colorNavyBlue};
    `
};

function InfoScreen() {
    return (
        <InfoScreenStyle.Section>
            <h2>Personal Information</h2>
        </InfoScreenStyle.Section>
    );
}

export default InfoScreen;

