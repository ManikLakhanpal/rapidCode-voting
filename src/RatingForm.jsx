import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { FaStar } from "react-icons/fa";

const RatingForm = () => {
  const aspects = [
    { name: "Basic CSS", weight: 0.3 },
    { name: "Animations", weight: 0.15 },
    { name: "Responsiveness", weight: 0.15 },
    { name: "Main Features", weight: 0.25 },
    { name: "Basic JS", weight: 0.15 },
  ];

  const [team, setTeam] = useState("");
  const [ratings, setRatings] = useState({
    "Basic CSS": 0,
    Animations: 0,
    Responsiveness: 0,
    "Main Features": 0,
    "Basic JS": 0,
  });

  const handleRating = (aspect, value) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [aspect]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!team) {
      alert("Please select a team before submitting.");
      return;
    }
    const weightedScore = Object.keys(ratings).reduce(
      (acc, key) => acc + ratings[key] * aspects.find((a) => a.name === key).weight,
      0
    );

    try {
      await addDoc(collection(db, "ratings"), {
        team,
        ratings,
        weightedScore,
        timestamp: new Date(),
      });
      alert("Rating submitted successfully!");
    } catch (error) {
      console.error("Error submitting rating: ", error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Rate a Team</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-semibold">Select Team:</label>
        <select
          className="mb-4 p-2 border rounded w-l"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
        >
          <option value="">Select a team</option>
          {Array.from({ length: 50 }, (_, i) => (
            <option key={i + 1} value={`Team ${i + 1}`}>{`Team ${i + 1}`}</option>
          ))}
        </select>
        {aspects.map((aspect) => (
          <div key={aspect.name} className="mb-4">
            <p className="font-semibold">{aspect.name}</p>
            <div className="flex items-center justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`cursor-pointer text-2xl ${
                    star <= ratings[aspect.name] ? "text-yellow-500" : "text-gray-300"
                  }`}
                  onClick={() => handleRating(aspect.name, star)}
                />
              ))}
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit Rating
        </button>
      </form>
    </div>
  );
};

export default RatingForm;
