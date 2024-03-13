import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { BsHouse } from "react-icons/bs";
import { IoGitMergeOutline } from "react-icons/io5";
import { BsWindowStack } from "react-icons/bs";
import { BsPeople } from "react-icons/bs";
import { PiUserFocus } from "react-icons/pi";
import { TbLogout2 } from "react-icons/tb";
import { setLogout } from 'state';
import classNames from 'classnames';
import styles from "./styles.module.scss";

const SideMenu = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const dispatch = useDispatch();

  const handleItemClick = (item) => { 
    setSelectedItemIndex(item);
  };

  const menuItems = [
    { icon: <BsHouse />, text: 'Home' },
    { icon: <IoGitMergeOutline />, text: 'Join Community' },
    { icon: <BsWindowStack />, text: 'My Communities' },
    { icon: <BsPeople />, text: 'My Partners' },
    { icon: <PiUserFocus />, text: 'Find Partners' },
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
      <div className={styles.logout} onClick={() => dispatch(setLogout())}>
        <div className={styles.logoutBtn}>
          <TbLogout2 />
        </div>
        <div className={styles.logoutText}>
          Log Out
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
