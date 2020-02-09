import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

const LeafletMap = (props) => {

    const routers_list = 
        [{
            'name': 'PDSB-ADMIN', 
            'lat': 43.53885796212106, 
            'lng': -79.66675600122652
        }, {
            'name': 'PDSB-MEDIA', 
            'lat': 43.53885822401717, 
            'lng': -79.66675319908991
        }, {
            'name': 'PDSB-WiFi', 
            'lat': 43.53885925408986, 
            'lng': -79.66676499293197
        }, {
            'name': 'PDSB-GUEST', 
            'lat': 43.5388600450642, 
            'lng': -79.66676126215748
        }, {
            'name': 'NETGEAR68', 
            'lat': 43.5387133, 
            'lng': -79.66787195
        }, {
            'name': 'Wireless2', 
            'lat': 43.5389861, 
            'lng': -79.6658873
        }, {
            'name': 'TPGuest', 
            'lat': 43.53898610000001, 
            'lng': -79.6658873
        }, {
            'name': 'Hotspot2E86', 
            'lat': 43.5387932, 
            'lng': -79.6673721
        }, {
            'name': 'HaloCam-2a0ecf', 
            'lat': 43.5387932, 
            'lng': -79.6673721
        }, {
            'name': 'LG Stylo 2 Plus_9586', 
            'lat': 43.53884215909091, 
            'lng': -79.66697206136364
        }];

    const RouterMarkers = () =>{
        let markers = []
        for(let i in routers_list){
            const newPosition = [routers_list[i]['lat'], routers_list[i]['lng']];
            markers.push(
                <Marker position={newPosition}>
                    <Popup>{routers_list[i]['name']}</Popup>
                </Marker>
            )
        }
        console.log(markers);
        return markers;
    }

    const position1 = [43.53885796212106, -79.66675600122652];
    const position2 = [43.5386866, -79.6684081];

    return (
                <Map center={position1} zoom={19}>
                    <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    <RouterMarkers/>
                </Map>
            );
};
export default LeafletMap;