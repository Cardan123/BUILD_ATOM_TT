import React, {useState} from 'react';
import {ReactComponent as Personaje} from '../Assets/personaje.svg';
import {DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Atomo.css'

const initialTasks = [
  {
    id:"1",
    text: " "
  },
  {
    id:"2",
    text: " "
  },
  {
    id:"3",
    text: " "
  },
  {
    id:"4",
    text: " "
  },
  {
    id:"5",
    text: " "
  }
  ];

const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export function Atomo() {
  const [tasks, setTasks] = useState(initialTasks);
  return (
    <DragDropContext onDragEnd={(result) => {
      const {source, destination} = result;
      if(!destination){
        return;
      }
      if (source.index === destination.index &&
          source.droppableId === destination.droppableId)
      {
        return;
      }        

      setTasks(prevTasks => reorder(prevTasks, source.index, destination.index)
      );
    }}>
    <div className='atomo'>
   <Droppable droppableId='tasks'>
      {(droppableProvided) => (
      <ul 
        {...droppableProvided.droppableProps}
        ref={droppableProvided.innerRef}  
        className='task-container'
      >
      
      
      
      {tasks.map((task, index) =>(
        <Draggable key={task.id} draggableId={task.id} index={index}>
        {(draggableProvided)=> (
        <li
          {...draggableProvided.draggableProps}
          ref={draggableProvided.innerRef}
          {...draggableProvided.dragHandleProps}
         className='task-item'
         >
           {task.text}
           </li>
           )}
        </Draggable>
      ))}
      {droppableProvided.placeholder}
      </ul>
      )}
      </Droppable>
    </div>
    </DragDropContext>
  );
}
