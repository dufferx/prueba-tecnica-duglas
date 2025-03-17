import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, InfoWindow, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '650px',
  height: '35g0px',
};

const center = {
  lat: 37.7749,
  lng: -122.4194,
};

const Map = () => {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [address, setAddress] = useState('');

  const handleMapClick = useCallback((event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelectedPosition({ lat, lng });

    const geocoder = new window.google.maps.Geocoder();
    const latlng = { lat, lng };

    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          setAddress(results[0].formatted_address);
        } else {
          setAddress('No address found');
        }
      } else {
        setAddress('Geocoder failed due to: ' + status);
      }
    });
  }, []);

  const handleInfoWindowCloseClick = useCallback(() => {
    setSelectedPosition(null);
    setAddress('');
  }, []);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onClick={handleMapClick}
      >
        {selectedPosition && (
          <>
            <Marker position={selectedPosition} />
            <InfoWindow
              position={selectedPosition}
              onCloseClick={handleInfoWindowCloseClick}
            >
              <div>
                <h4>Address</h4>
                <p>{address}</p>
              </div>
            </InfoWindow>
          </>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
