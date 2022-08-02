import './App.css';
import Navbar from "./components/Navbar";
import {Outlet} from 'react-router-dom'
import {Backdrop, CircularProgress} from "@mui/material";
import {useSelector} from "react-redux";

function App() {

    const loading = useSelector(state => state.backdrop.value);

  return (
    <div className="App">
      <Navbar></Navbar>
        <Outlet/>
        <Backdrop open={loading} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <CircularProgress color="inherit"></CircularProgress>
        </Backdrop>
    </div>
  );
}

export default App;
