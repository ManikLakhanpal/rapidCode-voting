import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Logout = () => {
  const handleLogout = async () => {
    await signOut(auth);
    console.log("User signed out");
  };

  return (
    <button onClick={handleLogout} className="bg-gray-500 text-white px-4 py-2 rounded">
      Logout
    </button>
  );
};

export default Logout;
