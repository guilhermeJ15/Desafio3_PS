import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { api } from '../services/api';

interface Store {
  _id: string;
  storeName: string;
  type: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  latitude: string;
  longitude: string;
}

const StoreDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [store, setStore] = useState<Store | null>(null);

  useEffect(() => {
    api.get(`/store/${id}`)
      .then(res => setStore(res.data))
      .catch(console.error);
  }, [id]);

  if (!store) return <Text>Carregando...</Text>;

  return (
    <Box p={4} bg="white" boxShadow="sm" borderRadius="md">
      <Heading mb={2}>{store.storeName}</Heading>
      <Text><strong>Tipo:</strong> {store.type}</Text>
      <Text><strong>Endereço:</strong> {store.address1}, {store.city} - {store.state}</Text>
      <Text><strong>CEP:</strong> {store.postalCode}</Text>
      <Text><strong>Coordenadas:</strong> {store.latitude}, {store.longitude}</Text>
      <RouterLink to="/stores">
+       <Button mt={4} colorScheme="blue">
+         Voltar
+       </Button>
+     </RouterLink>
    </Box>
  );
};

export default StoreDetails;
