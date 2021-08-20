import React, { useState } from 'react'
import styled from 'styled-components'
import dataset from './dataset'
import Column from './Column'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

// Styled component
const Container = styled.div`
  display: flex;
`

const App = () => {

  const [data, setData] = useState(dataset)

  const onDragEnd = result => {}

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='all-columns' direction='horizontal' type='column'>
        {(provided) => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {data.columnOrder.at.map((id, index) => {
              const column = data.columns[id]
              const tasks = column.taskIds.map(taskId => data.tasks[taskId])

              return <Column key={column.id} column={column} tasks={tasks} index={index} />
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default App;

// DragDropContext = Required root container that wraps around your movable components.
// Droppable = a component that can be dropped.
// Draggable = a component that can be dragged around.
// The DragDropContext expects a mandatory event, onDragEnd, which gets triggered whenever a Draggable has finished dragging from one point to another.

// droppableId = just a unique identifier

// Beautiful DND API requires a function that returns a React Component as children.
// This function gets 2 arguments, provided and snapshot.

// provided.innerRef = you must bind the provided.innerRef to the highest possible DOM node within the React element. This helps avoid using ReactDOM.
// provided.droppableProps = This is an Object that contains properties that need to be applied to a Droppable element. It needs to be applied to the same element that you apply provided.innerRef to.


