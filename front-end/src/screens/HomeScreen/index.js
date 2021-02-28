import React, { Component } from 'react';
import styled from 'styled-components';

class HomeScreen extends Component {
    render() {
        return (
            <Screen>
                <TypeWriter/>
                <H1Extended>
                    <div>Welcome to the</div>
                    <div>portfolio site of</div>
                    <div>Hyungmo Gu</div>
                </H1Extended>
                <strong>A Calgary based software developer who loves to learn, create new app, and push codes to github with his love</strong>
            </Screen>
        );
    }
}

export default HomeScreen;

