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

  const onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    // If there is no destination
    if (!destination) {return}

    // If source and destination is the same
    if (destination.droppableId === source.droppableId && destination.index === source.index) {return}

    // If dragging columns
    if (type === 'column') {
      const newColumnOrder = Array.from(data.columnOrder)
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      const newState = {
        ...data,
        columnOrder: newColumnOrder
      }
      setData(newState)
      return;
    }

    // Anything below this happens if dragging tasks
    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    // if dropped inside the same column
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      }
      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn
        }
      }
      setData(newState)
      return;
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='all-columns' direction='horizontal' type='column'>
        {(provided) => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {data.columnOrder.map((id, index) => {
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

// I mapped over columnOrder to return a Column component with a set of props:
// key = column id
// column = column data from dataset
// tasks = task data from dataset
// index

// provided.placeholder - This is used to create space in the Droppaable as needed during a drag.

