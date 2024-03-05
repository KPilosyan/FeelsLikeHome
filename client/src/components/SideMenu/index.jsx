import React, { useState } from 'react';
import CreateCommunityModal from "../CreateCommunityModal/index"
import { IconButton } from '@mui/material';
import { BsHouse } from "react-icons/bs";
import { PiMoon } from "react-icons/pi";
import { MdAddBox } from "react-icons/md";
import styles from "./styles.module.scss";
import classNames from 'classnames';

const SideMenu = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [isCreateCommunityModalOpen, setIsCreateCommunityModalOpen] = useState(false);

  const handleItemClick = (item) => { 
    setSelectedItemIndex(item);
  };

  const handleCreateCommunity = () => {
    if (!isCreateCommunityModalOpen) {
      setIsCreateCommunityModalOpen(true);
    }
  };

  const menuItems = [
    { icon: <BsHouse />, text: 'Home' },
    // { icon: <IoAddCircleOutline />, text: 'Create Community' },
    { icon: <PiMoon />, text: 'Join Community' },
    { icon: <PiMoon />, text: 'My Communities' },
    { icon: <PiMoon />, text: 'My Partners' },
    { icon: <PiMoon />, text: 'Find Partners' },
  ];

  return (
    <div className={styles.sideMenu}>
      <div className={styles.listNav}>
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={classNames(styles.listItemContainer, selectedItemIndex === index && styles.itemSelected)}
          >
            <div
              key={index}
              onClick={() => handleItemClick(index)}
              className={styles.listItem}
            >
              <div className={styles.sideMenuIcon}>{item.icon}</div>
              <div className={styles.itemText}>{item.text}</div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.createCommunity} onClick={handleCreateCommunity}>
        <IconButton className={styles.createBtn}>
          <MdAddBox />
        </IconButton>
        <div className={styles.createCommunityText}>
          New Community
        </div>
        {isCreateCommunityModalOpen &&
          <CreateCommunityModal onClose={() => setIsCreateCommunityModalOpen(false)} />
        }
      </div>

    </div>
  );
};

export default SideMenu;
