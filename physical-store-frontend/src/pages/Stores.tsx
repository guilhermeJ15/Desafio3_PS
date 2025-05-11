import React, { useEffect, useState } from 'react';
import { Box, Heading, Input, Button, Text, Flex } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { api } from '../services/api';

interface Store {
  _id: string;
  storeName: string;
  type: string;
  city: string;
  state: string;
}

const Stores: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [cep, setCep] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    fetchStores();
  }, [stateFilter, typeFilter]);

  const fetchStores = async () => {
    try {
      const params: any = {};
      if (typeFilter) params.type = typeFilter;
      if (stateFilter) params.uf = stateFilter;
      const res = await api.get('/store', { params });
      setStores(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const searchByCep = async () => {
    if (!cep.trim()) return;
    try {
      const res = await api.get(`/store/cep/${cep}`);
      setStores(res.data.stores || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box>
      <Heading mb={4}>Lojas Disponíveis</Heading>

      <Flex gap={4} wrap="wrap" mb={6}>
        <Input
          placeholder="Buscar por CEP"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          w="200px"
        />
        <Button onClick={searchByCep} colorScheme="blue">
          Buscar
        </Button>

        <Box>
          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px' }}
          >
            <option value="">Todos os Estados</option>
            <option value="PE">PE</option>
            <option value="SP">SP</option>
            <option value="RJ">RJ</option>
          </select>
        </Box>

        <Box>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px' }}
          >
            <option value="">Todos os Tipos</option>
            <option value="PDV">PDV</option>
            <option value="LOJA">LOJA</option>
          </select>
        </Box>
      </Flex>

      {stores.length > 0 ? (
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {stores.map((store) => (
            <li key={store._id} style={{ marginBottom: '16px' }}>
              <Box p={4} bg="white" boxShadow="sm" borderRadius="md">
                <Heading size="md">{store.storeName}</Heading>
                <Text>
                  {store.type} – {store.city}, {store.state}
                </Text>
                <RouterLink to={`/stores/${store._id}`}>
                  <Button mt={2} colorScheme="blue" size="sm">
                    Ver Detalhes
                  </Button>
                </RouterLink>
              </Box>
            </li>
          ))}
        </ul>
      ) : (
        <Text>Nenhuma loja encontrada.</Text>
      )}
    </Box>
  );
};

export default Stores;