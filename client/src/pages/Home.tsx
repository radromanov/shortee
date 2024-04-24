import { useEffect, useState } from "react";
import Button from "../components/Button";
import { useAuth } from "../utils/hooks/useAuth";
import AddLinkModal from "../modals/AddLinkModal";
import AddLink from "../components/AddLink";
import { useFetch } from "../utils/hooks/useFetch";

const Home = () => {
  const { logout, user } = useAuth();
  const { fetchGet, data } = useFetch<{ urls: string[] }>();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function handleFetch() {
      return await fetchGet("http://localhost:3001/api/v1/short-url", "GET");
    }

    handleFetch();
  }, []);

  return (
    <>
      <h1 className="text-2xl">Hi, {user?.username}</h1>
      <div className={`text-white ${showModal ? "blur" : ""}`}>
        {showModal && (
          <AddLinkModal>
            <AddLink setShowModal={setShowModal} />
          </AddLinkModal>
        )}

        <ul>
          {data.content?.urls.map((url, i) => (
            <li key={i}>{url}</li>
          ))}
        </ul>

        <Button
          text="Add link"
          variant="default"
          onClick={() => setShowModal(true)}
        />
        <Button text="Log out" variant="default" onClick={logout} />
      </div>
    </>
  );
};

export default Home;
