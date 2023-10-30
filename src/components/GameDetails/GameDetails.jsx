import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./GameDetails.module.css";
import axios from "axios";
import Slider from "react-slick";
// import { gameContext } from "../../context/gameContext";

export default function GameDetails() {
  const param = useParams();
  console.log(param.id);

  // let { gameID } = useContext(gameContext);
  // let { getGamesDetails } = useContext(gameContext);
  // async function showGameData() {
  //   try {
  //     let data = await getGamesDetails();
  //     console.log(data.data);
  //     return data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  const [getGameDetails, setgetGameDetails] = useState();

  let headers = {
    "X-RapidAPI-Key": "b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68",
    "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
  };

  async function gameDetailspage() {
    let data = await axios.get(
      `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${param.id}`,
      // { params: { id: param.id } },
      { headers }
    );
    setgetGameDetails(data.data);
  }

  useEffect(() => {
    gameDetailspage();
    // showGameData();
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div>
      <div className="row mt-5">
        {getGameDetails ? (
          <>
            <div className="col-md-4">
              <img
                src={getGameDetails.thumbnail}
                alt={getGameDetails.title}
                className="w-100"
              />
              <div className="d-flex justify-content-between mt-3">
                <span className="mt-2">Free</span>
                <Link
                  to={getGameDetails.game_url}
                  className="btn btn-primary p-2 col-md-8"
                >
                  Play Now{" "}
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                </Link>
              </div>
            </div>
            <div className="col-md-8">
              <h5 className="my-3">{getGameDetails.title}</h5>
              <h6 className="my-2">About {getGameDetails.title}</h6>
              <p>{getGameDetails.description}</p>
              <Slider {...settings}>
                {getGameDetails.screenshots.map((img) => (
                  <img src={img.image} className="w-100" key={img.id} />
                ))}
              </Slider>
              <div className="row mt-5">
                <div className="col-md-4">
                  <div className="md-4">
                    Title
                    <p>{getGameDetails?.title}</p>
                  </div>
                  <div className="md-4">
                    Release Date
                    <p>{getGameDetails?.release_date}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="md-4">
                    Developer
                    <p>{getGameDetails?.developer}</p>
                  </div>
                  <div className="md-4">
                    Genre
                    <p>{getGameDetails?.genre}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="md-4">
                    Publisher
                    <p>{getGameDetails?.publisher}</p>
                  </div>
                  <div className="md-4">
                    platform
                    <p>
                      {getGameDetails?.platform}{" "}
                      {getGameDetails?.platform === "PC (Windows)" ? (
                        <i className="fa-brands fa-windows mx-2"></i>
                      ) : (
                        <i className="fa-solid fa-window-maximize mx-2"></i>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <h3>Data is Loading ......</h3>
        )}
      </div>
    </div>
  );
}
