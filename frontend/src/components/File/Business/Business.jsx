import React from "react";
import classes from "./Business.module.css";

import ServiceCard from "../../ServiceCard";
import serviceData from "./ServiceCard";
import { AiOutlineCheckCircle } from "react-icons/ai";
const Business = () => {
  return (
    <div>
      <div className={classes.strip}>
        <h1 className="">For Individual</h1>
      </div>
      <hr />
      <div className={classes.container}>
        {serviceData.map((data) => {
          return (
            <ServiceCard
              poster={data.poster}
              title={data.title}
              discountedPrice={data.discountedPrice}
              actualPrice={data.actualPrice}
              incomeCovers={data.incomeCovers}
            />
          );
        })}
      </div>
      <h1 className={classes.titleCenter}>All Plan Include</h1>

      <ul className={classes.hori}>
        <li>
          {" "}
          <AiOutlineCheckCircle /> Dedicated expert & account manager
        </li>
        <li>
          {" "}
          <AiOutlineCheckCircle /> Data review & correction by expert
        </li>
        <li>
          {" "}
          <AiOutlineCheckCircle /> Post return filing support
        </li>
        <li>
          {" "}
          <AiOutlineCheckCircle /> Suggestions on best tax saving options
        </li>
      </ul>
    </div>
  );
};

export default Business;
