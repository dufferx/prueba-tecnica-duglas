import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import Map from "../components/Map";

function EditLocation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [initialPosition, setInitialPosition] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      const docRef = doc(db, "locations", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setName(data.name);
        const location = {
          lat: data.latitude,
          lng: data.longitude,
          address: data.address,
        };
        setSelectedLocation(location);
        setInitialPosition(location);
      } else {
        toast.error("Ubicación no encontrada.")
      }
    };

    fetchLocation();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name || !selectedLocation){
        toast.warn("Ingrese un nombre y seleccione una ubicación.");
        return

    }

    try {
      await updateDoc(doc(db, "locations", id), {
        name,
        address: selectedLocation.address,
        latitude: selectedLocation.lat,
        longitude: selectedLocation.lng,
      });

      toast.success("Ubicación actualizada con éxito.");
      navigate("/");
    } catch (error) {
        toast.error("Error al actualizar la ubicación.");
    }
  };

  return (
    <div>
      <h1>Editar Ubicación</h1>
      <form onSubmit={handleUpdate}>
        <div className="label">
          <h3>Nombre</h3>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <h3 className="label">Selecciona la nueva ubicación</h3>
        <Map setSelectedLocation={setSelectedLocation} initialPosition={initialPosition} />
        <div className="submit-container">
        <button className="update-buttton" type="submit">Actualizar</button>
        <button className="cancel-buttton" onClick={() => navigate(`/`)} >Cancelar </button>
        </div>
      </form>
    </div>
  );
}

export default EditLocation;
