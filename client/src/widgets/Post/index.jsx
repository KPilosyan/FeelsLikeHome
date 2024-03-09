import { Divider } from "@mui/material";
import FlexBetween from "helpers/FlexBetween";
import Partner from "components/Partner";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { LuShare2 } from "react-icons/lu";
import { BiMessageSquareDots } from "react-icons/bi";

import styles from "./styles.module.scss";
import classNames from "classnames";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const patchLike = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <div className={styles.wrapper}>
      <Partner
        partnerId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <div className={styles.description}>
        {description}
      </div>
      {picturePath && (
        <img className={styles.partnerImg}
          alt="post"
          src={`${process.env.REACT_APP_API_URL}/assets/${picturePath}`}
        />
      )}
      <FlexBetween className={styles.postIconsWrapper} >
        <FlexBetween className={styles.likeAndMessageWrapper}>
          <FlexBetween className={styles.likeAndMessageIcons}>
            <button onClick={patchLike} className={classNames(styles.btn,styles.likeButton)}>
              {isLiked ? (
                <GoHeartFill className={ classNames(styles.postBottomIcons, styles.likeIconFilled) }/>
              ) : (
                <GoHeart className={ classNames(styles.postBottomIcons, styles.likeIconOutlined) } />
              )}
            </button>
            <div className={styles.count}>{likeCount}</div>
          </FlexBetween>

          <FlexBetween className={styles.likeAndMessageIcons}>
            <button onClick={() => setIsComments(!isComments)} className={classNames(styles.btn, styles.commentButton)}>
              <BiMessageSquareDots className={ classNames(styles.postBottomIcons, styles.commentIcon) }/>
            </button>
            <div className={styles.count}>{comments.length}</div>
          </FlexBetween>
        </FlexBetween>

        <button className={classNames(styles.btn, styles.shareButton)}>
          <LuShare2 className={ classNames(styles.postBottomIcons, styles.shareIcon) }/>
        </button>
      </FlexBetween>
      {isComments && (
        <div className={styles.comments}>
          {comments.map((comment, i) => (
            <div key={`${name}-${i}`}>
              <Divider />
              <div className={styles.comment}>
                {comment}
              </div>
            </div>
          ))}
          <Divider />
        </div>
      )}
    </div>
  );
};

export default PostWidget;