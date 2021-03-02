import styled from 'styled-components';
import constants from '../../constants';


const ButtonStyle = {
    Button: styled.button`
        border: transparent;
        border-radius: ${constants.borderRadius};
        background-color: ${constants.colorNavyBlue};
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
        <ButtonStyle.Button type={props.type}>
            <ButtonStyle.Div>
                {props.children}
            </ButtonStyle.Div>
        </ButtonStyle.Button>
    );
}