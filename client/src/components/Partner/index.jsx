import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPartners } from "state";
import FlexBetween from "../../helpers/FlexBetween";
import UserImage from "../../helpers/UserImage";
import styles from "./styles.module.scss";

const Partner = ({ partnerId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const partners = useSelector((state) => state.user.partners);

  const isPartner = partners.length ? partners.find((partner) => partner._id === partnerId) : false;

  const patchPartner = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/users/${_id}/${partnerId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    dispatch(setPartners({ partners: data }));
  };

  return (
    <FlexBetween>
      <FlexBetween
        className={styles.userInfo}
        onClick={() => {
          navigate(`/profile/${partnerId}`);
        }}>
        <UserImage image={userPicturePath} className={styles.userImage} />
        <div>
          <div className={styles.partnerName}>
            {name}
          </div>
          <div className={styles.partnerSubtitle}>
            {subtitle}
          </div>
        </div>
      </FlexBetween>
      <button
        onClick={patchPartner}
        className={styles.partnerIconButton}
      >
        {isPartner ? (
          <PersonRemoveOutlined />
        ) : (
          <PersonAddOutlined />
        )}
      </button>
    </FlexBetween>
  );
};

export default Partner;