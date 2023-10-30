import { createContext } from "react";
import axios from "axios";

export let gameContext = createContext();

export default function GameContextProvider({ children }) {
  let headers = {
    "X-RapidAPI-Key": "b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68",
    "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
  };

  async function getAllGames() {
    let response = await axios.get(
      `https://free-to-play-games-database.p.rapidapi.com/api/games`,
      { headers }
    );
    return response;
  }

  async function getGamesDetails(id) {
    let response = await axios.get(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?id=${id}`,
      { headers }
    );
    return response;
  }


  return (
    <gameContext.Provider
      value={{ getAllGames, getGamesDetails }}
    >
      {children}
    </gameContext.Provider>
  );
}
