import { useState } from "react";
import Button from "../components/Button";
import { useAuth } from "../utils/hooks/useAuth";
import AddLinkModal from "../modals/AddLinkModal";
import AddLink from "../components/AddLink";

const Home = () => {
  const { logout } = useAuth();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={`text-white ${showModal ? "blur" : ""}`}>
      {showModal && (
        <AddLinkModal>
          <AddLink setShowModal={setShowModal} />
        </AddLinkModal>
      )}

      <Button
        value="Add link"
        variant="default"
        onClick={() => setShowModal(true)}
      />
      <Button value="Log out" variant="default" onClick={() => logout()} />
    </div>
  );
};

export default Home;
