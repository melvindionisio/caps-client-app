import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { Typography, Container } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useRef, useEffect, useState } from "react";
import MarkerLogo from "../marker-logo.png";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWVsc2lvIiwiYSI6ImNrdXF1ZnE3ZTFscTIzMXAxMXNrczJrdjAifQ.9nE1j10j1hd4EWXc6kGlRQ";

const MiniMap = ({ bhId }) => {
  const controls = new mapboxgl.NavigationControl();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(124.665);
  const [lat, setLat] = useState(12.5096);
  const [zoom, setZoom] = useState(13.9);

  const BOUNDS = [
    [124.2389, 11.8762], // southwest coordinates
    [125.368, 12.9979], //northeast coordinates
  ];

  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/melsio/ckxh2zv6w0izd14npfm5p9cn5",
      center: [lng, lat],
      zoom: zoom,
      pitch: 30,
      // bearing: -17.6,
      antialias: true,
      maxBounds: BOUNDS,
    });

    const abortCont = new AbortController();
    fetch(
      `http://localhost:3500/api/boarding-houses/owner-map/map-marks/${bhId}`,
      {
        signal: abortCont.signal,
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("Something went wrong!");
        }
        return res.json();
      })
      .then((data) => {
        // console.log(data.features[0].geometry.coordinates);

        // setLng(data.features[0].geometry.coordinates[0]);
        // setLat(data.features[0].geometry.coordinates[1]);

        data.features.forEach(function (marker) {
          const el = document.createElement("div");
          el.innerHTML = `<img src="${MarkerLogo}"/>`;
          el.className = "marker";

          new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .setPopup(
              new mapboxgl.Popup({
                offset: 20,
                closeButton: false,
              })
                .setHTML(`<h6>&#160; &#160;${marker.properties.title}&#160; &#160;</h6>
            <h5>${marker.properties.description}</h5>
           `)
            )
            .addTo(map.current);
        });
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          console.log("ready");
        }
      });

    map.current.on("load", () => {
      // Insert the layer beneath any symbol layer.
      const layers = map.current.getStyle().layers;
      const labelLayerId = layers.find(
        (layer) => layer.type === "symbol" && layer.layout["text-field"]
      ).id;

      // The 'building' layer in the Mapbox Streets
      // vector tileset contains building height data
      // from OpenStreetMap.
      map.current.addLayer(
        {
          id: "add-3d-buildings",
          source: "composite",
          "source-layer": "building",
          filter: ["==", "extrude", "true"],
          type: "fill-extrusion",
          minzoom: 15,
          paint: {
            "fill-extrusion-color": "#ffa726",
            // Use an 'interpolate' expression to
            // add a smooth transition effect to
            // the buildings as the user zooms in.

            "fill-extrusion-height": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              0,
              15.05,
              ["get", "height"],
            ],
            "fill-extrusion-base": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              0,
              15.05,
              ["get", "min_height"],
            ],
            "fill-extrusion-opacity": 0.6,
          },
        },
        labelLayerId
      );
    });

    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
          timeout: 1000,
        },
        trackUserLocation: true,
        showUserLocation: true,
        showUserHeading: true,
      })
    );
    map.current.addControl(
      new mapboxgl.FullscreenControl({
        container: mapContainer.current,
      })
    );

    map.current.addControl(controls, "bottom-right");
  });

  useEffect(() => {
    const controller = new AbortController();

    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    return () => {
      // cancel the request before component unmounts
      controller.abort();
    };
  });

  return (
    <Container
      disableGutters
      sx={{
        height: "50vh",
        width: "100%",
        overflow: "hidden",
        position: "relative",
        borderRadius: 2,
        border: ".2rem solid white",
      }}
      maxWidth="xl"
      ref={mapContainer}
    >
      <Box
        sx={{
          backgroundColor: "rgba(255,255,255, 0.6)",
          backdropFilter: "blur(1.5rem)",
          color: "#444",
          padding: ".6rem",
          zIndex: "1",
          position: "absolute",
          top: ".5rem",
          left: ".5rem",
          borderRadius: ".5rem",
          width: "50%",
        }}
      >
        <Typography variant="caption">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </Typography>
      </Box>
    </Container>
  );
};

export default MiniMap;
