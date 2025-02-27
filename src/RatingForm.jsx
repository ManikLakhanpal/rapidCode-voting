import { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { FaStar } from "react-icons/fa";

const RatingForm = () => {
  // ✅ Define State Variables
  const [selectedTeam, setSelectedTeam] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedTeam || rating === 0) {
      setMessage("Please select a team and a rating.");
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) {
        setMessage("You must be logged in to rate.");
        return;
      }

      await addDoc(collection(db, "ratings"), {
        teamNumber: parseInt(selectedTeam),
        rating: rating,
        userId: user.uid,
        timestamp: new Date(),
      });

      setMessage("Rating submitted successfully!");
      setSelectedTeam(""); // Reset team selection
      setRating(0); // Reset rating
    } catch (err) {
      setMessage("Error submitting rating.");
      console.error("Firestore Error:", err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-center mb-4">Rate a Team</h2>

      {message && <p className="text-center text-green-500">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ✅ Team Selection Dropdown */}
        <select
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="">Select a Team</option>
          {[...Array(50).keys()].map((num) => (
            <option key={num + 1} value={num + 1}>
              Team {num + 1}
            </option>
          ))}
        </select>

        {/* ✅ Star Rating System */}
        <div className="flex justify-center gap-2">
          {[...Array(5)].map((_, i) => {
            const ratingValue = i + 1;
            return (
              <FaStar
                key={ratingValue}
                className={`cursor-pointer transition-all ${
                  ratingValue <= (hover || rating) ? "text-yellow-400" : "text-gray-300"
                }`}
                size={30}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
                onClick={() => setRating(ratingValue)}
              />
            );
          })}
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">
          Submit Rating
        </button>
      </form>
    </div>
  );
};

export default RatingForm;
