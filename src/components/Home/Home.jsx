import React, { useContext, useEffect, useState } from "react";
import { gameContext } from "../../context/gameContext";
import "./Home.module.css";
import Cart from "../Cart/Cart";
import { Blocks } from "react-loader-spinner";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [getGames, setgetGames] = useState([]);
  let { getAllGames } = useContext(gameContext);

  async function showAllGames() {
    setLoading(true);
    let data = await getAllGames();
    console.log(data.data);
    setgetGames(data.data);
    setLoading(false);
  }

  useEffect(() => {
    showAllGames();
  }, []);

  return (
    <div>
      <div className="row g-4 mt-3">
        {loading ? (
          <div className="position-fixed top-0 start-0 bottom-0 end-0 bg-opacity-75 bg-dark d-flex justify-content-center align-content-center">
            <Blocks
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
            />
          </div>
        ) : (
          <>
            {getGames?.map((game, index) => (
              <Cart key={index} game={game} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
