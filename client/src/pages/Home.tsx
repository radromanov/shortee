import { useEffect, useState } from "react";
import Button from "../components/Button";
import { useAuth } from "../utils/hooks/useAuth";
import { useFetch } from "../utils/hooks/useFetch";
import { ShortURL } from "../utils/types/Url.type";
import Spinner from "../components/Spinner";
import PageWrapper from "../components/PageWrapper";
import ShortLink from "../components/ShortLink";
import Modal from "../modals/Modal";
import LinkForm from "../components/LinkForm";

const Home = () => {
  const { logout, isLoading } = useAuth();
  const { fetchGet, data } = useFetch<ShortURL[]>();
  const [modal, setModal] = useState<{
    isOpen: boolean;
    form: "Add" | "Edit";
    url: ShortURL | null;
  }>({
    form: "Add",
    isOpen: false,
    url: null,
  });
  const canAddLink = data.content && data.content.length < 10;

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
            <div className={`w-60 text-white ${modal.isOpen ? "blur" : ""}`}>
              {modal?.isOpen && (
                <Modal
                  elementId={
                    modal.form === "Add" ? "add-link-root" : "edit-link-root"
                  }
                >
                  <LinkForm modal={modal} setModal={setModal} />
                </Modal>
              )}

              {data.status === "loading" ? (
                <Spinner color="purple" />
              ) : (
                <ul className="flex flex-col gap-2">
                  {data?.content?.map((url) => (
                    <ShortLink key={url.id} url={url} setModal={setModal} />
                  ))}
                </ul>
              )}

              {canAddLink && (
                <Button
                  text="Add link"
                  variant="default"
                  onClick={() =>
                    setModal({
                      form: "Add",
                      isOpen: true,
                      url: null,
                    })
                  }
                />
              )}
              <Button text="Log out" variant="default" onClick={logout} />
            </div>
          </PageWrapper>
        </>
      )}
    </>
  );
};

export default Home;
