import React, { useContext } from "react";
import "./Cart.module.css";
import { useNavigate } from "react-router-dom";
import { gameContext } from "../../context/gameContext";

export default function Cart({ game }) {
  const nav = useNavigate();
  function gameClick(id) {
    nav(`/gameDetails/${id}`);
  }

  return (
    <div className="col-md-3 cursor-pointer" key={game.id}>
      <div
        className="card border-0 rounded-4"
        onClick={() => gameClick(game.id)}
      >
        <img className="card-img-top" src={game.thumbnail} alt="Title" />
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h6 className="card-title">
              {game.title.split(" ").slice(0, 3).join(" ")}
            </h6>
            <span className="bg-info text-white p-2 rounded-2">Free</span>
          </div>
          <p className="card-text">
            {game.short_description.split(" ").slice(0, 3).join(" ")}
          </p>
          <div className="d-flex justify-content-between">
            <span>
              <i className="fa-solid fa-square-plus"></i>
            </span>
            <div>
              <span className="bg-secondary p-1 text-white rounded-2 h6 me-2">
                {game.platform}
              </span>
              {game.platform === "PC (Windows)" ? (
                <i className="fa-brands fa-windows"></i>
              ) : (
                <i className="fa-solid fa-window-maximize"></i>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
