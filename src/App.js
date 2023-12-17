import MainRoute from './AllRoutes/MainRoute';
import './App.css';
import Navbar from './components/Navbar';
import "./index.css"

function App() {
  return (
    <div className="App">
      <Navbar />
        <MainRoute />
    </div>
  );
}

export default App;
