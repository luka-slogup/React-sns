import React, { useCallback, useState, useEffect } from "react";
import { Input, Form, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { ADD_POST_REQUEST } from "../reducers/post";

const PostForm = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const { imagePaths, isAddingPost, postAdded } = useSelector(
    state => state.post
  );

  useEffect(() => {
    setText("");
  }, [postAdded === true]);

  const onSubmitForm = useCallback(
    e => {
      e.preventDefault();
      // props로 들어가는 함수는 무조건 useCallback
      if (!text || !text.trim()) {
        return alert("게시글을 작성하세요"); // 리턴으로 함수끊기
      }
      dispatch({
        type: ADD_POST_REQUEST,
        data: {
          content: text
        }
      });
    },
    [text]
  );
  const onChangeText = useCallback(e => {
    setText(e.target.value);
  }, []);
  return (
    <Form
      style={{ marginTop: "10px 0 20px 0" }}
      encType="multipart/form-data"
      onSubmit={onSubmitForm}
    >
      <Input.TextArea
        maxLength={140}
        placeholder="어떤 신기한 일이 있을까"
        value={text}
        onChange={onChangeText}
      />
      <div>
        <input type="file" multiple hidden /> <Button>이미지 업로드</Button>
        <Button
          type="primary"
          style={{ float: "right" }}
          htmlType="submit"
          loading={isAddingPost}
        >
          짹짹
        </Button>
      </div>
      <div>
        {imagePaths !== undefined
          ? imagePaths.map(v => {
              return (
                <div key={v} style={{ display: "inline-block" }}>
                  <img
                    src={"http://localhost:3065/" + v}
                    style={{ width: "200px" }}
                    alt={v}
                  />
                  <div>
                    <Button>제거</Button>
                  </div>
                </div>
              );
            })
          : "아무것도 없었다"}
      </div>
    </Form>
  );
};

export default PostForm;