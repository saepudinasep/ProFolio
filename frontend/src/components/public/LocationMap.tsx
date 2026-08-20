'use client';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

interface LocationMapProps {
  latitude: number;
  longitude: number;
  zoom?: number;
}

export function LocationMap({ latitude, longitude, zoom = 15 }: LocationMapProps) {
  return (
    <div className='h-full w-full overflow-hidden'>
      <MapContainer
        center={[latitude, longitude]}
        zoom={zoom}
        scrollWheelZoom={false}
        className='h-full w-full'
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        <Marker position={[latitude, longitude]}>
          <Popup>
            <strong>ProFolio</strong>
            <br />
            Studio Pengembangan Produk Digital
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
