import { useEffect, useRef, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import axios from 'axios';
import LineChartTemp from '../components/LineChartTemp.jsx';
import LineChartUv from '../components/LineChartUv.jsx';

export default function MapContainer() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const tunis = { lng: 10.1815, lat: 36.8065 };
    const [zoom] = useState(14);
    maptilersdk.config.apiKey = 'F5xaLnbZW2NGvcInjeum';
    const [maxTemp, setMaxTemp] = useState(null);
    const [minTemp, setMinTemp] = useState(null);
    const [uvIndex, setUvIndex] = useState(null);

    useEffect(() => {
        if (!mapContainer.current || map.current) return;

        map.current = new maptilersdk.Map({
            container: mapContainer.current,
            style: maptilersdk.MapStyle.STREETS,
            center: [tunis.lng, tunis.lat],
            zoom: zoom
        });

        // Add click event listener to the map
        map.current.on('click', handleMapClick);

        return () => {
            if (map.current)
                map.current.off('click', 'places', handleMapClick);
        };
    }, [tunis.lng, tunis.lat, zoom]);

    const handleMapClick = async(event) => {
        // Get the coordinates of the clicked location
        const { lngLat } = event;
        const clickedLng = lngLat.lng;
        const clickedLat = lngLat.lat;

        // Log the coordinates to the console (replace with your desired logic)
        const res = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${clickedLat}&longitude=${clickedLng}&hourly=temperature_2m,relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,wind_speed_10m_max&timezone=auto`).catch(err => console.log(err));
        setMaxTemp(res.data.daily.temperature_2m_max);
        setMinTemp(res.data.daily.temperature_2m_min);
        setUvIndex(res.data.daily.uv_index_max);
        console.log(res.data.daily.uv_index_max);
    };

    return (
        <div className="map-wrap flex flex-row flex-wrap">
            <div ref={mapContainer} className="map"/>
            <div className="p-10">
                <LineChartTemp inputMax={maxTemp} inputMin={minTemp} />
                <LineChartUv inputUv={uvIndex} />
            </div>

        </div>
    );
}
