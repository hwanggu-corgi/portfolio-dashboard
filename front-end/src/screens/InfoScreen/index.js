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
    `
};

const InputStyle = {
    Div: styled.div`
        display: flex;
    `,
    Input: styled.input`
        border: 1px solid ${constants.colorGrey};
        background-color: ${constants.colorLightGrey};
        padding: 0.56rem;
        flex-grow: 1;
    `
};

function Input() {
    return(
        <InputStyle.Div>
            <InputStyle.Input/>
        </InputStyle.Div>
    )
};


const FormGroup = styled.div`
    margin: 0 0 0.6rem 0;

    & > label {
        margin: 0 0 0.6rem 0;
    }

    & > * {
        display: block;
    }

    & > div {
        display: flex;
    }
`;

const InputKeyValueStyle = {
    InputKey: styled.input`
        border: 1px solid ${constants.colorGrey};
        background-color: ${constants.colorLightGrey};
        padding: 0.56rem;

        max-width: 10.31rem;
        margin: 0 0.23rem 0 0;
        flex-grow: initial;

    `,
    InputValue: styled.input`
        border: 1px solid ${constants.colorGrey};
        background-color: ${constants.colorLightGrey};
        padding: 0.56rem;

        flex-grow: 1;
    `
};

function InputKeyValue() {
    return(
        <div>
            <InputKeyValueStyle.InputKey/><InputKeyValueStyle.InputValue/>
        </div>
    )
};


function InfoScreen() {
    let contactsList = [];
    let socialsList = [];

    return (
        <InfoScreenStyle.Section>
            <InfoScreenStyle.H2>Personal Information</InfoScreenStyle.H2>
            <form>
                <FormGroup>
                    <label>Name</label>
                    <Input/>
                </FormGroup>
                <FormGroup>
                    <label>Website</label>
                    <Input/>
                </FormGroup>
                <FormGroup>
                    <label>Contact</label>
                    {contactsList.map(item => <InputKeyValue {...item}/>)}
                </FormGroup>
                <FormGroup>
                    <label>Socials</label>
                    {socialsList.map(item => <InputKeyValue {...item}/>)}
                </FormGroup>
            </form>
        </InfoScreenStyle.Section>
    );
}

export default InfoScreen;

