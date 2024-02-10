import { Box, Typography, useTheme } from "@mui/material";
import Partner from "components/Partner";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPartners } from "state";

const PartnerListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const partners = useSelector((state) => state.user.partners);

  const getPartners = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/partners`,
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
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Partner List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {partners.map((partner) => (
          <Partner
            key={partner._id}
            partnerId={partner._id}
            name={`${partner.firstName} ${partner.lastName}`}
            subtitle={partner.profession}
            userPicturePath={partner.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default PartnerListWidget;