import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import constants from '../../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

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

const TableStyle = {
    Table: styled.table`
        width: 100%;
        border-collapse: collapse;
        border: 1px solid black;
        margin: 0;
    `,
    Th: styled.th`
        background-color: ${constants.colorLightGrey};
        font-weight: normal;
        text-align: left;
        padding: 0.75rem;
    `,
    Td: styled.td`
        padding: 0.75rem;
    `
}

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
            <TableStyle.Table>
                <tr>
                    <TableStyle.Th name>Name</TableStyle.Th>
                    <TableStyle.Th date>Date</TableStyle.Th>
                    <TableStyle.Th short_description>Short Description</TableStyle.Th>
                    <TableStyle.Th tools_used>Tools Used</TableStyle.Th>
                    <TableStyle.Th icon></TableStyle.Th>
                    <TableStyle.Th icon></TableStyle.Th>
                </tr>
                <tr>
                    <TableStyle.Td>Portfolio Dashboard</TableStyle.Td>
                    <TableStyle.Td>March 1st, 2021</TableStyle.Td>
                    <TableStyle.Td>Dashboard housing information for hyungmogu.com</TableStyle.Td>
                    <TableStyle.Td>Node.js, PostgreSQL, ReactJS</TableStyle.Td>
                    <TableStyle.Td>
                        <FontAwesomeIcon icon={faEdit}/>
                    </TableStyle.Td>
                    <TableStyle.Td>
                        <FontAwesomeIcon icon={faTrashAlt}/>
                    </TableStyle.Td>
                </tr>
            </TableStyle.Table>
        </ProjectsScreenStyle.Section>
    );
}

export default ProjectsScreen;
