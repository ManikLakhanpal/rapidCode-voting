import { Link } from "react-router-dom";
import RatingForm from "../RatingForm";
const Dashboard = () => {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      <Link to="/leaderboard" className="text-blue-500">Go to Leaderboard</Link>
        <RatingForm />
    </div>
  );
};

export default Dashboard;
