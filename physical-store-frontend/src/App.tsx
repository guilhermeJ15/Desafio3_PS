import { BrowserRouter as Router, Routes, Route, Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Heading, Link } from '@chakra-ui/react';
import Home from './pages/Home';
import Stores from './pages/Stores';
import StoreDetails from './pages/StoreDetails';
import MapByCep from './pages/MapByCep'; 

function App() {
  return (
    <Router>
      <Flex direction="column" minH="100vh" bg="gray.50">
        {/* Header */}
        <Box as="header" bg="blue.500" color="white" p={4} boxShadow="md">
          <Flex justify="space-between" align="center">
            <Heading size="lg">
              <RouterLink to="/">Physical Store</RouterLink>
            </Heading>
            <Flex as="nav" gap={4}>
              <Link as={RouterLink} to="/stores" color="white">Lojas</Link>
              <Link as={RouterLink} to="/mapa" color="white">Mapa por CEP</Link>
            </Flex>
          </Flex>
        </Box>
        <Box as="main" flex="1" p={4}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stores" element={<Stores />} />
            <Route path="/stores/:id" element={<StoreDetails />} />
            <Route path="/mapa" element={<MapByCep />} />
          </Routes>
        </Box>
      </Flex>
    </Router>
  );
}

export default App;
