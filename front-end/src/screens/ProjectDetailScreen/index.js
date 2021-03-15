import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import Form from '../../components/Form'
import styled from 'styled-components';
import constants from '../../constants';
import Button from '../../components/Button';


const getYYYYMMDD = (date) => {
    date = new Date(date);
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();
    console.log(`${year}-${month}-${day}`);
    return `${year}-${month}-${day}`;
}

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
    const history = useHistory();

    const [id, setId] = useState(0);
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [headerImage, setHeaderImage] = useState("");
    const [demoURL, setDemoURL] = useState("");
    const [sourceURL, setSourceURL] = useState("");
    const [techsUsedList, _setTechsUsed] = useState([]);
    const [highlightsList, _setHighlight] = useState([]);
    const [imagesList, _setImage] = useState([]);

    const addToolUsed = (list) => {
        _setTechsUsed([...list, {"name": ""}]);
    }

    const setTechsUsed = (e, index, list) => {
        list[index].name = e.target.value;
        _setTechsUsed(list);
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

    const addProject =  (e, history) => {
        const project = {
            title: title,
            date: date,
            header_image_url: headerImage,
            demo_url: demoURL,
            source_url: sourceURL,
            tech_used: techsUsedList,
            highlights: highlightsList,
            images: imagesList
        };

        fetch(`http://localhost:4001/admin/projects`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        })
        .then(response => response.json())
        .then(data => {
            history.push(`/admin/projects/${data.id}`);
        }).catch(error => {
            console.error(error);
        });
    }

    const editProject = (e, history) => {
        const project = {
            id: id,
            title: title,
            date: date,
            header_image_url: headerImage,
            demo_url: demoURL,
            source_url: sourceURL,
            tech_used: techsUsedList,
            highlights: highlightsList,
            images: imagesList
        };

        fetch(`http://localhost:4001/admin/projects`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        })
        .then(response => response.json())
        .then(data => {
            history.push(`/admin/projects/${data.id}`);
        }).catch(error => {
            console.error(error);
        });
    }

    const getProject = (path) => {
        const domain = "http://localhost:4001";
        const response = fetch(`${domain}${path}`)
        .then(response => response.json())
        .then(data => {
            setId(data.id);
            setTitle(data.title);
            setDate(getYYYYMMDD(data.date));
            setHeaderImage(data.header_image_url);
            setDemoURL(data.demo_url);
            setSourceURL(data.source_url);
            _setHighlight(data.highlights);
            _setTechsUsed(data.tech_used);
            _setImage(data.images);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        if (location.pathname.includes("/new")) {
            addToolUsed(techsUsedList);
            addHighlight(highlightsList);
            addImage(imagesList);
        } else {
            getProject(location.pathname);
        }
    }, []);

    return (
        <ProjectDetailScreenStyle.Section>
            <ProjectDetailScreenStyle.H2>Portfolio Dashboard</ProjectDetailScreenStyle.H2>
            <ProjectDetailScreenStyle.ButtonSection>
                {
                    !location.pathname.includes("/new") ?
                        <Button secondary>
                            Delete
                        </Button>
                    : null
                }
                <Button primary onClick={e => location.pathname.includes("/new") ? addProject(e, history) : editProject(e, history)}>
                    Save
                </Button>
            </ProjectDetailScreenStyle.ButtonSection>
            <form>
                <Form.FormGroup>
                    <label>Title</label>
                    <Form.Input defaultValue={title} onChange={e => setTitle(e.target.value)}/>
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Date</label>
                    <Form.DateInput defaultValue={date} onChange={e => setDate(e.target.value)}/>
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Header Image</label>
                    <Form.Input defaultValue={headerImage} onChange={e => setHeaderImage(e.target.value)}/>
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Demo URL</label>
                    <Form.Input defaultValue={demoURL} onChange={e => setDemoURL(e.target.value)}/>
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Source URL</label>
                    <Form.Input defaultValue={sourceURL} onChange={e => setSourceURL(e.target.value)}/>
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Tools Used</label>
                    <Form.InputList list={techsUsedList} objectKey="name" onChange={(e, index) => setTechsUsed(e, index, techsUsedList)} onAdd={_ => addToolUsed(techsUsedList)}/>
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Highlights</label>
                    <Form.InputList list={highlightsList} objectKey="detail" onChange={(e, index) => setHighlight(e, index, highlightsList)} onAdd={_ => addHighlight(highlightsList)}/>
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Images</label>
                    <Form.InputList list={imagesList} objectKey="url" onChange={(e, index) => setImage(e, index, imagesList)} onAdd={_ => addImage(imagesList)}/>
                </Form.FormGroup>
            </form>
            <ProjectDetailScreenStyle.ButtonSection>
                <Button primary onClick={e => location.pathname.includes("/new") ? addProject(e, history) : editProject(e, history)}>
                    Save
                </Button>
            </ProjectDetailScreenStyle.ButtonSection>
        </ProjectDetailScreenStyle.Section>
    );
}

export default ProjectDetailScreen;

