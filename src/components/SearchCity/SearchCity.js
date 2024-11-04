import React, { useState } from "react";
import axios from "axios";
import { Form, Button, ListGroup } from "react-bootstrap";

const CitySearch = () => {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState([]);

  const searchCity = async () => {
    try {

      const options = {
        method: 'GET',
        url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/places/%7BplaceId%7D/distance',
        params: {toPlaceId: 'Q60'},
        headers: {
          'x-rapidapi-key': 'fe5d1b748emshd834a98599c3dc2p1ed5a0jsn3d1fbe24a402',
          'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
        }
      };

      const response = await axios.request(options);
      console.log(response.data);
      setCities(response.data);
    } catch (error) {
      console.error("Error al buscar ciudades:", error);
    }
  };

  return (
    <div>
      <Form.Group controlId="citySearch">
        <Form.Label>Buscar Ciudad</Form.Label>
        <Form.Control
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ingresa el nombre de la ciudad"
        />
        <Button variant="primary" onClick={searchCity} className="mt-2">
          Buscar
        </Button>
      </Form.Group>
      <ListGroup className="mt-3">
        {cities.map((city, index) => (
          <ListGroup.Item key={index}>
            {city.name}, {city.country} - Lat: {city.lat}, Lon: {city.lon}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default CitySearch;
