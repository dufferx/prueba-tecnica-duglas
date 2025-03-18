import React from 'react'
import { useNavigate } from 'react-router-dom';
import './card.css'
function card({ id, name, address, latitude, longitude, onDelete }) {

    const navigate = useNavigate();

    const [newName, setNewName] = React.useState(name);
    const [isEditing, setIsEditing] = React.useState(false);

  return (
    <div className="card">
        <h3>{name}</h3>        
        <h3 className='address'>{address}</h3>
        <p> {latitude},  {longitude}</p>
        <div className="button-container">
        <button className="buttons" onClick={() => navigate(`/edit/${id}`)}>Editar</button>
        <button className="buttons" onClick={onDelete}>Eliminar</button>
        </div>
  
    </div>
  );
};

export default card