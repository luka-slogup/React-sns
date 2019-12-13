import produce from "immer";

export const initialState = {
  isLoggingOut: false, //로그아웃 시도중
  isLoggingIn: false, // 로그인 시도중
  loginErrorReason: "", // 로그인 실패사유
  signedUp: false, // 회원가입 성공
  isSigningUp: false, // 회원가입 시도중
  isSignedUp: false,
  signUpErrorReason: "", // 회원가입 실패사유
  me: null,
  followingList: [], // 팔로잉 리스트
  followerList: [],
  userInfo: null, // 남의 정보
  isEditingNickname: false, // 닉네임 수정중
  editNicknameErrorReason: "", // 닉네임수정 실패사유
  hasMoreFollower: false,
  hasMoreFollowing: false
};

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const LOAD_USER_REQUEST = "LOAD_USER_REQUEST";
export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS";
export const LOAD_USER_FAILURE = "LOAD_USER_FAILURE";

export const LOAD_FOLLOWERS_REQUEST = "LOAD_FOLLOWERS_REQUEST";
export const LOAD_FOLLOWERS_SUCCESS = "LOAD_FOLLOWERS_SUCCESS";
export const LOAD_FOLLOWERS_FAILURE = "LOAD_FOLLOWERS_FAILURE";

export const LOAD_FOLLOWINGS_REQUEST = "LOAD_FOLLOWINGS_REQUEST";
export const LOAD_FOLLOWINGS_SUCCESS = "LOAD_FOLLOWINGS_SUCCESS";
export const LOAD_FOLLOWINGS_FAILURE = "LOAD_FOLLOWINGS_FAILURE";

export const REMOVE_FOLLOWER_REQUEST = "REMOVE_FOLLOWER_REQUEST";
export const REMOVE_FOLLOWER_SUCCESS = "REMOVE_FOLLOWER_SUCCESS";
export const REMOVE_FOLLOWER_FAILURE = "REMOVE_FOLLOWER_FAILURE";

export const FOLLOW_USER_REQUEST = "FOLLOW_USER_REQUEST";
export const FOLLOW_USER_SUCCESS = "FOLLOW_USER_SUCCESS";
export const FOLLOW_USER_FAILURE = "FOLLOW_USER_FAILURE";

export const UNFOLLOW_USER_REQUEST = "UNFOLLOW_USER_REQUEST";
export const UNFOLLOW_USER_SUCCESS = "UNFOLLOW_USER_SUCCESS";
export const UNFOLLOW_USER_FAILURE = "UNFOLLOW_USER_FAILURE";

export const EDIT_NICKNAME_REQUEST = "EDIT_NICKNAME_REQUEST";
export const EDIT_NICKNAME_SUCCESS = "EDIT_NICKNAME_SUCCESS";
export const EDIT_NICKNAME_FAILURE = "EDIT_NICKNAME_FAILURE";

export const ADD_POST_TO_ME = "ADD_POST_TO_ME";
export const REMOVE_POST_OF_ME = "REMOVE_POST_OF_ME";

