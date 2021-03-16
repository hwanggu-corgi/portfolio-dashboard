import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import Form from '../../components/Form'
import styled from 'styled-components';
import constants from '../../constants';
import Button from '../../components/Button';


const getYYYYMMDD = (date) => {
    date = new Date(date);
    const year = `${date.getFullYear()}`.padStart(4,"0");
    const month = `${date.getMonth()+1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
}

const WorkExperienceDetailScreenStyle = {
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

function WorkExperienceDetailScreen() {
    const location = useLocation();
    const history = useHistory();

    const [id, setId] = useState(0);
    const [title, setTitle] = useState("");
    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const [techsUsedList, _setTechsUsed] = useState([]);
    const [highlightsList, _setHighlights] = useState([]);

    const addToolUsed = (list) => {
        _setTechsUsed([...list, {"name": ""}]);
    }

    const addHighlight = (list) => {
        _setHighlights([...list, {"detail": ""}]);
    }

    const setHighlight = (e, index, list) => {
        list[index].detail = e.target.value;
        _setHighlights(list);
    }

    const addWorkExperience =  (e, history) => {
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

    const editWorkExperience = (e, history) => {
        const project = {
            id: id,
            title: title,
            date_start: dateStart,
            date_end: dateEnd,
            tech_used: techsUsedList,
            highlights: highlightsList,
        };

        fetch(`http://localhost:4001/admin/projects/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        })
        .then(response => response.json())
        .then(data => {
            history.push(`/admin/projects/${id}`);
        }).catch(error => {
            console.error(error);
        });
    }

    const deleteWorkExperience = (e, history) => {
        fetch(`http://localhost:4001/admin/projects/${id}`, {
            method: "DELETE"
        })
        .then(_ => {
            history.push(`/admin/projects`);
        }).catch(error => {
            console.error(error);
        });
    }

    const getWorkExperience = (path) => {
        const domain = "http://localhost:4001";
        fetch(`${domain}${path}`)
        .then(response => response.json())
        .then(data => {
            setId(data.id);
            setTitle(data.title);
            setStartDate(getYYYYMMDD(data.date_start));
            setEndDate(getYYYYMMDD(data.date_end));
            _setHighlights(data.highlights);
            _setTechsUsed(data.tech_used);
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
        <WorkExperienceDetailScreenStyle.Section>
            <WorkExperienceDetailScreenStyle.H2>SiteMax Systems Inc. - Junior Developer</WorkExperienceDetailScreenStyle.H2>
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
                    <label>Company Name</label>
                    <Form.Input/>
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Date Start</label>
                    <Form.DateInput defaultValue={dateStart} onChange={e => setStartDate(e.target.value)}/>
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Date End</label>
                    <Form.DateInput defaultValue={dateEnd} onChange={e => setEndDate(e.target.value)}/>
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Position</label>
                    <Form.Input/>
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Location</label>
                    <Form.Input/>
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Date Start</label>
                    <Form.Input/>
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Date End</label>
                    <Form.Input/>
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Tech Stacks</label>
                    <Form.Input/>
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Highlights</label>
                    <Form.InputList list={highlightsList} objectKey="detail" onChange={(e, index) => setHighlight(e, index, highlightsList)} onAdd={_ => addHighlight(highlightsList)}/>
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

