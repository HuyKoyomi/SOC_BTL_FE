// state
export const initialState = {
  roomTypeList: [],
  hotelList: [],
  currentHotel: {},
  roomList: [],
  userList: [],
  selectedUser: {},
  // ...
};

// action type
export const RoomTypeActionKeys = Object.freeze({
  GET_LIST: 'GET_LIST_ROOM_TYPE',
  SET_LIST: 'SET_LIST_ROOM_TYPE',
});

export const RoomActionKeys = Object.freeze({
  SET_LIST: 'SET_LIST_ROOM',
});

export const UserActionKeys = Object.freeze({
  SET_LIST: 'SET_LIST_USER',
});

export const roomTypeActions = {
  setRoomTypeList: (payload) => ({
    type: RoomTypeActionKeys.SET_LIST,
    payload,
  }),
};

export const roomActions = {
  setRoomList: (payload) => ({
    type: RoomActionKeys.SET_LIST,
    payload,
  }),
};

export const userActions = {
  setUserList: (payload) => ({
    type: UserActionKeys.SET_LIST,
    payload,
  }),
};

// const hotelActions = {

// }

// reducer
const mainReducer = (state, action) => {
  let newState = {};
  switch (action.type) {
    case RoomTypeActionKeys.SET_LIST:
      newState = {
        ...state,
        roomTypeList: action.payload,
      };
      break;

    case RoomActionKeys.SET_LIST:
      newState = {
        ...state,
        roomList: action.payload,
      };
      break;

    case UserActionKeys.SET_LIST:
      newState = {
        ...state,
        userList: action.payload,
      };
      break;

    default:
      console.log('Invalid actions');
  }

  return newState;
};

export default mainReducer;
