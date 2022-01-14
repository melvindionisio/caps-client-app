import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { Typography, AppBar, Toolbar, Hidden } from "@mui/material";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import React, { useRef, useEffect, useState, useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";
import AccountMenu from "../components/AccountMenu";
import MarkerLogo from "../marker-logo.png";
import { domain } from "../fetch-url/fetchUrl";

mapboxgl.accessToken =
   "pk.eyJ1IjoibWVsc2lvIiwiYSI6ImNrdXF1ZnE3ZTFscTIzMXAxMXNrczJrdjAifQ.9nE1j10j1hd4EWXc6kGlRQ";

const Map = () => {
   const { currentUser } = useContext(LoginContext);

   const controls = new mapboxgl.NavigationControl();
   const mapContainer = useRef(null);
   const map = useRef(null);
   const [lng, setLng] = useState(124.665);
   const [lat, setLat] = useState(12.5096);
   const [zoom, setZoom] = useState(15.25);

   const BOUNDS = [
      [124.2389, 11.8762], // southwest coordinates
      [125.368, 12.9979], //northeast coordinates
   ];

   useEffect(() => {
      if (map.current) return; // initialize map only once
      map.current = new mapboxgl.Map({
         container: mapContainer.current,
         // darkmode
         // style: "mapbox://styles/mapbox/navigation-night-v1",
         // lightmode
         style: "mapbox://styles/melsio/ckxh2zv6w0izd14npfm5p9cn5",
         // style: "mapbox://styles/mapbox/navigation-day-v1",
         // style: "mapbox://styles/melsio/ckxh1gtia1zp614oa0dlp8ow1",
         // style: "mapbox://styles/mapbox/streets-v11",
         // style: "mapbox://styles/mapbox/outdoors-v11",
         // style: "mapbox://styles/mapbox/satellite-streets-v11",
         // style: "mapbox://styles/melsio/ckxfpxxz40k3r15o5aszjz3nd",
         // style: "mapbox://styles/melsio/ckxfq49zf03hg14qlylrabt35",
         // style: "mapbox://styles/mapbox/light-v10?optimize=true",
         center: [lng, lat],
         zoom: zoom,
         pitch: 30,
         // bearing: -17.6,
         antialias: true,
         maxBounds: BOUNDS,
      });
      const abortCont = new AbortController();

      fetch(`${domain}/api/boarding-houses/seeker-map/map-marks`, {
         signal: abortCont.signal,
      })
         .then((res) => {
            if (!res.ok) {
               throw Error("Something went wrong!");
            }
            return res.json();
         })
         .then((data) => {
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

               //<button id="visit-btn" onclick="console.log("i am clicked")">VIEW</button>
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
                  // "fill-extrusion-color": "#203f75",
                  // "fill-extrusion-color": "#26c6da",
                  // "fill-extrusion-color": "#fff",

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
               timeout: 3000,
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
      <Slide in={true} direction="right">
         <Box
            sx={{
               height: "100vh",
               width: "100%",
               overflow: "hidden",
               position: "relative",
            }}
            maxWidth="xl"
            ref={mapContainer}
         >
            <AppBar
               position="sticky"
               elevation={0}
               sx={{
                  width: "80%",
                  background: "rgb(255,255,255)",
                  backdropFilter: "blur(.4rem)",
                  padding: ".5rem 1rem ",
                  color: "#555",
                  borderRadius: "0% 2rem 2rem 0%",
                  border: "1px solid lightgrey",
               }}
            >
               <Toolbar
                  disableGutters
                  variant="dense"
                  sx={{ display: "flex", justifyContent: "space-between" }}
               >
                  <Typography
                     sx={{
                        fontFamily: "Quicksand",
                        textTransform: "uppercase",
                        color: "#333",
                     }}
                     variant="h6"
                     component="h2"
                  >
                     Search 'n Stay
                  </Typography>
                  {/* <Avatar
              sx={{ height: "2.5rem", width: "2.5rem" }}
              size="small"
              src={currentUser.picture}
            /> */}
                  <Hidden lgUp>
                     <AccountMenu currentUser={currentUser} />
                  </Hidden>
               </Toolbar>
               <Box></Box>
            </AppBar>
            <Box
               sx={{
                  backgroundColor: "rgba(255,255,255, 0.6)",
                  backdropFilter: "blur(1.5rem)",
                  color: "#444",
                  padding: ".6rem",
                  zIndex: "1",
                  position: "absolute",
                  top: "4.5rem",
                  left: ".5rem",
                  borderRadius: ".5rem",
                  width: "50%",
               }}
            >
               <Typography variant="caption">
                  Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
               </Typography>
            </Box>
         </Box>
      </Slide>
   );
};

export default Map;
