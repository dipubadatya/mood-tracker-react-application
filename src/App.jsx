import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MoodProvider } from './context/MoodContext';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import History from './pages/History';
import LogMood from './pages/LogMood';
import Dashboard from './pages/Dashboard';
// We will build these next
// const Dashboard = () => <div className="p-20">Dashboard Coming Soon</div>;
// const LogMood = () => <div className="p-20">Logger Coming Soon</div>;
// const History = () => <div className="p-20">History Coming Soon</div>;

function App() {
  return (
    <MoodProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Navbar />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/log" element={<LogMood />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </MoodProvider>
  );
}

export default App;