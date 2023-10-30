import React, { useEffect, useState } from "react";
import "./SortBy.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cart from "../Cart/Cart";
import { Blocks } from "react-loader-spinner";

export default function SortBy() {
  const param = useParams();
  console.log(param.sort);

  let catName = param.sort;
  const [loading, setLoading] = useState(false);
  const [getCategory, setgetCategory] = useState([]);

  console.log("catName", catName);
  let headers = {
    "X-RapidAPI-Key": "b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68",
    "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
  };
  async function getData() {
    setLoading(true);
    let data = await axios.get(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=${catName}`,
      { headers }
    );
    setgetCategory(data.data);
    setLoading(false);
    return data.data;
  }

  useEffect(() => {
    getData();
  }, [catName]);

  return (
    <div className="row g-4 mt-3">
      {loading ? (
        <Blocks
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
        />
      ) : (
        <>
          {getCategory?.map((game, index) => (
            <Cart key={index} game={game} />
          ))}
        </>
      )}
    </div>
  );
}
