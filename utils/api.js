import { AsyncStorage } from "react-native";

const DECK_STORAGE_KEY = "MobileFlashCards";


export function fetchDecks() {
    return AsyncStorage.getItem(DECK_STORAGE_KEY).then(data => json.parse(data));
  }