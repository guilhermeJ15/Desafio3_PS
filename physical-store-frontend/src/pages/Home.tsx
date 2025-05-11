
import { Center, Heading, Text, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Home: React.FC = () => (
  <Center flexDirection="column" mt={10}>
    <Heading mb={4}>Bem-vindo ao Physical Store</Heading>
    <Text mb={6} color="gray.600">
      Encontre lojas físicas e calcule o frete para sua localização.
    </Text>
    <RouterLink to="/stores">
      <Button colorScheme="blue" size="lg">
        Ver Lojas
      </Button>
    </RouterLink>
  </Center>
);

export default Home;
