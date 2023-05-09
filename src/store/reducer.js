// state
const initialState = {
  roomTypeList: [],
};

// action type
const RoomTypeActionKeys = Object.freeze({
  GET_LIST: 'GET_LIST_ROOM_TYPE',
  SET_LIST: 'SET_LIST_ROOM_TYPE',
});

const setRoomTypeList = (payload) => ({
  type: RoomTypeActionKeys.SET_LIST,
  payload,
});

const roomTypeActions = {
  setRoomTypeList,
};

// reducer
const mainReducer = (state, action) => {
  console.log('actions: ', action);
  let newState = {};
  switch (action.type) {
    case RoomTypeActionKeys.SET_LIST:
      newState = {
        ...state,
        roomTypeList: action.payload,
      };
      break;

    default:
      console.log('Invalid actions');
  }

  return newState;
};

export { initialState, RoomTypeActionKeys, roomTypeActions };
export default mainReducer;
