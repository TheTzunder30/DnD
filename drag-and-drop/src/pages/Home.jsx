import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import DraggableItem from '../DraggableItem';
import DropTarget from '../DropTarget';
import '../App.css';
import { Link } from 'react-router-dom';

const App = () => {
  const naigate = useNavigate();
  // const history = useNavigate();
  const [list1, setList1] = useState(['Alejandro', 'Raimundo', 'Antouan']);
  const [list2, setList2] = useState(['Rocio', 'Lucia', 'Zafra']);
  const [list3, setList3] = useState(['Fotos', 'Pinturas', 'Prendas']);
  const [droppedItems, setDroppedItems] = useState({ l1: null, l2: null, l3: null });

  const handleDrop = (targetListId, item) => {
    const newDroppedItems = { ...droppedItems };
    newDroppedItems[targetListId] = item;
    setDroppedItems(newDroppedItems);
  };

  const handleConfirm = () => {
    
    if (droppedItems.l1 && droppedItems.l2 && droppedItems.l3) {
      history.push('/StoryPage', { selections: [droppedItems.l1, droppedItems.l2, droppedItems.l3] });
    } else {
      alert('Por favor, selecciona una opción para cada palabra antes de confirmar.');
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <div className="Lists">
          <div className="List">
            <h2>Palabra 1</h2>
            {list1.map((item, index) => (
              <DraggableItem key={index} item={item} listId="l1" onDrop={handleDrop} />
            ))}
          </div>

          <div className="List">
            <h2>Palabra 2</h2>
            {list2.map((item, index) => (
              <DraggableItem key={index} item={item} listId="l2" onDrop={handleDrop} />
            ))}
          </div>

          <div className="List">
            <h2>Palabra 3</h2>
            {list3.map((item, index) => (
              <DraggableItem key={index} item={item} listId="l3" onDrop={handleDrop} />
            ))}
          </div>
        </div>

        <div className="Story">
          {/* Historia */}
          <h2>Historia Inventada</h2>
          <p style={{ margin: '0', lineHeight: '1.5', fontSize: '1.2em', textAlign: 'center' }}>
            Había una vez en un pequeño pueblo rodeado de verdes colinas, un joven llamado
            <DropTarget onDrop={handleDrop} listId="l1" allowedListId="l1">
              {droppedItems.l1 !== null ? <span style={{ fontWeight: 'bold' }}>{droppedItems.l1}</span> : '___'}
            </DropTarget>. Un día, mientras paseaba por el mercado, sus ojos se encontraron con los de
            <DropTarget onDrop={handleDrop} listId="l2" allowedListId="l2">
              {droppedItems.l2 !== null ? <span style={{ fontWeight: 'bold' }}>{droppedItems.l2}</span> : '___'}
            </DropTarget>, una artista local que vendía sus
            <DropTarget onDrop={handleDrop} listId="l3" allowedListId="l3">
              {droppedItems.l3 !== null ? <span style={{ fontWeight: 'bold' }}>{droppedItems.l3}</span> : '___'}
            </DropTarget> en una pequeña tienda. La conexión fue instantánea, como si el destino hubiera conspirado para unirlos.
          </p>
          <button style={{ marginTop: '20px', padding: '10px', fontSize: '1em' }} onClick={handleConfirm}>Confirmar</button>
        </div>
      </div>
    </DndProvider>
  );
};



export default App;
