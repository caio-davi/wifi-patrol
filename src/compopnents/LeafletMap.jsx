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
            <div>
                {showRadius(position, 'blue')}
                <Marker position={position} icon={patrolIcon} >
                    <Popup>So far, so good...</Popup>
                </Marker>
            </div>
        )
    };

    const showRadius = (position, color) => {
        return props.showRadius ? <Circle radius={35} center={position}  color={color}/> : '';
    };

    const Intruder = () => {
        if(props.intruder.status){
            const position = [props.intruder['lat'], props.intruder['lng']];
            return(
                <div>
                    {showRadius(position, 'red')}
                    <Marker position={position} icon={intruderIcon} >
                        <Popup>So far, so good...</Popup>
                    </Marker>
                </div>
            )
        }else{
            return '';
        }
    };
    
    const RouterMarkers = () =>{
        let markers = []
        for(let i in props.routers){
            const position = [props.routers[i]['lat'], props.routers[i]['lng']];
            markers.push(
                <div>
                    {showRadius(position, props.routers[i]['color'])}
                    <Marker position={position} >
                        <Popup>{props.routers[i]['name']}</Popup>
                    </Marker>
                </div>
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