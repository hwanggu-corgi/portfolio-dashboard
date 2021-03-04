import React, { useState } from 'react';
import Form from '../../components/Form'
import styled from 'styled-components';
import constants from '../../constants';
import Button from '../../components/Button';

const sectionPadding = "1.31rem";

const WorkExperienceDetailScreenStyle = {
    Section: styled.section`
        border: 1px solid ${constants.colorGrey};
        border-radius: ${constants.borderRadius};
        padding: ${sectionPadding};
    `,
    H2: styled.h2`
        color: ${constants.colorNavyBlue};
    `,
    ButtonSection: styled.section`
        display: flex;
        justify-content: flex-end;

        &:not(:last-child){
            margin: 0 0 1.41rem 0;
        }

        button:not(:last-child) {
            margin: 0 0.47rem 0 0;
        }
    `
};

function WorkExperienceDetailScreen() {
    let [highlightsList, setContactsList] = useState([""]);
    let [imagesList, setSocialsList] = useState([""]);

    return (
        <WorkExperienceDetailScreenStyle.Section>
            <WorkExperienceDetailScreenStyle.H2>Portfolio Dashboard</WorkExperienceDetailScreenStyle.H2>
            <WorkExperienceDetailScreenStyle.ButtonSection>
                <Button secondary>
                    Delete
                </Button>
                <Button primary>
                    Save
                </Button>
            </WorkExperienceDetailScreenStyle.ButtonSection>
            <form>
                <Form.FormGroup>
                    <label>Title</label>
                    <Form.Input/>
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Header Image</label>
                    <Form.Input/>
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Tools Used</label>
                    <Form.Input/>
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Highlights</label>
                    <Form.InputList list={highlightsList} onAdd={_ => setContactsList(oldArray => [...oldArray, ""])}/>
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Images</label>
                    <Form.InputList list={imagesList} onAdd={_ => setSocialsList(oldArray => [...oldArray, ""])}/>
                </Form.FormGroup>
            </form>
            <WorkExperienceDetailScreenStyle.ButtonSection>
                <Button primary>
                    Save
                </Button>
            </WorkExperienceDetailScreenStyle.ButtonSection>
        </WorkExperienceDetailScreenStyle.Section>
    );
}

export default WorkExperienceDetailScreen;

