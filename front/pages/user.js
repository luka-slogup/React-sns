import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import propTypes from "prop-types";
import { LOAD_USER_POSTS_REQUEST } from "../reducers/post";
import { LOAD_USER_REQUEST } from "../reducers/user";
import { Card, Avatar } from "antd";
import PostCard from "../components/PostCard";

const User = () => {
  const dispatch = useDispatch();
  const { mainPosts } = useSelector(state => state.post);
  const { userInfo } = useSelector(state => state.user);

  useEffect(() => {}, []);
  return (
    <div>
      {userInfo ? (
        <Card
          actions={[
            <div key="twit">
              짹짹
              <br />
              {userInfo.Posts}
            </div>,
            <div key="followings">
              팔로잉
              <br />
              {userInfo.Followings}
            </div>,
            <div key="followers">
              팔로워
              <br />
              {userInfo.Followers}
            </div>
          ]}
        >
          <Card.Meta
            avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
            title={userInfo.nickname}
          />
        </Card>
      ) : null}
      {mainPosts.map(c => (
        <PostCard key={+c.createdAt} post={c} />
      ))}
    </div>
  );
};

User.propTypes = {
  id: propTypes.number.isRequired
};

User.getInitialProps = async context => {
  const id = parseInt(context.query.id, 10);
  console.log("User getInitialProps", id);
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
    data: id
  });
  context.store.dispatch({
    type: LOAD_USER_POSTS_REQUEST,
    data: id
  });
  return { id };
};

export default User;
