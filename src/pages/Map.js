import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import {
   List,
   ListItemButton,
   ListItemText,
   Typography,
   AppBar,
   Toolbar,
   Hidden,
   InputBase,
} from "@mui/material";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import React, { useRef, useEffect, useState, useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";
import AccountMenu from "../components/AccountMenu";
import MarkerLogo from "../marker-logo.png";
import { domain } from "../fetch-url/fetchUrl";
//import * as MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { useTheme } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import { lightBlue } from "@mui/material/colors";

mapboxgl.accessToken =
   "pk.eyJ1IjoibWVsc2lvIiwiYSI6ImNrdXF1ZnE3ZTFscTIzMXAxMXNrczJrdjAifQ.9nE1j10j1hd4EWXc6kGlRQ";

const Map = () => {
   const theme = useTheme();
   const { currentUser } = useContext(LoginContext);
   const [boardingHouseLocations, setBoardingHouseLocations] = useState([]);
   const [isShowResult, setIsShowResult] = useState(false);
   const [result, setResult] = useState([]);
   const [query, setQuery] = useState("");

   const controls = new mapboxgl.NavigationControl();
   const mapContainer = useRef(null);
   const map = useRef(null);
   const [lng, setLng] = useState(124.665);
   const [lat, setLat] = useState(12.5096);
   const [zoom, setZoom] = useState(15.25);
   const [isNotFound, setIsNotFound] = useState(false);

   useEffect(() => {
      if (result) {
         if (result.length <= 0) {
            setIsNotFound(true);
         }
      }
   }, [result]);

   const handleSearch = () => {
      setIsNotFound(false);
      let res;
      if (boardingHouseLocations) {
         res = boardingHouseLocations.filter((boardinghouse) => {
            return boardinghouse.properties.title
               .toLowerCase()
               .includes(query.toLowerCase());
         });
         setResult(
            Array.from(res, (house) => {
               return {
                  name: house.properties.title,
                  address: house.properties.description,
                  coordinates: house.geometry.coordinates,
               };
            })
         );

         //if (
         //query === "" ||
         //boardinghouse.geometry.coordinates[0] === 0 ||
         //boardinghouse.geometry.coordinates[1] === 0
         //) {
         //map.current.flyTo({
         //center: [124.665, 12.5096],
         //zoom: 15.25,
         //});
         //setIsNotFound(true);
         //} else {
         //map.current.flyTo({
         //center: boardinghouse.geometry.coordinates,
         //zoom: 19.0,
         //});
         //}
      }
   };
   const locateSearch = (coordinates) => {
      map.current.flyTo({
         center: coordinates,
         zoom: 19.0,
      });
      setQuery("");
      setIsShowResult(false);
   };

   const BOUNDS = [
      [124.2389, 11.8762], // southwest coordinates
      [125.368, 12.9979], //northeast coordinates
   ];

   const geocoder = new MapboxGeocoder({
      // Initialize the geocoder
      accessToken: mapboxgl.accessToken, // Set the access token
      mapboxgl: mapboxgl, // Set the mapbox-gl instance
      marker: true, // Do not use the default marker style
      placeholder: "Search for places in University of Eastern Philippines", // Placeholder text for the search bar
      bbox: [124.2389, 11.8762, 125.368, 12.9979], // Boundary for Berkeley
      proximity: {
         longitude: 124.6649,
         latitude: 12.5094,
      }, // Coordinates of UC Berkeley
   });

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
         //style: "mapbox://styles/mapbox/satellite-streets-v11",
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
            setBoardingHouseLocations(data.features);
            data.features.forEach(function (marker) {
               const el = document.createElement("div");
               el.innerHTML = `<img src="${MarkerLogo}"/> <span id="total-rooms">${marker.properties.totalRooms}</span>`;
               el.className = "marker";

               new mapboxgl.Marker(el)
                  .setLngLat(marker.geometry.coordinates)
                  .setPopup(
                     new mapboxgl.Popup({
                        offset: 20,
                        closeButton: false,
                     })
                        .setHTML(`<h6>&#160; &#160;${marker.properties.title}&#160; &#160;</h6>
            <h5>${marker.properties.description}</h5><a href="/boardinghouse/${marker.properties.id}"><button id="visit-btn">VIEW</button></a>
           `)
                  )
                  .addTo(map.current);
            });
         })
         .catch((err) => {
            if (err.name === "AbortError") {
               console.log("fetch aborted");
               setBoardingHouseLocations([]);
            } else {
               console.log("ready");
            }
         });

      map.current.on("load", () => {
         map.current.addSource("single-point", {
            type: "geojson",
            data: {
               type: "FeatureCollection",
               features: [],
            },
         });

         map.current.addLayer({
            id: "point",
            source: "single-point",
            type: "circle",
            paint: {
               "circle-radius": 10,
               "circle-color": "#448ee4",
            },
         });

         // Listen for the `result` event from the Geocoder
         // `result` event is triggered when a user makes a selection
         //  Add a marker at the result's coordinates
         geocoder.on("result", (event) => {
            map.current
               .getSource("single-point")
               .setData(event.result.geometry);
         });

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

      //map.current.addControl(geocoder);

      map.current.addControl(
         new mapboxgl.FullscreenControl({
            container: mapContainer.current,
         })
      );

      map.current.addControl(controls, "bottom-right");
      //return () => map.current.remove();
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
                  padding: ".6rem",
                  px: 0,
                  zIndex: "1",
                  position: "absolute",
                  top: "4.5rem",
                  left: ".5rem",
                  borderRadius: ".5rem",
                  minWidth: "300px",
               }}
            >
               <Box
                  sx={{
                     position: "relative",
                     borderRadius: theme.shape.borderRadius,
                     backdropFilter: "blur(1.5rem)",
                     backgroundColor: "rgba(255, 255, 255, 0.5)",
                     "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.25)",
                        outline: `1px solid ${lightBlue[500]}`,
                     },
                     width: "100%",
                     [theme.breakpoints.up("sm")]: {
                        marginLeft: theme.spacing(3),
                        width: "auto",
                     },
                  }}
               >
                  <Box
                     sx={{
                        padding: theme.spacing(0, 2),
                        height: "100%",
                        position: "absolute",
                        pointerEvents: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                     }}
                  >
                     <SearchIcon />
                  </Box>
                  <InputBase
                     placeholder="Search boarding house…"
                     onKeyDown={(e) => {
                        if (e.keyCode === 8) {
                           map.current.flyTo({
                              center: [124.665, 12.5096],
                              zoom: 15.25,
                           });
                        }
                     }}
                     onChange={(e) => {
                        setQuery(e.target.value);
                        if (e.target.value !== "") {
                           handleSearch();
                           setIsShowResult(true);
                        } else {
                           setIsShowResult(false);
                        }
                     }}
                     value={query}
                     sx={{
                        color: "inherit",
                        "& .MuiInputBase-input": {
                           width: "100%",
                           padding: theme.spacing(1, 1, 1, 0),
                           // vertical padding + font size from searchIcon
                           paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                           transition: theme.transitions.create("width"),
                           [theme.breakpoints.up("md")]: {
                              width: "20ch",
                           },
                        },
                     }}
                  />
               </Box>
               {isShowResult && (
                  <Box
                     sx={{
                        borderRadius: ".5rem",
                        mt: 1,
                        maxHeight: 200,
                        overflowY: "auto",
                        width: 300,
                        ml: 2.5,
                        backgroundColor: "rgba(255,255,255, 0.6)",
                        backdropFilter: "blur(1.5rem)",
                     }}
                  >
                     <List component="nav" aria-label="search-results">
                        {result.map((res) => (
                           <ListItemButton
                              key={res.name}
                              onClick={() => locateSearch(res.coordinates)}
                           >
                              <ListItemText primary={res.name} />
                           </ListItemButton>
                        ))}
                        {isNotFound && (
                           <ListItemText primary="Not found." sx={{ px: 1 }} />
                        )}
                     </List>
                  </Box>
               )}
            </Box>
            {/*
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

                */}
         </Box>
      </Slide>
   );
};

export default Map;
