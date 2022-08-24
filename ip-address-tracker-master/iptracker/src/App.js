import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useState} from "react";
import { InputGroup, Form } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

function App() {
  const [ipinfo, setipinfo] = useState("");

  return (
    <div className="App">
      <Header>
        <Search getIp={setipinfo} />
        <Report ipinfo={ipinfo} />
      </Header>
      <Map ipinfo={ipinfo} />
    </div>
  );
}

const Header = ({ children }) => {
  return (
    <>
      <div className="head d-flex flex-column align-items-center">
        <div className="header">
          <h3 className="title mt-5 mb-4">IP Address Tracker</h3>
        </div>
        {children}
      </div>
    </>
  );
};

const Search = ({ getIp }) => {
  const [search, setSearch] = useState("8.8.8.8");

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  let ip = search;

  var api_key =
    "https://geo.ipify.org/service/account-balance?apiKey=at_xZlgEnejsPISkvbHuc0VcsP8k37oG";
  var api_url =
    "https://geo.ipify.org/api/v2/country,city?apiKey=at_xZlgEnejsPISkvbHuc0VcsP8k37oG&ipAddress=8.8.8.8";
  var url = api_url + "apiKey=" + api_key + "&ipAddress=" + ip;

  const getInfo = async () => {
    const info = await fetch(url);
    const data = await info.json();
    getIp(data);
  };

  return (
    <>
      <div className="searchbar mb-5 w-75">
        <InputGroup size="lg" className="">
          <Form.Control
            aria-label="Large"
            aria-describedby="inputGroup-sizing-lg"
            placeholder="Search for any IP address or domain"
            onChange={handleSearch}
            value={search}
          />
          <InputGroup.Text id="inputGroup-sizing-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="14"
              onClick={getInfo}
            >
              <path
                fill="none"
                stroke="#FFF"
                strokeWidth="3"
                d="M2 1l6 6-6 6"
              />
            </svg>
          </InputGroup.Text>
        </InputGroup>
      </div>
    </>
  );
};

const Report = ({ ipinfo }) => {
  const {
    location = { region: "TamilNadu", city: "Chennai", timezone: -0.05 },
    isp = "BSNL",
    ip = "8.8.8.8",
  } = ipinfo;

  return (
    <>
      <div className="card d-flex flex-lg-row flex-sm-col  p-lg-5 p-sm-3">
        <div className="parts">
          <p className="label">IP ADDRESS</p>
          <h3 className="desc">{ip}</h3>
        </div>

        <div className="parts">
          <p className="label">LOCATION</p>
          <h3 className="desc">{`${location.region},${location.city}`}</h3>
        </div>

        <div className="parts">
          <p className="label">TIMEZONE</p>
          <h3 className="desc">UTC{location.timezone}</h3>
        </div>

        <div className="parts">
          <p className="label">ISP</p>
          <h3 className="desc">{isp}</h3>
        </div>
      </div>
    </>
  );
};

const Map = ({ ipinfo }) => {
  const ChangeView = ({ center, zoom }) => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  };

  const { location = { lat: 13.0827, lng: 80.2707 } } = ipinfo;

  let center = [location.lat, location.lng];

  return (
    <div id="map" style={{ position: "relative", zIndex: "1" }}>
      <MapContainer center={center} zoom={6} scrollWheelZoom={false}>
        <ChangeView center={center} zoom={6} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default App;
