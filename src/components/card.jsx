import React from 'react'
import './card.css'
function card({ name, address, latitude, longitude, onEdit, onDelete }) {

    const [newName, setNewName] = React.useState(name);
    const [isEditing, setIsEditing] = React.useState(false);

  return (
    <div className="card">
        <h3>{name}</h3>        
        <h3 className='address'>{address}</h3>
        <p> {latitude},  {longitude}</p>
        <div className="button-container">
        <button className="buttons" onClick={onEdit}>Editar</button>
        <button className="buttons" onClick={onDelete}>Eliminar</button>
        </div>
  
    </div>
  );
};

export default card