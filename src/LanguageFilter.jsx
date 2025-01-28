import React, { useContext } from "react";
import { MyContext } from "./Context/Context";

const LanguageFilter = ({ english, georgian }) => {
  const { language } = useContext(MyContext);
  return <>{language === "EN" ? english : georgian}</>;
};

export default LanguageFilter;
