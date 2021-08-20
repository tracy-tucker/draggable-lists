import React, { useState } from 'react'
import styled from 'styled-components'
import dataset from './dataset'
import Column from './Column'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

// Styled component
const Container = styled.div`
  display: flex;
`

const [data, setData] = useState(dataset)

const onDragEnd = result => {}

const App = () => {
  return (
    <div>
    </div>
  );
}

export default App;
