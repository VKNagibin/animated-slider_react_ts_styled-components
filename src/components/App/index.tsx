import styled from 'styled-components'

import { slides as mockSlides } from './mock'

import Slider from '../Slider'

const AppComponent = styled.div`
    padding: 40px;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(204, 164, 253, 0.27);
`

function App() {
    return (
        <AppComponent>
            <Slider
                slides={mockSlides}
                loop={true}
                withPagination
                withNavigation
                auto
                delay={2000}
                stopOnMouseOver={false}
            />
        </AppComponent>
    )
}

export default App
