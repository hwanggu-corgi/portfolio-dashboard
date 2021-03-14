import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
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
    const location = useLocation();

    const [title, setTitle] = useState("");
    const [headerImage, setHeaderImage] = useState("");
    const [toolsUsedList, _setToolsUsed] = useState([]);
    const [highlightsList, _setHighlight] = useState([]);
    const [imagesList, _setImage] = useState([]);

    const addToolUsed = (list) => {
        _setToolsUsed([...list, {"name": ""}]);
    }

    const setToolsUsed = (e, index, list) => {
        list[index].name = e.target.value;
        _setToolsUsed(list);
    }

    const addHighlight = (list) => {
        _setHighlight([...list, {"detail": ""}]);
    }

    const setHighlight = (e, index, list) => {
        list[index].detail = e.target.value;
        _setHighlight(list);
    }

    const addImage = (list) => {
        _setImage([...list, {"url": ""}]);
    }

    const setImage = (e, index, list) => {
        list[index].url = e.target.value;
        _setImage(list);
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


    useEffect(() => {
        // if url ends with new, then add initial list
        if (location.pathname.includes("/new")) {
            addToolUsed(toolsUsedList);
            addHighlight(highlightsList);
            addImage(imagesList);
        }
    }, []);

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
                    <Form.InputList list={toolsUsedList} objectKey="name" onChange={(e, index) => setToolsUsed(e, index, toolsUsedList)} onAdd={_ => addToolUsed(toolsUsedList)}/>
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Highlights</label>
                    <Form.InputList list={highlightsList} objectKey="detail" onChange={(e, index) => setHighlight(e.target.value, index, highlightsList)} onAdd={_ => addHighlight(highlightsList)}/>
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Images</label>
                    <Form.InputList list={imagesList} objectKey="url" onChange={(e, index) => setImage(e.target.value, index, imagesList)} onAdd={_ => addImage(imagesList)}/>
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

