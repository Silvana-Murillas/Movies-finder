import { Routes, Route } from 'react-router-dom';
import { Landing } from './components/Landing';
import Search from './components/Search';

function App() {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<Landing />} />
                <Route exact path="/search" element={<Search />} />
            </Routes>
        </>
    );
}

export default App;
