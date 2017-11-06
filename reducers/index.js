import { GET_DECKS } from "../actions";

function receiveDecks(state = {}, action) {
  switch (action.type) {
    case GET_DECKS:
      return {
        ...state,
        ...action.decks
      };
  }
}

export default receiveDecks;
