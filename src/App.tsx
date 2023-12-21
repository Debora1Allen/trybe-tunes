import { Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import SearchAlbum from './components/search/SearchAlbum';
import Album from './components/Album';
import Layout from './components/Layout';


function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />

      <Route element={ <Layout /> }>
        <Route path="/search" element={ <SearchAlbum /> } />
        <Route path="/album/:id" element={ <Album /> } />
      </Route>

    </Routes>
  );
}

export default App;

