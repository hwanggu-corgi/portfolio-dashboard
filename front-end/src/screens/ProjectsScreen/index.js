import React, { useState } from 'react';
import styled from 'styled-components';
import constants from '../../constants';

const sectionPadding = "1.31rem";

const InfoScreenStyle = {
    Section: styled.section`
        border: 1px solid ${constants.colorGrey};
        border-radius: ${constants.borderRadius};
        padding: ${sectionPadding};
    `,
    H2: styled.h2`
        color: ${constants.colorNavyBlue};
    `,
};

function ProjectsScreen() {
    let [contactsList, setContactsList] = useState([{}]);
    let [socialsList, setSocialsList] = useState([{}]);

    return (
        <InfoScreenStyle.Section>
            <InfoScreenStyle.H2>Projects</InfoScreenStyle.H2>
        </InfoScreenStyle.Section>
    );
}

export default ProjectsScreen;
