import { Box } from "@mui/material";
import anonymous from "../scenes/assets/anonymous.png"

const UserImage = ({ image, size = "60px"}) => {
    return (
        <Box width={size} height={size}>
            <img 
                style={{ objectFit: "cover", borderRadius: "50%" }}
                width={size}
                height={size}
                alt={image}
                src={image ? `http://localhost:3001/assets/${image}` : anonymous}
            />
        </Box>
    )
};

export default UserImage;