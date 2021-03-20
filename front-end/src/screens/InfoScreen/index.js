import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
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

    const setSocial = (e, index, list) => {
        list[index].name = e.target.value;
        _setSocials(list);
    }

    const addSocial = (list) => {
        if (!Array.isArray(list) || list.length === 0) {
            _setSocials([{"name": "", "value": ""}]);
            return;
        }
        _setSocials([...list, {"name": "", "value": ""}]);
    }

    const setContact = (e, index, list) => {
        list[index].detail = e.target.value;
        _setContacts(list);
    }

    const addContact = (e, index, list) => {
        if (!Array.isArray(list) || list.length === 0) {
            console.log("I am here");
            _setContacts([{"name": "", "value": ""}]);
            return;
        }

        console.log("I am here 2");
        _setContacts([...list, {"name": "", "value": ""}]);
    }

    const editInfo = (e, history) => {
        const info = {
            first_name: firstName,
            last_name: lastName,
            nick_name: nickName,
            website: website,
            contacts: contacts,
            socials: socials
        };

        fetch(`http://localhost:4001/admin/info`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
        })
        .then(response => response.json())
        .then(data => {
            history.push(`/admin/info`);
        }).catch(error => {
            console.error(error);
        });
    }

    const getInfo = () => {
        fetch("http://localhost:4001/admin/info")
        .then(response => response.json())
        .then(data => {
            setFirstName(data.first_name);
            setLastName(data.last_name);
            setNickName(data.nick_name);
            setWebsite(data.website);
            _setContacts(data.contacts);
            _setSocials(data.socials);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        getInfo();
    }, []);

    return (
        <InfoScreenStyle.Section>
            <InfoScreenStyle.H2>Personal Information</InfoScreenStyle.H2>
            <InfoScreenStyle.ButtonSection>
                <Button primary onClick={e => editInfo(e, history)}>
                    Save
                </Button>
            </InfoScreenStyle.ButtonSection>
            <form>
                <Form.FormGroup>
                    <label>First Name</label>
                    <Form.Input defaultValue={firstName} onChange={e => setFirstName(e.target.value)}/>
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Last Name</label>
                    <Form.Input defaultValue={lastName} onChange={e => setLastName(e.target.value)}/>
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Nick Name</label>
                    <Form.Input defaultValue={nickName} onChange={e => setNickName(e.target.value)}/>
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Website</label>
                    <Form.Input defaultValue={website} onChange={e => setWebsite(e.target.value)}/>
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Contact</label>
                    <Form.KeyValueInputList list={contacts} onChange={(e, index) => setContact(e, index, contacts)} onAdd={_ => addContact(contacts)}/>
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Socials</label>
                    <Form.KeyValueInputList list={socials} onChange={(e, index) => setSocial(e, index, socials)} onAdd={_ => addSocial(socials)}/>
                </Form.FormGroup>
            </form>
            <InfoScreenStyle.ButtonSection>
                <Button primary onClick={e => editInfo(e, history)}>
                    Save
                </Button>
            </InfoScreenStyle.ButtonSection>
        </InfoScreenStyle.Section>
    );
}

export default InfoScreen;

