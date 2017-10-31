import { GET_DECKS } from "../actions";

function getDecks(state = {}, action) {
  switch (action.tpe) {
    case GET_DECKS:
      return {
        ...state,
        ...action,
        decks
      };
  }
}

export default getDecks;
