import React, { useState } from "react";
import { Box, Button, Input, Text, Flex } from "@chakra-ui/react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { api } from "../services/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const MapByCep: React.FC = () => {
  const [cep, setCep] = useState("");
  const [error, setError] = useState("");
  const [pins, setPins] = useState<{ position: { lat: number; lng: number }; title: string }[]>([]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
  });

  const onSearch = async () => {
    try {
      setError("");
      const response = await api.get(`/stores/cep/${cep}`);
      const store = response.data;
      
      setPins([
        {
          position: {
            lat: parseFloat(store.latitude),
            lng: parseFloat(store.longitude),
          },
          title: store.name,
        },
      ]);
    } catch (err) {
      setError("Erro ao buscar loja pelo CEP. Verifique se o CEP está correto.");
    }
  };

  if (!isLoaded) return <Text>Carregando mapa...</Text>;

  return (
    <Box>
      <Flex mb={4} gap={2}>
        <Input
          placeholder="Digite o CEP (ex: 50010-000)"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          w="200px"
        />
        <Button colorScheme="blue" onClick={onSearch}>
          Buscar
        </Button>
      </Flex>

      {error && <Text color="red.500">{error}</Text>}

      <GoogleMap mapContainerStyle={containerStyle} zoom={12} center={pins[0]?.position || { lat: -15.7942, lng: -47.8822 }}>
        {pins.map((pin, idx) => (
          <MarkerF key={idx} position={pin.position} title={pin.title} />
        ))}
      </GoogleMap>
    </Box>
  );
};

export default MapByCep;