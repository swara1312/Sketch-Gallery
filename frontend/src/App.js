import Button from "./components/Button";
import Navbar from "./components/Navbar";
import Grid from "./components/Grid";
import { useState,useEffect } from "react";
import axios from "axios";

function App() {

  const [photos, setPhotos] = useState([]);
  const [updateFrontend,setUpdateFrontend] = useState("")
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(()=>{
    axios.get("http://localhost:5000/api/retrieve").then((res)=>{
      console.log(res.data);
      setPhotos(res.data)
    })
    .catch((err) => console.log(err))
  },[updateFrontend]);

  const handleDelete = (deletedId) => {
    setPhotos((prevPhotos) => prevPhotos.filter(({ _id }) => _id !== deletedId));
  };

  return (
    <div className="App">
      <Navbar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>
      <Grid photos={photos} onDelete={handleDelete} loggedInUser={loggedInUser}/>
      {loggedInUser && ( // Only render if loggedInUser is not null
        <Button setUpdateFrontend={setUpdateFrontend} />
      )}
    </div>
  );
}

export default App;
