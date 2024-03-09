import Partner from "components/Partner";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPartners } from "state";
import styles from "./styles.module.scss";

const PartnerListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const partners = useSelector((state) => state.user.partners);

  const getPartners = async () => {
    const response = await fetch(
      `${process.env.API_URL}/users/${userId}/partners`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPartners({ partners: data }));
  };

  useEffect(() => {
    getPartners();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles.wrapper}>
      <div className={styles.partnerListText}>
        Partner List
      </div>
      <div className={styles.partners}>
        {partners.length 
        ? partners.map((partner) => (
          <Partner
            key={partner._id}
            partnerId={partner._id}
            name={`${partner.firstName} ${partner.lastName}`}
            subtitle={partner.profession}
            userPicturePath={partner.picturePath}
          />
        )) 
        : "Internal error: Unable to show partners list"}
      </div>
    </div>
  );
};  

export default PartnerListWidget;