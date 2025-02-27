import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";

const Leaderboard = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "teams"), orderBy("averageRating", "desc"), limit(10));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTeams(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold text-center mb-4">Top 10 Teams</h2>
      <ul className="space-y-2">
        {teams.map((team, index) => (
          <li
            key={team.id}
            className="flex justify-between bg-gray-100 p-2 rounded-md"
          >
            <span className="font-medium">#{index + 1} Team {team.team}</span>
            <span className="text-yellow-500 font-semibold">⭐ {team.averageRating.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
