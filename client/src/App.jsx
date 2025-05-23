import { Box, useColorModeValue } from '@chakra-ui/react';
import Home from './pages/Home';
import Create from './pages/Create';
import Navbar from './components/navbar';
import { Routes, Route } from 'react-router-dom';
import Product from './pages/Listing'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <Box minH={"100vh"} bg={useColorModeValue("gray.200", "gray.900")}>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </Box>
    </>
  )
}

export default App
