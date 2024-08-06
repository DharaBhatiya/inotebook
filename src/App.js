import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About'; // Make sure to create and import About component
import NoteState from './context/notes/NoteState'; // Make sure to create and import NoteState context
import Alert from './components/Alert';
// import Notes from "./components/Notes";
// import AddNote from "./components/AddNote";
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  return (
    <>
      <NoteState>
        <Router>
          <NavBar />
          <Alert message="This is amazing React course"/>
          <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
          </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
