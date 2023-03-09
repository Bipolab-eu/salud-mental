// import { useEffect } from 'react';
import { useMapEvents } from 'react-leaflet/hooks';
import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
} from 'react-leaflet';

import fontInter from '@/styles/fonts';
import 'leaflet/dist/leaflet.css';

export default function Map(props) {
  const close = document.createElement('div');
  close.innerText = 'cerrar';

  function EventHandlerComponent() {
    const map = useMapEvents({
      locationfound: (location) => {
        // Obtener coordenadas del usuario por gps
        const latLng = Object.values(location.latlng);
        map.setView(latLng);
      },
      popupopen: () => {
        // Texto cerrar del botón de salir
        const element = document.querySelector('.leaflet-popup-close-button');
        element.appendChild(close);
      },
    });

    // Centrar mapa en la ubicación del usuario
    map.locate();
    return null;
  }

  return (
    <MapContainer
      className="w-full h-full"
      center={[50.000, -15.000]}
      zoom={14}
      scrollWheelZoom
    >
      <EventHandlerComponent />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {Object.values(props).map((marker) => (
        <Marker
          key={marker.center}
          position={marker.position}
        >
          <Popup
            className="marker-popup"
            offset={[120, 10]}
          >
            <ul className={`${fontInter.className} text-xs text-black`}>
              <li className="pb-2">
                Nombre del Instituto:
                <div className="div-0">
                  {`${marker.center}.`}
                </div>
              </li>
              <li className="pb-2">
                Media Aritmética Global:
                <div>
                  {`(${marker.value}) sobre 100`}
                </div>
              </li>
              <li className="pb-2">
                Estado de salud:
                <div>{marker.status}</div>
              </li>
            </ul>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
