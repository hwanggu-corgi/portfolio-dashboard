import styled from 'styled-components';
import constants from '../../constants';


const ButtonStyle = {
    Button: styled.button`
        border: transparent;
        border-radius: ${constants.borderRadius};
        background-color: ${constants.colorNavyBlue};
        color: ${constants.colorWhite};
    `
}

export default function Button(props) {
    return(
        <ButtonStyle.Button>{props.children}</ButtonStyle.Button>
    );
}