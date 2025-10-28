import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { Home } from './pages/Home';
import { Pricing } from './pages/Pricing';
import { Schedule } from './pages/Schedule';
import { Equipment } from './pages/Equipment';
import { EquipmentReformer } from './pages/EquipmentReformer';
import { EquipmentTowerReformer } from './pages/EquipmentTowerReformer';
import { EquipmentCadillac } from './pages/EquipmentCadillac';
import { EquipmentWundaChair } from './pages/EquipmentWundaChair';
import { EquipmentLadderBarrel } from './pages/EquipmentLadderBarrel';
import { Congrats } from './pages/Congrats';
import { TrainerElif } from './pages/TrainerElif';
import { TrainerGokben } from './pages/TrainerGokben';
import { TrainerGoknur } from './pages/TrainerGoknur';
import { Academy } from './pages/Academy';
import './App.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/equipment" element={<Equipment />} />
            <Route path="/equipment/reformer" element={<EquipmentReformer />} />
            <Route path="/equipment/tower-reformer" element={<EquipmentTowerReformer />} />
            <Route path="/equipment/cadillac" element={<EquipmentCadillac />} />
            <Route path="/equipment/wunda-chair" element={<EquipmentWundaChair />} />
            <Route path="/equipment/ladder-barrel" element={<EquipmentLadderBarrel />} />
            <Route path="/congrats" element={<Congrats />} />
            <Route path="/trainer-elif" element={<TrainerElif />} />
            <Route path="/trainer-gokben" element={<TrainerGokben />} />
            <Route path="/trainer-goknur" element={<TrainerGoknur />} />
            <Route path="/academy" element={<Academy />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
