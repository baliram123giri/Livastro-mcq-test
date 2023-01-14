import React, { memo } from "react";

export default memo(function QuestionName({
  number,
  name,
  validation = false,
}) {

  return (
    <div className="question ">
      <h4 className="h4">
        {number}. {name}{" "}
        {validation && <span className="text-danger fw-bold">*</span>}
      </h4>
    </div>
  );
});
