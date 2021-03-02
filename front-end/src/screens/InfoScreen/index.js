import React, { useState } from 'react';
import Form from '../../components/Form'
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

function InfoScreen() {
    let [contactsList, setContactsList] = useState([{}]);
    let [socialsList, setSocialsList] = useState([{}]);

    return (
        <InfoScreenStyle.Section>
            <InfoScreenStyle.H2>Personal Information</InfoScreenStyle.H2>
            <form>
                <Form.FormGroup>
                    <label>Name</label>
                    <Form.Input/>
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Website</label>
                    <Form.Input/>
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Contact</label>
                    {contactsList.map((item, index) => <Form.KeyValueInput key={index} data={item}/>)}
                    <Form.AddMoreButton onClick={_ => setContactsList(oldArray => [...oldArray, {}])}/>
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Socials</label>
                    {socialsList.map(item => <Form.KeyValueInput data={item}/>)}
                    <Form.AddMoreButton onClick={_ =>  setSocialsList(oldArray => [...oldArray, {}])}/>
                </Form.FormGroup>
            </form>
        </InfoScreenStyle.Section>
    );
}

export default InfoScreen;

