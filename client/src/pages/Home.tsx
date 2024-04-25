import { useEffect, useState } from "react";
import Button from "../components/Button";
import { useAuth } from "../utils/hooks/useAuth";
import AddLinkModal from "../modals/AddLinkModal";
import AddLink from "../components/AddLink";
import { useFetch } from "../utils/hooks/useFetch";
import { ShortURL } from "../utils/types/Url.type";
import Spinner from "../components/Spinner";
import PageWrapper from "../components/PageWrapper";
import ShortLink from "../components/ShortLink";

const Home = () => {
  const { logout, isLoading } = useAuth();
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
          <PageWrapper>
            <div className={`w-60 text-white ${showModal ? "blur" : ""}`}>
              {showModal && (
                <AddLinkModal>
                  <AddLink setShowModal={setShowModal} />
                </AddLinkModal>
              )}

              {data.status === "loading" ? (
                <Spinner color="purple" />
              ) : (
                <ul className="flex flex-col gap-2">
                  {data?.content?.map((url) => (
                    <ShortLink key={url.id} url={url} />
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
          </PageWrapper>
        </>
      )}
    </>
  );
};

export default Home;
