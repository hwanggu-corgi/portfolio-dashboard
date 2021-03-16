import React, { useState } from 'react';
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

    const deleteProject = (e, history) => {
        fetch(`http://localhost:4001/admin/projects/${id}`, {
            method: "DELETE"
        })
        .then(_ => {
            history.push(`/admin/projects`);
        }).catch(error => {
            console.error(error);
        });
    }

    const getProject = (path) => {
        const domain = "http://localhost:4001";
        fetch(`${domain}${path}`)
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

