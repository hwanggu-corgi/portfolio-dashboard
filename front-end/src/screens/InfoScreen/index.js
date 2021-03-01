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
    Input: styled.input`

    `,
    InputKey: styled(InputWithKeyStyle.Input)`
        max-width: 10.31rem;
    `,
    InputValue: styled.input`
        flex-grow: 1;
    `
};

function InputWithKey() {
    return(
        <InputWithKeyStyle.Div>
            <InputWithKeyStyle.InputKey/><InputWithKeyStyle.Input/>
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

