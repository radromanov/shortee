import Button from "../components/Button";
import { useAuth } from "../utils/hooks/useAuth";

const Home = () => {
  const { logout } = useAuth();

  return (
    <div className="text-white">
      <Button value="Log out" variant="default" onClick={() => logout()} />
    </div>
  );
};

export default Home;
