import React from "react";
import LanguageFilter from "../../LanguageFilter";

const LocalizedInput = ({ english, georgian, ...props }) => {
  const placeholder = LanguageFilter({ english, georgian });

  return <input {...props} placeholder={placeholder.props.children} />;
};

export default LocalizedInput;
