import React from "react";
import { Map as LeafletMap, TileLayer, Marker, Popup} from "react-leaflet";
import Typography from "@material-ui/core/Typography";

class Contact extends React.Component {
    render() {
        const state = { lat: 50.431782, lng: 30.516382, zoom: 13 };
        return (
            <>
                <h1 className="heading">
                    Contact
                </h1>
                <Typography className="body-text" variant="body1" id="photos-gallarey">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                    ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                    mollit anim id est laborum.
                </Typography>
                <div>
                    <LeafletMap
                        center={[50.43, 30.51]}
                        zoom={12}
                        maxZoom={18}
                        attributionControl={true}
                        zoomControl={true}
                        doubleClickZoom={true}
                        scrollWheelZoom={true}
                        dragging={true}
                        animate={true}
                        easeLinearity={0.35}
                    >
                        <TileLayer
                            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[state.lat, state.lng]}>
                        <Popup>
                            We are here :)
                        </Popup>
                        </Marker>
                    </LeafletMap>
                </div>
            </>
        );
    }
}

export default Contact;
