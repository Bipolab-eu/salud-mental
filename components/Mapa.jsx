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
  function EventHandlerComponent() {
    const map = useMapEvents({
      locationfound: (location) => {
        // Obtener coordenadas del usuario por gps
        const latLng = Object.values(location.latlng);
        map.setView(latLng);
      },
    });

    // Centrar mapa en la ubicación del usuario
    map.locate();
    return null;
  }

  return (
    <MapContainer
      className="w-full h-full"
      center={[28.0997300, -15.4134300]}
      zoom={14}
      scrollWheelZoom
    >
      <EventHandlerComponent />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {Object.values(props).map((centro) => (
        <Marker
          key={centro.id}
          position={centro.coordenadas}
        >
          <Popup
            className="marker-popup"
            offset={[135, 25]}
          >
            <ul className={`${fontInter.className} text-xs text-black`}>
              <li className="pb-2">
                Nombre del Instituto:
                <div className="div-0">
                  {`${centro.nombre}.`}
                </div>
              </li>
              <li className="pb-2">
                Media Aritmética Global:
                <div>
                  {`(${0}) sobre 100`}
                </div>
              </li>
              <li className="pb-2">
                Estado de salud:
                <div>Bueno</div>
              </li>
              <span className="absolute bottom-2 right-2">
                cerrar
              </span>
            </ul>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
