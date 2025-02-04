"use client";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  LayerGroup,
  GeoJSON,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import point from "../testdata/contohtitik";
import L from "leaflet";
import { useEffect, useState } from "react";
import axios from "axios";
import UploadMain from "./UploadMain";

const icon = L.icon({ iconUrl: "/images/marker-icon.png" });

const test = Object.values(point);

const Maps = () => {
  const [geoJsonData, setGeoJsonData] = useState(null);

  useEffect(() => {
    // Fetch data dari API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8070/api/convert/bataskelurahan"
        );
        setGeoJsonData(response.data.data); // Simpan data GeoJSON ke state
      } catch (error) {
        console.error("Error fetching GeoJSON data:", error);
      }
    };

    fetchData();
  }, []);

  const onEachFeatureKec = (feature: any, layer: any) => {
    if (feature.properties && feature.properties.NM_KEL) {
      layer.bindPopup(`<b>Nama Kelurahan:</b> ${feature.properties.NM_KEL}`);
    }
  };
  return (
    <>
      <div style={{ position: "relative" }}>
        <MapContainer
          style={{
            height: "100vh",
          }}
          center={[-0.654744, 114.569528]}
          zoom={13}
          scrollWheelZoom={true}
        >
          {/* <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
          /> */}
          <LayersControl>
            <LayersControl.BaseLayer name="Open Street Map">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer checked name="Google Map">
              <TileLayer
                attribution="Google Maps"
                url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
              />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer name="Google Map Satellite">
              <LayerGroup>
                <TileLayer
                  attribution="Google Maps Satellite"
                  url="https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
                />
                <TileLayer url="https://www.google.cn/maps/vt?lyrs=y@189&gl=cn&x={x}&y={y}&z={z}" />
              </LayerGroup>
            </LayersControl.BaseLayer>
          </LayersControl>

          {geoJsonData && (
            <GeoJSON data={geoJsonData} onEachFeature={onEachFeatureKec} />
          )}
          {test.map((item, index) => (
            <Marker
              key={index}
              position={[item.LATTITUDE, item.LONGITUDE]}
              icon={icon}
            >
              <Popup>
                A pretty CSS3 popup. <br /> Easily Customizable. {item.judul}
              </Popup>
            </Marker>
          ))}
          {/* <UploadButtons /> */}
        </MapContainer>
        <div
          className="absolute bottom-2 z-[1000]"
          // style={{
          //   position: "absolute",
          //   top: "10px",
          //   right: "10px",
          //   zIndex: 1000, // Pastikan zIndex lebih tinggi dari peta
          // }}
        >
          <UploadMain />
        </div>
      </div>
    </>
  );
};

export default Maps;
