import React from 'react';
import { Map, Marker, Popup, TileLayer, Circle } from 'react-leaflet';
import L from 'leaflet';

const LeafletMap = (props) => {

    var patrolIcon = L.icon({
            iconUrl: 'https://corruptionbycops.com/wp-content/uploads/2019/06/civilian-blue-police-groups.fw_.png',
            iconAnchor: [15, 15],
            iconSize: [40, 40],
            popupAnchor: [0, 0],
        });

    var intruderIcon = L.icon({
            iconUrl: 'https://i.ya-webdesign.com/images/anonymous-png-icon-16.png',
            iconSize: [40, 40],
            iconAnchor: [15, 15],
            popupAnchor: [0, 0],
        });

    const Patrol = () => {
        const position = [props.patrol['lat'], props.patrol['lng']];
        return(
            <Marker position={position} icon={patrolIcon} >
            <Circle radius={35} center={position}  color="blue"/>
                <Popup>So far, so good...</Popup>
            </Marker>
        )
    };

    const Intruder = () => {
        const position = [props.intruder['lat'], props.intruder['lng']];
        return(
            <Marker position={position} icon={intruderIcon} >
            <Circle radius={35} center={position}  color="red"/>
                <Popup>So far, so good...</Popup>
            </Marker>
        )
    };
    
    const RouterMarkers = () =>{
        let markers = []
        for(let i in props.routers){
            const newPosition = [props.routers[i]['lat'], props.routers[i]['lng']];
            markers.push(
                <Marker position={newPosition} >
                    <Circle radius={35} center={newPosition}  color={props.routers[i]['color']}/>
                    <Popup>{props.routers[i]['name']}</Popup>
                </Marker>
            )
        }
        return markers;
    }

    return (
                <Map center={props.center} zoom={19} >
                    <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    <RouterMarkers/>
                    <Patrol/>
                    <Intruder/>
                </Map>
            );
};
export default LeafletMap;