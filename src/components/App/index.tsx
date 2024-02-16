import styled from 'styled-components'

import Slider from '@components/Slider'

import { slides as mockSlides } from './mock'

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
                withPagination
                withNavigation
                infinitely
                // auto={{ active: true, direction: DirectionType.RIGHT }}
                stopOnMouseOver
            />
        </AppComponent>
    )
}

export default App
