import styled from 'styled-components';
import constants from '../../constants';


const IconButtonStyle = {
    Button : styled.button`
        background-color: transparent;
        border: none;
        padding: 0.16rem;
        cursor: pointer;

        div {
            width: 1.1rem;
            height: 1.1rem;
        }
    `
};

function IconButton(props) {
    return (
        <IconButtonStyle.Button onClick={props.onClick}>
            {props.children}
        </IconButtonStyle.Button>
    )
}

const ButtonStyle = {
    Button: styled.button`
        border: transparent;
        border-radius: ${constants.borderRadius};
        background-color: ${props => {
            if (props.primary) {
                return constants.colorNavyBlue;
            } else if (props.secondary) {
                return constants.colorOrange;
            }
        }};
        color: ${constants.colorWhite};
        padding: 0.56rem;
        cursor: pointer;

    `,
    Div: styled.div`
        min-width: 6.09rem;
    `
}

export default function Button(props) {
    return(
        <ButtonStyle.Button {...props}>
            <ButtonStyle.Div>
                {props.children}
            </ButtonStyle.Div>
        </ButtonStyle.Button>
    );
}

export {
    Button,
    IconButton
};