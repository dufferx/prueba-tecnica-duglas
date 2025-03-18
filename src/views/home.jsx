import React, { useState} from 'react'
import Map from '../components/Map'
import Card from '../components/card'
import { db } from '../firebase'
import { addDoc, collection, getDocs, onSnapshot, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import './home.css'
function home() {

    const [name, setName] = useState("")
    const [selectedLocation, setSelectedLocation] = useState(null)
    const [locations, setLocations] = useState([])

    const locationsCollection = collection(db, "locations");

    React.useEffect(() => {
        const unsuscribe = onSnapshot(locationsCollection, (snapshot) => {
            const locationList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setLocations(locationList);
        });
        return () => unsuscribe();
    
    }, []);

    const handleAddFormSubmit = async (e) => {
        e.preventDefault();
        if (!name || !selectedLocation) {
            return;
        }

        try {
            await addDoc(locationsCollection, {
                name,
                address: selectedLocation.address,
                latitude: selectedLocation.lat,
                longitude: selectedLocation.lng,
                
            });

            console.log("Ubicación guardada");
            console.log("Nombre: ", name);
            console.log("Dirección: ", selectedLocation.address);
            console.log("Latitud: ", selectedLocation.lat);
            console.log("Longitud: ", selectedLocation.lng);

            setName("");
            setSelectedLocation(null);

        } catch (error) {
            console.error("Error al guardar: ", error);
        }
    };

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "locations", id));
    }


  return (
    <div>
        <form onSubmit={handleAddFormSubmit}>
        <h1>Añade una nueva ubicación</h1>
        <div className="label">
        <h3>Nombre</h3>
        <input 
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)} 
        />
        </div>
        <h3 className='label'>Seleccciona la ubicación exacta</h3>
        <Map
        setSelectedLocation={setSelectedLocation}
         />

        <button className="submit-buttton" type="submit">Añadir</button>
        </form>
        <h1>Ubicaciones guardadas</h1>
        <div className="cards-container">
        {locations.map((location) => (
            <Card
            key={location.id}
            id={location.id}
            name={location.name}
            address={location.address}
            latitude={location.latitude}
            longitude={location.longitude}
            onDelete={() => handleDelete(location.id)}
            />
        ))}
        </div>
    </div>
  )
}

export default home