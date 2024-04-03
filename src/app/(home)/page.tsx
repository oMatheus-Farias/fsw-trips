import QuickSearch from "./components/quick-search";
import RecommendedTrips from "./components/recommended-trips";
import TripSearch from "./components/trip-search";

const Home = () => {
  return (
    <div>
      <TripSearch />
      <QuickSearch />
      <RecommendedTrips />
    </div>
  );
};

export default Home;
