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
        margin: 0 0 0.6rem 0;

        * {
            display: block;
        }

        label {
            margin: 0 0 0.6rem 0;
        }
    `,
    Input: styled.input`

    `
};

const Input = styled.input`
    border: 1px solid ${constants.colorGrey};
    background-color: ${constants.colorLightGrey};
    padding: 0.56rem;
    flex-grow: 1;
`;

const InputWithKeyStyle = {
    Div: styled.div`
        display: flex;
    `,
    InputKey: styled(Input)`
        max-width: 10.31rem;
        margin: 0 0.23rem 0 0;
        flex-grow: initial;

    `,
    InputValue: styled(Input)`
        flex-grow: 1;
    `
};

function InputKeyValue() {
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
                    <Input/>
                </InfoScreenStyle.FormGroup>
                <InfoScreenStyle.FormGroup>
                    <label>Website</label>
                    <Input/>
                </InfoScreenStyle.FormGroup>
                <InfoScreenStyle.FormGroup>
                    <label>Contact</label>
                    <InputKeyValue/>
                </InfoScreenStyle.FormGroup>
                <InfoScreenStyle.FormGroup>
                    <label>Socials</label>
                    <InputKeyValue/>
                </InfoScreenStyle.FormGroup>
            </form>
        </InfoScreenStyle.Section>
    );
}

export default InfoScreen;

