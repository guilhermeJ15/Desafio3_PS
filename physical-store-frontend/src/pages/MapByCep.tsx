import React, { useState } from 'react';
import { Box, Input, Button, Flex, Text } from '@chakra-ui/react';
import { api } from '../services/api';
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';

interface StorePin {
  position: { lat: number; lng: number };
  title: string;
}

const containerStyle = { width: '100%', height: '500px' };
const centerDefault = { lat: -8.0476, lng: -34.877 }; 

const MapByCep: React.FC = () => {
  const [cep, setCep] = useState('');
  const [pins, setPins] = useState<StorePin[]>([]);
  const [error, setError] = useState('');
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const onSearch = async () => {
    setError('');
    try {
      const res = await api.get(`/store/cep/${cep}`);
      setPins(res.data.pins);
    } catch (err: any) {
      setPins([]);
      setError(err.response?.data?.message || 'Erro ao buscar CEP');
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
          Buscar no Mapa
        </Button>
      </Flex>
      {error && <Text color="red.500">{error}</Text>}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={pins.length ? pins[0].position : centerDefault}
        zoom={pins.length ? 10 : 12}
      >
        {pins.map((pin, idx) => (
          <MarkerF key={idx} position={pin.position} title={pin.title} />
        ))}
      </GoogleMap>
    </Box>
  );
};

export default MapByCep;
