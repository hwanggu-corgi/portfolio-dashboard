import React, { useState } from 'react';
import Form from '../../components/Form'
import styled from 'styled-components';
import constants from '../../constants';
import Button from '../../components/Button';

const ProjectDetailScreenStyle = {
    Section: styled.section`
        border: 1px solid ${constants.colorGrey};
        border-radius: ${constants.borderRadius};
        padding: ${constants.sectionPadding};
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

function ProjectDetailScreen() {
    const [title, setTitle] = useState("");
    const [headerImage, setHeaderImage] = useState("");
    const [toolsUsedList, _setToolsUsed] = useState([""]);
    const [highlightsList, _setHighlight] = useState([""]);
    const [imagesList, _setImage] = useState([""]);

    const setToolsUsed = (e, index, list) => {
        console.log(e);
        console.log(index);
    }

    const setHighlight = (e, index, list) => {
        console.log(e);
        console.log(index);
    }

    const setImage = (e, index, list) => {
        console.log(e);
        console.log(index);
    }

    const addProject =  async (e) => {
        e.preventDefault();

        fetch(`http://localhost:4001/admin/projects`, {
            method: "POST",
            // body: JSON.stringify()
        }).then(_ => {

        }).catch(error => {
            console.error(error);
        });
    }

    return (
        <ProjectDetailScreenStyle.Section>
            <ProjectDetailScreenStyle.H2>Portfolio Dashboard</ProjectDetailScreenStyle.H2>
            <ProjectDetailScreenStyle.ButtonSection>
                <Button secondary>
                    Delete
                </Button>
                <Button primary onSubmit={addProject}>
                    Save
                </Button>
            </ProjectDetailScreenStyle.ButtonSection>
            <form>
                <Form.FormGroup>
                    <label>Title</label>
                    <Form.Input defaultValue={title} onChange={e => setTitle(e.target.value)}/>
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Header Image</label>
                    <Form.Input defaultValue={headerImage} onChange={e => setHeaderImage(e.target.value)}/>
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Tools Used</label>
                    <Form.InputList list={toolsUsedList} onChange={(e, index) => setToolsUsed(e, index, toolsUsedList)} onAdd={_ => setToolsUsed(oldArray => [...oldArray, ""])}/>
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Highlights</label>
                    <Form.InputList list={highlightsList} onChange={(e, index) => setHighlight(e.target.value, index, highlightsList)} onAdd={_ => setHighlight(oldArray => [...oldArray, ""])}/>
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Images</label>
                    <Form.InputList list={imagesList} onChange={(e, index) => setImage(e.target.value, index, imagesList)} onAdd={_ => setImage(oldArray => [...oldArray, ""])}/>
                </Form.FormGroup>
            </form>
            <ProjectDetailScreenStyle.ButtonSection>
                <Button primary onClick={addProject}>
                    Save
                </Button>
            </ProjectDetailScreenStyle.ButtonSection>
        </ProjectDetailScreenStyle.Section>
    );
}

export default ProjectDetailScreen;

