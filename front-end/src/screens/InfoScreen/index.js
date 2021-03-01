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
        * {
            display: block;
        }
    `,
    Input: styled.input`

    `
};

const InputWithKeyStyle = {
    Div: styled.div`
        display: flex;
    `,
    InputKey: styled.input`
        border: 1px solid ${constants.colorGrey};
        background-color: ${constants.colorLightGrey};
        max-width: 10.31rem;
        margin: 0 0.23rem 0 0;
    `,
    InputValue: styled.input`
        border: 1px solid ${constants.colorGrey};
        background-color: ${constants.colorLightGrey};
        flex-grow: 1;
    `
};

function InputWithKey() {
    return(
        <InputWithKeyStyle.Div>
            <InputWithKeyStyle.InputKey/><InputWithKeyStyle.InputValue/>
        </InputWithKeyStyle.Div>
    )
}


function InfoScreen() {
    return (
        <InfoScreenStyle.Section>
            <InfoScreenStyle.H2>Personal Information</InfoScreenStyle.H2>
            <form>
                <InfoScreenStyle.FormGroup>
                    <label>Name</label>
                    <input/>
                </InfoScreenStyle.FormGroup>
                <InfoScreenStyle.FormGroup>
                    <label>Website</label>
                    <input/>
                </InfoScreenStyle.FormGroup>
                <InfoScreenStyle.FormGroup>
                    <label>Contact</label>
                    <InputWithKey/>
                </InfoScreenStyle.FormGroup>
                <InfoScreenStyle.FormGroup>
                    <label>Socials</label>
                    <InputWithKey/>
                </InfoScreenStyle.FormGroup>
            </form>
        </InfoScreenStyle.Section>
    );
}

export default InfoScreen;

