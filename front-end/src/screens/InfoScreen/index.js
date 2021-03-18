import React, { useState } from 'react';
import Form from '../../components/Form'
import styled from 'styled-components';
import constants from '../../constants';
import Button from '../../components/Button';


const InfoScreenStyle = {
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
    `
};

function InfoScreen() {
    const location = useLocation();
    const history = useHistory();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [nickName, setNickName] = useState("");
    const [website, setWebsite] = useState("");
    const [socials, _setSocials] = useState([]);
    const [contacts, _setContacts] = useState([]);

    const addTechUsed = (list) => {
        _setTechsUsed([...list, {"name": ""}]);
    }

    const setTechsUsed = (e, index, list) => {
        list[index].name = e.target.value;
        _setTechsUsed(list);
    }

    const addHighlight = (list) => {
        _setHighlights([...list, {"detail": ""}]);
    }

    const setHighlight = (e, index, list) => {
        list[index].detail = e.target.value;
        _setHighlights(list);
    }

    const addWorkExperience =  (e, history) => {
        const workExp = {
            company: company,
            position: position,
            location: companyLocation,
            date_start: dateStart,
            date_end: dateEnd,
            tech_used: techsUsedList,
            highlights: highlightsList,
        };

        fetch(`http://localhost:4001/admin/work-experiences`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(workExp)
        })
        .then(response => response.json())
        .then(data => {
            history.push(`/admin/work-experiences/${data.id}`);
        }).catch(error => {
            console.error(error);
        });
    }

    const editWorkExperience = (e, history) => {
        const workExp = {
            id: id,
            company: company,
            position: position,
            location: companyLocation,
            date_start: dateStart,
            date_end: dateEnd,
            tech_used: techsUsedList,
            highlights: highlightsList,
        };

        fetch(`http://localhost:4001/admin/work-experiences/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(workExp)
        })
        .then(response => response.json())
        .then(data => {
            history.push(`/admin/work-experiences/${id}`);
        }).catch(error => {
            console.error(error);
        });
    }

    const deleteWorkExperience = (e, history) => {
        fetch(`http://localhost:4001/admin/work-experiences/${id}`, {
            method: "DELETE"
        })
        .then(_ => {
            history.push(`/admin/work-experiences`);
        }).catch(error => {
            console.error(error);
        });
    }

    const getWorkExperience = (path) => {
        const domain = "http://localhost:4001";
        fetch(`${domain}${path}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setId(data.id);
            setCompany(data.company);
            setPosition(data.position);
            setCompanyLocation(data.location);
            setDateStart(getYYYYMMDD(data.date_start));
            setDateEnd(getYYYYMMDD(data.date_end));
            _setHighlights(data.highlights);
            _setTechsUsed(data.tech_used);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        if (location.pathname.includes("/new")) {
            addTechUsed(techsUsedList);
            addHighlight(highlightsList);
        } else {
            getWorkExperience(location.pathname);
        }
    }, []);

    return (
        <InfoScreenStyle.Section>
            <InfoScreenStyle.H2>Personal Information</InfoScreenStyle.H2>
            <InfoScreenStyle.ButtonSection>
                <Button primary>
                    Save
                </Button>
            </InfoScreenStyle.ButtonSection>
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
                    <Form.KeyValueInputList list={contactsList} onAdd={_ => setContactsList(oldArray => [...oldArray, ["",""]])}/>
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Socials</label>
                    <Form.KeyValueInputList list={socialsList} onAdd={_ => setSocialsList(oldArray => [...oldArray, ["",""]])}/>
                </Form.FormGroup>
            </form>
            <InfoScreenStyle.ButtonSection>
                <Button primary>
                    Save
                </Button>
            </InfoScreenStyle.ButtonSection>
        </InfoScreenStyle.Section>
    );
}

export default InfoScreen;

