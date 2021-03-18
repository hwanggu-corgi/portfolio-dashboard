import styled from 'styled-components';
import constants from '../../constants';


const AddMoreButtonStyle = {
    Button: styled.button`
        color: ${constants.colorWhite};
        border: none;
        background-color: ${constants.colorPurple};
        border-radius: 0.14rem;
        padding: 0.16rem;
        cursor: pointer;
    `,
    Div: styled.div`
        width: 1.1rem;
        height: 1.1rem;
        display: flex;
        justify-content: center;
        align-items: center;
    `,
    Section: styled.section`
        display: flex;
        justify-content: center;
    `
};

function AddMoreButton(props) {
    return(
        <AddMoreButtonStyle.Section>
            <AddMoreButtonStyle.Button onClick={props.onClick}>
                <AddMoreButtonStyle.Div>
                <strong>+</strong>
                </AddMoreButtonStyle.Div>
            </AddMoreButtonStyle.Button>
        </AddMoreButtonStyle.Section>
    );
}

const DateInputStyle = {
    Div: styled.div`
        display: flex;
    `,
    Input: styled.input`
        border: 1px solid ${constants.colorGrey};
        background-color: ${constants.colorLightGrey};
        padding: 0.56rem;
        flex-grow: 1;
    `
};


function DateInput(props) {
    return(
        <DateInputStyle.Div>
            <DateInputStyle.Input defaultValue={props.defaultValue} onChange={props.onChange} type="date"/>
        </DateInputStyle.Div>
    )
};


const InputStyle = {
    Div: styled.div`
        display: flex;
    `,
    Input: styled.input`
        border: 1px solid ${constants.colorGrey};
        background-color: ${constants.colorLightGrey};
        padding: 0.56rem;
        flex-grow: 1;
    `
};


function Input(props) {
    return(
        <InputStyle.Div>
            <InputStyle.Input defaultValue={props.defaultValue} onChange={props.onChange}/>
        </InputStyle.Div>
    )
};

const InputListStyle = {
    Div: styled(InputStyle.Div)`
        margin: 0 0 0.23rem 0;
    `,
    ButtonSection: styled.section`
        display: flex;
        justify-content: center;
    `
};

function InputList(props) {
    return(
        <>
            {props.list.map((item, index) => (
                <InputListStyle.Div key={item.id}>
                    <InputStyle.Input defaultValue={item[props.objectKey] ? item[props.objectKey] : ""} onChange={e => props.onChange(e, index)}/>
                </InputListStyle.Div>
            ))}
            <InputListStyle.ButtonSection>
                <AddMoreButton onClick={props.onAdd}/>
            </InputListStyle.ButtonSection>
        </>
    );
}

const FormGroup = styled.div`
    margin: 0 0 0.6rem 0;

    & > label {
        margin: 0 0 0.6rem 0;
    }

    & > * {
        display: block;
    }

    & > div {
        display: flex;
    }
`;

const KeyValueInputStyle = {
    Div: styled.div`
        margin: 0 0 0.23rem 0;
    `,
    InputKey: styled.input`
        border: 1px solid ${constants.colorGrey};
        background-color: ${constants.colorLightGrey};
        padding: 0.56rem;

        max-width: 10.31rem;
        margin: 0 0.23rem 0 0;
        flex-grow: initial;
    `,
    InputValue: styled.input`
        border: 1px solid ${constants.colorGrey};
        background-color: ${constants.colorLightGrey};
        padding: 0.56rem;
        flex-grow: 1;
    `
};

function KeyValueInput(props) {
    return(
        <KeyValueInputStyle.Div>
            <KeyValueInputStyle.InputKey defaultValue={props.key ? props.key : ""} onChange={props.onChange}/>
            <KeyValueInputStyle.InputValue defaultValue={props.value ? props.value : ""} onChange={props.onChange}/>
        </KeyValueInputStyle.Div>
    )
};


const KeyValueInputListStyle = {
    Div: styled(KeyValueInputStyle.Div)`
        margin: 0 0 0.23rem 0;
    `,
    ButtonSection: styled.section`
        display: flex;
        justify-content: center;
    `
};

function KeyValueInputList(props) {
    return(
        <>
            {props.list.map((item, index) => (
                <KeyValueInputListStyle.Div key={item.id}>
                    <KeyValueInputStyle.InputKey defaultValue={item && item.key ? item.key : ""} onChange={e => props.onChange(e, index)}/>
                    <KeyValueInputStyle.InputValue defaultValue={item && item.value ? item.value : ""} onChange={e => props.onChange(e, index)}/>
                </KeyValueInputListStyle.Div>
            ))}
            <KeyValueInputListStyle.ButtonSection>
                <AddMoreButton onClick={props.onAdd}/>
            </KeyValueInputListStyle.ButtonSection>
        </>
    );
}


export default {
    DateInput,
    Input,
    InputList,
    FormGroup,
    KeyValueInput,
    KeyValueInputList,
    AddMoreButton,
};