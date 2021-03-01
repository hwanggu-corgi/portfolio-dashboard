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
    H2: styled.h2`
        color: ${constants.colorNavyBlue};
    `,
    FormGroup: styled.div`
    `,
    Input: styled.input`

    `
};

function InfoScreen() {
    return (
        <InfoScreenStyle.Section>
            <InfoScreenStyle.H2>Personal Information</InfoScreenStyle.H2>
            <form>
                <InfoScreenStyle.FormGroup>
                    <label>Name</label>
                    <input/>
                </InfoScreenStyle.FormGroup>
            </form>
        </InfoScreenStyle.Section>
    );
}

export default InfoScreen;

