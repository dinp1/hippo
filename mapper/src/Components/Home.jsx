import React, {useState} from 'react'
import "./home.scss"
import { useForm } from "react-hook-form";
import {GoogleMap, useLoadScript, Marker, InfoWindow} from "@react-google-maps/api";
import MaskedInput from 'react-maskedinput'
import crimeData from '../crimes-at-location.json';


export default function Home(){
    const {  handleSubmit, formState: { errors } } = useForm();
    const [postcode, setPostcode] = useState('');
    const [date, setDate] = useState('');
    const [longr, setLongr] = useState(-0.118092);
    const [latr, setLatr] = useState(51.509865);
    const [markers, setMarkers] = React.useState([{lat:51.509865 , lng:-0.118092}]); //{ lat:53.483959 , lng:-2.244644} manchester
    const [cat, setCat] = React.useState([]);
    const [catStat, setCatStat] = React.useState([]);
    const [selected, setSelected] = useState(null);
    
    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    const mapContainerStyle ={
        width: "900px",
        height: "700px",
    };

    //const coords = { lat: 51.509865, lng: -0.118092 };
    const coords = { lat: +latr, lng: +longr}
    const {isLoaded, loadError} = useLoadScript({googleMapsApiKey: "AIzaSyAjtlRoJYx0XPp2jlV2yqLuHlMa-My1uZY", 
                                libraries: ["places"]});


    const onSubmit = (e) => {
        setMarkers([]);
        setCatStat([]);
        const send = {"postcode":postcode};
        fetch('http://localhost:8080/postcode/post1', {
            method: 'POST',
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(send)
        }).then(response => response.json())
            .then(response => {
                //const myObj = JSON.parse(response);
                setLongr(response.Longitude);
                setLatr(response.Latitude);
        })
        .catch((error)=> {
            console.log(error)
        });

        //https://data.police.uk/api/crimes-at-location?date=2020-02&lat=52.629729&lng=-1.131592
        fetch('https://data.police.uk/api/crimes-at-location?date=' + date + '&lat=' + latr + '&lng=' + longr)
            .then(response => response.json())
            .then(response => {
                const count = Object.keys(response).length;
                    //crimeData.forEach
                response.forEach((item) => {
                    //const newMarker = {lat:52.944811 , lng:-1.135013};
                    cat.push(item.category)
                    setMarkers((markers) => [...markers, {lat:parseFloat(item.location.latitude), lng:parseFloat(item.location.longitude)}]);
                })

                const counts = {};
                for (var i = 0; i < cat.length; i++) {
                    counts[cat[i]] = 1 + (counts[cat[i]] || 0);
                }

                setCatStat(Object.entries(counts));
            })
        .catch((error)=> {
            console.log(error)
        });
    }
    
      if(loadError) return "Error Loading maps";
      if(!isLoaded) return "loading Maps";

    return (
        <div className = "home" >
            <div className="form">
                <h1>Home</h1>
                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                    <input className="input" placeholder='Postcode' value={postcode} onChange={(e) => setPostcode(e.target.value)}/>
                    <MaskedInput className="input" mask="1111-11" name="date2" placeholder="YYYY-MM" onChange={(e) => setDate(e.target.value)}/>
                    <input className="input" type="submit" />
                </form>
            </div>
            <div className="gmaps">
                <GoogleMap 
                    mapContainerStyle={mapContainerStyle}
                    zoom={10}
                    center={coords}
                    onLoad={onMapLoad}
                >
                    {markers.map(marker => (
                        <Marker
                            position={{ lat: marker.lat, lng: marker.lng}}
                            onClick={() => {
                                setSelected(marker);
                                
                            }}
                        />
                    ))}
                    {selected ? (
                    <InfoWindow position={{lat: selected.lat+0.004, lng:selected.lng}} onCloseClick={() => {setSelected(null);}}>
                        <div>
                            <h2>Crime stats:</h2>
                            <ul>
                                {catStat.map((item, i) =>(<li key={i}>{item[0] + " : " + item[1]}</li>))}
                            </ul>
                        </div>
                    </InfoWindow>) : null}
                </GoogleMap>
            </div>
        </div>
    );
  
}
