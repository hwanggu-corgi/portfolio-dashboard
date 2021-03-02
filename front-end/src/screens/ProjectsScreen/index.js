import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import constants from '../../constants';

const sectionPadding = "1.31rem";

const ProjectsScreenStyle = {
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
    `
};

function ProjectsScreen() {
    let [contactsList, setContactsList] = useState([{}]);
    let [socialsList, setSocialsList] = useState([{}]);

    return (
        <ProjectsScreenStyle.Section>
            <ProjectsScreenStyle.H2>Projects</ProjectsScreenStyle.H2>
            <ProjectsScreenStyle.ButtonSection>
                <Button primary>
                    Add
                </Button>
            </ProjectsScreenStyle.ButtonSection>
        </ProjectsScreenStyle.Section>
    );
}

export default ProjectsScreen;
