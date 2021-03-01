import React, { useState } from 'react';
import styled from 'styled-components';
import constants from '../../constants';

const sectionPadding = "1.31rem";

const InfoScreenStyle = {
    Section: styled.section`
        border: 1px solid ${constants.colorGrey};
        border-radius: ${constants.borderRadius};
        padding: ${sectionPadding};
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
    Div: styled.div`
        margin: 0 0 0.23rem 0;
    `,
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
        <InputKeyValueStyle.Div>
            <InputKeyValueStyle.InputKey/><InputKeyValueStyle.InputValue/>
        </InputKeyValueStyle.Div>
    )
};

const AddMoreButtonStyle = {
    Button: styled.button`
        color: ${constants.colorWhite};
        border: none;
        background-color: ${constants.colorPurple};
        border-radius: 0.14rem;
        padding: 0.16rem;
        cursor: pointer;
    `,
    Div: styled.div`
        width: 1.1rem;
        height: 1.1rem;
        display: flex;
        justify-content: center;
        align-items: center;
    `,
    Section: styled.section`
        display: flex;
        justify-content: center;
    `
};

function AddMoreButton(props) {
    return(
        <AddMoreButtonStyle.Section>
            <AddMoreButtonStyle.Button onClick={props.onClick}>
                <AddMoreButtonStyle.Div>
                <strong>+</strong>
                </AddMoreButtonStyle.Div>
            </AddMoreButtonStyle.Button>
        </AddMoreButtonStyle.Section>
    );
}


function InfoScreen() {
    let [contactsList, setContactsList] = useState([{}]);
    let [socialsList, setSocialsList] = useState([{}]);

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
                    {contactsList.map((item, index) => <InputKeyValue key={index} data={item}/>)}
                    <AddMoreButton onClick={_ => setContactsList(oldArray => [...oldArray, {}])}/>
                </FormGroup>
                <FormGroup>
                    <label>Socials</label>
                    {socialsList.map(item => <InputKeyValue data={item}/>)}
                    <AddMoreButton onClick={_ =>  setSocialsList(oldArray => [...oldArray, {}])}/>
                </FormGroup>
            </form>
        </InfoScreenStyle.Section>
    );
}

export default InfoScreen;

