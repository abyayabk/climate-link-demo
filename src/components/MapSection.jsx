import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useUser } from "../context/UserContext";


// Fix for default marker icons not showing up in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Using your existing regions list
const nigeriaRegions = [
    { id: "lagos", name: "Lagos", lat: 6.5244, lon: 3.3792 },
    { id: "kano", name: "Kano", lat: 12.0022, lon: 8.5920 },
    { id: "abuja", name: "Abuja", lat: 9.0765, lon: 7.3986 },
    { id: "rivers", name: "Rivers", lat: 4.8156, lon: 7.0498 },
    { id: "kaduna", name: "Kaduna", lat: 10.5105, lon: 7.4165 },
    { id: "oyo", name: "Oyo", lat: 7.3775, lon: 3.9470 },
    { id: "edo", name: "Edo", lat: 6.3350, lon: 5.6037 },
    { id: "delta", name: "Delta", lat: 5.8904, lon: 5.6832 },
    { id: "enugu", name: "Enugu", lat: 6.4584, lon: 7.5032 },
    { id: "plateau", name: "Plateau", lat: 9.8965, lon: 8.8583 },
    { id: "benue", name: "Benue", lat: 7.3333, lon: 8.7500 },
    { id: "ondo", name: "Ondo", lat: 7.1000, lon: 4.8417 },
];

const MapSection = ({ currentRegionId }) => {
    const {user, setUser} = useUser();
    const center = [9.082, 8.6753]; // Geographical center of Nigeria

    // Boundary coordinates: [South-West Corner, North-East Corner]
    // This roughly boxes in Nigeria's borders.
    const nigeriaBounds = [
        [4.0, 2.5],  // Southwest (near Lagos/ocean)
        [14.0, 15.0] // Northeast (near Lake Chad)
    ];

    return (
        <div className="h-96 w-full rounded-xl overflow-hidden border border-slate-800 shadow-lg">
            <MapContainer
                center={center}
                zoom={5}
                minZoom={5}              // Prevent zooming out further than Nigeria level[cite: 4]
                maxZoom={10}             // Optional: prevent zooming in too deep
                maxBounds={nigeriaBounds} // Lock the view to this box
                maxBoundsViscosity={1.0} // 1.0 makes the bounds "hard"—user can't drag outside
                style={{ height: '100%', width: '100%' }}
            >
                {/* The TileLayer provides the map background. CartoDB "Light" is a clean look. */}
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; OpenStreetMap contributors'
                />

                {nigeriaRegions.map((region) => {
                    // Logic from app.js: Determine color based on risk level
                    const color = region.risk === 'very-high' ? '#ef4444' :
                        region.risk === 'high' ? '#f97316' : '#fbbf24';

                    return (
                        <CircleMarker
                            key={region.id}
                            center={[region.lat, region.lon]}
                            radius={region.id === currentRegionId ? 10 : 6} // Highlight current region
                            pathOptions={{
                                fillColor: color,
                                color: color,
                                fillOpacity: 0.7,
                                weight: 2
                            }}
                            eventHandlers={{
                                click: () => {
                                    setUser({ ...user, region: region.name });
                                },
                            }}
                        >
                            <Popup>
                                <div className="text-slate-900">
                                    <strong className="block">{region.name}</strong>
                                    {/* <span>Risk Level: {region.risk}</span> */}
                                </div>
                            </Popup>
                        </CircleMarker>
                    );
                })}
            </MapContainer>
        </div>
    );
};

export default MapSection;