import { useState } from "react";
import { auth, googleProvider, db } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [teamNumber, setTeamNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    if (!teamNumber) {
      setError("Please select a team number.");
      return;
    }

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Save user details & team number in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        teamNumber: parseInt(teamNumber),
      });

      console.log("User signed in successfully!");
      navigate("/dashboard"); // Redirect to Dashboard
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-semibold mb-4">Sign in with Google</h2>

      {error && <p className="text-red-500">{error}</p>}

      {/* Team Selection */}
      <select
        value={teamNumber}
        onChange={(e) => setTeamNumber(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg mb-4"
      >
        <option value="">Select Your Team</option>
        {[...Array(50).keys()].map((num) => (
          <option key={num + 1} value={num + 1}>
            Team {num + 1}
          </option>
        ))}
      </select>

      {/* Google Sign-In Button */}
      <button
        onClick={handleGoogleSignIn}
        className="w-full bg-red-500 text-white py-2 rounded-lg"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