export default (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case SIGN_UP_REQUEST: {
        return {
          ...state,
          isSigningUp: true,
          isSignedUp: false,
          signUpErrorReason: ""
        };
      }
      case SIGN_UP_SUCCESS: {
        return {
          ...state,
          isSigningUp: false,
          isSignedUp: true
        };
      }
      case SIGN_UP_FAILURE: {
        return {
          ...state,
          isSigningUp: false,
          isSignedUp: false,
          signUpErrorReason: action.error
        };
      }
      case LOG_IN_REQUEST: {
        return {
          ...state,
          isLoggingIn: true,
          loginErrorReason: ""
        };
      }
      case LOG_IN_SUCCESS: {
        return {
          ...state,
          isLoggingIn: false,
          me: action.data
        };
      }
      case LOG_IN_FAILURE: {
        return {
          ...state,
          isLoggingIn: false,
          loginErrorReason: action.error
        };
      }
      case LOG_OUT_REQUEST: {
        return {
          ...state,
          isLoggingOut: true
        };
      }
      case LOG_OUT_SUCCESS: {
        return {
          ...state,
          isLoggingOut: false,
          me: null
        };
      }
      case LOG_OUT_FAILURE: {
        return {
          ...state,
          isLoggingOut: false
        };
      }

      case LOAD_USER_REQUEST: {
        return {
          ...state
        };
      }
      case LOAD_USER_SUCCESS: {
        if (action.me) {
          // load한게 내 정보인지 타유저 정보인지 확인
          return {
            ...state,
            me: action.data
          };
        }
        return {
          ...state,
          userInfo: action.data
        };
      }
      case LOAD_USER_FAILURE: {
        return {
          ...state
        };
      }

      case FOLLOW_USER_REQUEST: {
        return {
          ...state
        };
      }
      case FOLLOW_USER_SUCCESS: {
        draft.me.Followings.unshift({ id: action.data });
        break;
        // return {
        //   ...state,
        //   me: {
        //     ...state.me,
        //     Followings: [{ id: action.data }, ...state.me.Followings]
        //   }
        // };
      }
      case FOLLOW_USER_FAILURE: {
        return {
          ...state
        };
      }

      case UNFOLLOW_USER_REQUEST: {
        return {
          ...state
        };
      }
      case UNFOLLOW_USER_SUCCESS: {
        return {
          ...state,
          me: {
            ...state.me,
            Followings: state.me.Followings.filter(v => v.id !== action.data)
          },
          followingList: state.followingList.filter(v => v.id !== action.data)
        };
      }
      case UNFOLLOW_USER_FAILURE: {
        return {
          ...state
        };
      }

      case LOAD_FOLLOWERS_REQUEST: {
        return {
          ...state,
          hasMoreFollower: action.offset ? state.hasMoreFollower : true // offset없을때 true로 더보기버튼 활성화
        };
      }
      case LOAD_FOLLOWERS_SUCCESS: {
        return {
          ...state,
          followerList: state.followerList.concat(action.data),
          hasMoreFollower: action.data.length === 3 // 3개 다 가져왔으면 더보기버튼 만들기. 1-2개면 더보기필요없음
        };
      }
      case LOAD_FOLLOWERS_FAILURE: {
        return {
          ...state
        };
      }

      case LOAD_FOLLOWINGS_REQUEST: {
        return {
          ...state,
          hasMoreFollower: action.offset ? state.hasMoreFollower : true
        };
      }
      case LOAD_FOLLOWINGS_SUCCESS: {
        return {
          ...state,
          followingList: state.followingList.concat(action.data),
          hasMoreFollowing: action.data.length === 3
        };
      }
      case LOAD_FOLLOWINGS_FAILURE: {
        return {
          ...state
        };
      }

      case REMOVE_FOLLOWER_REQUEST: {
        return {
          ...state
        };
      }
      case REMOVE_FOLLOWER_SUCCESS: {
        return {
          ...state,
          me: {
            followers: state.me.Followers.filter(v => v.id !== action.data)
            //Followings에 들어있는 객체들 v하나하나의 id가 action.data의 id와 같지않으면
            //true를 반환한다. 만약에 그 두값이 같으면 false를 반환하고 배열에서 filtered된다.
            // 그 값이 같지않은 값들(!==)은 true를 반환하고 배열로 만들어진다
          },
          followerList: state.followerList.filter(v => v.id !== action.data)
        };
      }
      case REMOVE_FOLLOWER_FAILURE: {
        return {
          ...state
        };
      }

      case EDIT_NICKNAME_REQUEST: {
        return {
          ...state,
          isEditingNickname: true,
          editNicknameErrorReason: ""
        };
      }
      case EDIT_NICKNAME_SUCCESS: {
        return {
          ...state,
          isEditingNickname: false,
          me: {
            ...state.me,
            nickname: action.data
          }
        };
      }
      case EDIT_NICKNAME_FAILURE: {
        return {
          ...state,
          editNicknameErrorReason: action.error
        };
      }

      case ADD_POST_TO_ME: {
        // post reducer에서 가져온 데이터 saga에서 얘한테도 보내줌
        return {
          ...state,
          me: {
            ...state.me,
            Posts: [{ id: action.data }, ...state.me.Posts]
          }
        };
      }

      case REMOVE_POST_OF_ME: {
        // post reducer에서 가져온 데이터 saga에서 얘한테도 보내줌
        return {
          ...state,
          me: {
            ...state.me,
            Posts: state.me.Posts.filter(v => v.id !== action.data)
          }
        };
      }

      default: {
        return {
          ...state
        };
      }
    }
  });
};
