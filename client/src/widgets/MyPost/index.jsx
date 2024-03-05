import {
  EditOutlined,
  DeleteOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import { PiBellSimple } from "react-icons/pi";
import { HiOutlineGlobeAsiaAustralia } from "react-icons/hi2";
import { GrGroup } from "react-icons/gr";
import { IoImagesOutline } from "react-icons/io5";
import { IoVideocamOutline } from "react-icons/io5";
import { IoMdAttach } from "react-icons/io";
import { AiOutlineAudio } from "react-icons/ai";

import {
  Divider,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "helpers/FlexBetween";
import Dropzone from "react-dropzone";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import styles from "./styles.module.scss";

const MyPostWidget = () => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 768px)");

  const iconList = [
    { icon: <HiOutlineGlobeAsiaAustralia className={styles.icon} />, name: 'usergroup' },
    { icon: <GrGroup className={styles.icon} />, name: 'chatbubble' },
    { icon: <PiBellSimple className={styles.icon} />, name: 'bell' },
    { icon: <PiBellSimple className={styles.icon} />, name: 'bell' },
  ];

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    const response = await fetch(`http://localhost:3001/auth/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setPost("");
  };

  return (
    <div className={styles.wrapper}>
      <FlexBetween>
        <input
          placeholder="Share your idea..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          className={styles.postField}
        />
      </FlexBetween>
      <FlexBetween className={styles.postAddOns}>
        <FlexBetween className={styles.postAddOn} onClick={() => setIsImage(!isImage)}>
          <IoImagesOutline className={styles.icon} />
          <div className={styles.addOnIconText}>
            Image
          </div>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
            <FlexBetween className={styles.postAddOn}>
              <IoVideocamOutline className={styles.icon} />
              <div className={styles.addOnIconText}>Video</div>
            </FlexBetween>

            <FlexBetween className={styles.postAddOn}>
              <IoMdAttach className={styles.icon} />
              <div className={styles.addOnIconText}>Attachment</div>
            </FlexBetween>

            <FlexBetween className={styles.postAddOn}>
              <AiOutlineAudio className={styles.icon} />
              <div className={styles.addOnIconText}>Audio</div>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween className={styles.postAddOn}>
            <MoreHorizOutlined className={styles.icon} />
          </FlexBetween>
        )}
      </FlexBetween>
      {isImage && (
        <div className={styles.dropImageBox}>
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <div
                  {...getRootProps()}
                  className={styles.imgDropzone}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <div>{image.name}</div>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </div>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    className={styles.deletePostImgBtn}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </div>
      )}

      <Divider />

      <div className={styles.whoCanSeeText}>
        Who can see this post
      </div>
      <FlexBetween className={styles.selectVisAndPost}>
        <FlexBetween className={styles.postVisibilitySelect}>
          {iconList.map((item, index) => (
            <div
              key={index}
              className={styles.iconBox}
            >
              {item.icon}
            </div>
          ))}
        </FlexBetween>
        <button
          disabled={!post}
          onClick={handlePost}
          className={styles.postButton}
        >
          {"Post"}
        </button>
      </FlexBetween>
    </div>
  );
};

export default MyPostWidget;