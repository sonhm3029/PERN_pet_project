import {Routes, Route} from "react-router-dom";
import Home from "@views/Home";
import UpdatePage from "./views/UpdatePage";
import RestaurantDetail from "./views/RestaurantDetail";
import Reviews from "./views/Reviews";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/restaurants" >
          <Route path=":id" element={<RestaurantDetail/>} />
          <Route path=":id/update" element={<UpdatePage/>} />
        </Route>
        <Route path="/reviews/:id" element={<Reviews/>}/>
      </Routes>
    </div>
  );
}

export default App;
