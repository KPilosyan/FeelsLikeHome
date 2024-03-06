import { MdAddBox } from "react-icons/md";
import CreateCommunityModal from "components/CreateCommunityModal";
import { useState } from "react";
import styles from "./styles.module.scss";

const CreateCommunityButton = () => {
  const [isCreateCommunityModalOpen, setIsCreateCommunityModalOpen] = useState(false);

  const handleCreateCommunity = () => {
    if (!isCreateCommunityModalOpen) {
      setIsCreateCommunityModalOpen(true);
    }
  };

  return (
    <div className={styles.createCommunity} onClick={handleCreateCommunity}>
      <div className={styles.createBtn}>
        <MdAddBox />
      </div>
      {isCreateCommunityModalOpen &&
        <CreateCommunityModal onClose={() => setIsCreateCommunityModalOpen(false)} />
      }
    </div>
  )
};

export default CreateCommunityButton;