// state
const initialState = {
  roomTypeList: [],
  hotelList: [],
  currentHotel: {},
  roomList: [],
  // ...
};

// action type
const RoomTypeActionKeys = Object.freeze({
  GET_LIST: 'GET_LIST_ROOM_TYPE',
  SET_LIST: 'SET_LIST_ROOM_TYPE',
});

const RoomActionKeys = Object.freeze({
  SET_LIST: 'SET_LIST_ROOM',
});

const setRoomTypeList = (payload) => ({
  type: RoomTypeActionKeys.SET_LIST,
  payload,
});

const setRoomList = (payload) => ({
  type: RoomActionKeys.SET_LIST,
  payload,
});

const roomTypeActions = {
  setRoomTypeList,
};

const roomActions = {
  setRoomList,
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

    default:
      console.log('Invalid actions');
  }

  return newState;
};

export { initialState, RoomTypeActionKeys, roomTypeActions, roomActions };
export default mainReducer;
