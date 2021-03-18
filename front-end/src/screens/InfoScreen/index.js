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


    const setSocial = (e, index, list) => {
        list[index].name = e.target.value;
        _setTechsUsed(list);
    }

    const addSocial = (list) => {
        _setHighlights([...list, {"detail": ""}]);
    }

    const setContact = (e, index, list) => {
        list[index].detail = e.target.value;
        _setHighlights(list);
    }

    const addContact = (e, index, list) => {
        _setHighlights([...list, {"detail": ""}]);
    }

    const editInfo = (e, history) => {
        const workExp = {
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
            body: JSON.stringify(workExp)
        })
        .then(response => response.json())
        .then(data => {
            history.push(`/admin/work-experiences/${id}`);
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
        if (location.pathname.includes("/new")) {
            addContact(contacts);
            addSocial(socials);
        } else {
            getInfo();
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

