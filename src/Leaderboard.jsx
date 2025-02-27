import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Leaderboard = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      const querySnapshot = await getDocs(collection(db, "ratings"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTeams(data.sort((a, b) => b.weightedScore - a.weightedScore));
    };

    fetchTeams();
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {teams.map((team, index) => (
          <li key={team.id}>{`${index + 1}. ${team.team} - ${team.weightedScore.toFixed(2)}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
