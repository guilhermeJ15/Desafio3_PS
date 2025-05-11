import ReactDOM from 'react-dom/client';
import { ChakraProvider, Container, extendTheme } from '@chakra-ui/react';
import App from './App';

const theme = extendTheme({});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ChakraProvider theme={theme}>
    <Container maxW="container.md" p={0}>
      <App />
    </Container>
  </ChakraProvider>
);