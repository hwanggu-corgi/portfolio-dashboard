import React, { useState } from 'react';
import Form from '../../components/Form'
import styled from 'styled-components';
import constants from '../../constants';
import Button from '../../components/Button';

const sectionPadding = "1.31rem";

const ProjectDetailScreenStyle = {
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

const InputListStyle = {
    Input: styled(Form.Input)`
        margin: 0 0.23rem 0 0;
    `
};

function InputList(props) {
    return(
        <>
            {props.list.map((item, index) => <InputListStyle.Input key={index} data={item}/>)}
            <Form.AddMoreButton onClick={props.onClick}/>
        </>
    );
}

function ProjectDetailScreen() {
    let [contactsList, setContactsList] = useState([{}]);
    let [socialsList, setSocialsList] = useState([{}]);

    return (
        <ProjectDetailScreenStyle.Section>
            <ProjectDetailScreenStyle.H2>Portfolio Dashboard</ProjectDetailScreenStyle.H2>
            <ProjectDetailScreenStyle.ButtonSection>
                <Button secondary>
                    Delete
                </Button>
                <Button primary>
                    Save
                </Button>
            </ProjectDetailScreenStyle.ButtonSection>
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
                    {contactsList.map((item, index) => <Form.Input key={index} data={item}/>)}
                    <Form.AddMoreButton onClick={_ => setContactsList(oldArray => [...oldArray, {}])}/>
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Images</label>
                    {socialsList.map(item => <Form.Input data={item}/>)}
                    <Form.AddMoreButton onClick={_ =>  setSocialsList(oldArray => [...oldArray, {}])}/>
                </Form.FormGroup>
            </form>
            <ProjectDetailScreenStyle.ButtonSection>
                <Button primary>
                    Save
                </Button>
            </ProjectDetailScreenStyle.ButtonSection>
        </ProjectDetailScreenStyle.Section>
    );
}

export default ProjectDetailScreen;

