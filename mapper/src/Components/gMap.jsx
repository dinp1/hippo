import React, {Component, useState} from 'react'
import "./home.scss"
import {GoogleMap, withScriptjs} from "react-google-maps";
import withGoogleMap from 'react-google-maps/lib/withGoogleMap';

function gMap(){
  const WrappedMap = withScriptjs(withGoogleMap(Map));
  return(
    <GoogleMap
    defaultZoom={10}
    defaultCenter={{lat: 45, lng: -75}}
    />

  );
}
export default gMap;
