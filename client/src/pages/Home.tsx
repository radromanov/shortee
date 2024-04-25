import { useEffect, useState } from "react";
import Button from "../components/Button";
import { useAuth } from "../utils/hooks/useAuth";
import AddLinkModal from "../modals/AddLinkModal";
import AddLink from "../components/AddLink";
import { useFetch } from "../utils/hooks/useFetch";
import { ShortURL } from "../utils/types/Url.type";
import Spinner from "../components/Spinner";

const Home = () => {
  const { logout, user, isLoading } = useAuth();
  const { fetchGet, data } = useFetch<ShortURL[]>();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function handleFetch() {
      return await fetchGet("http://localhost:3001/api/v1/short-url", "GET");
    }

    handleFetch();
  }, []);

  return (
    <>
      {isLoading === "loading" ? (
        <Spinner color="purple" />
      ) : data.error ? (
        <p className="text-red-500">{data.error.message}</p>
      ) : (
        <>
          <h1 className="text-2xl">Hi, {user?.username}</h1>
          <div className={`text-white ${showModal ? "blur" : ""}`}>
            {showModal && (
              <AddLinkModal>
                <AddLink setShowModal={setShowModal} />
              </AddLinkModal>
            )}

            {data.status === "loading" ? (
              <Spinner color="purple" />
            ) : (
              <ul>
                {data?.content?.map((url) => (
                  <li key={url.id}>{url.name}</li>
                ))}
              </ul>
            )}

            <Button
              text="Add link"
              variant="default"
              onClick={() => setShowModal(true)}
            />
            <Button text="Log out" variant="default" onClick={logout} />
          </div>
        </>
      )}
    </>
  );
};

export default Home;
