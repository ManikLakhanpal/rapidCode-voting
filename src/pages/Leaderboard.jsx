import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchRatings = async () => {
      const querySnapshot = await getDocs(collection(db, "ratings"));
      const ratingsData = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        ratingsData.push(data);
      });

      // ✅ Calculate average rating per team
      const teamRatings = {};
      ratingsData.forEach(({ teamNumber, rating }) => {
        if (!teamRatings[teamNumber]) {
          teamRatings[teamNumber] = { total: 0, count: 0 };
        }
        teamRatings[teamNumber].total += rating;
        teamRatings[teamNumber].count += 1;
      });

      // ✅ Convert to array and sort by highest average rating
      const sortedTeams = Object.keys(teamRatings)
        .map((team) => ({
          teamNumber: team,
          avgRating: teamRatings[team].total / teamRatings[team].count,
        }))
        .sort((a, b) => b.avgRating - a.avgRating) // Sort by highest rating
        .slice(0, 10); // Top 10 teams

      setLeaderboard(sortedTeams);
    };

    fetchRatings();
  }, []);

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-semibold text-center mb-4">Leaderboard</h2>
      <ul>
        {leaderboard.length > 0 ? (
          leaderboard.map((team, index) => (
            <li key={team.teamNumber} className="flex justify-between p-2 border-b">
              <span>#{index + 1} Team {team.teamNumber}</span>
              <span className="font-bold">{team.avgRating.toFixed(2)} ⭐</span>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">No ratings yet</p>
        )}
      </ul>
    </div>
  );
};

export default Leaderboard;
