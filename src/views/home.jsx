import React from 'react'
import Map from '../components/Map'
import Card from '../components/card'
import './home.css'
function home() {

    const handleEdit = (name) => {
        console.log("Editar:", name);
      };
    
      const handleDelete = (name) => {
        console.log("Eliminar:", name);
      };

  return (
    <div>
        <form>
        <h1>Añade una nueva ubicación</h1>
        <div className="label">
        <h3>Nombre</h3>
        <input type="text" />
        </div>
        <h3 className='label'>Seleccciona la ubicación exacta</h3>
        <Map />
        <button type="submit">Añadir</button>
        </form>
        <h1>Ubicaciones guardadas</h1>
    </div>
  )
}

export default home