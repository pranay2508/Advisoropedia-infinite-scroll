import axios from "axios";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import Gallery from "./Gallery";
// import CryptoList from "./CryptoList";
export default function IndexPage() {
  const [redirect, setRedirect] = useState("");
  const { setUser } = useContext(UserContext);
  // const [ images,setImage] = useState([]);
  async function logout() {
    try {
      await axios.post("/logout");
      setUser(null);
      setRedirect("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }
  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div>
      <div>INDEXPAGE</div>
      <div className="p-4 flex justify-end">
        <button
          onClick={logout}
          className=" bg-pink-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
      <div>
        
        <Gallery/>
      </div>
    </div>
  );
}

