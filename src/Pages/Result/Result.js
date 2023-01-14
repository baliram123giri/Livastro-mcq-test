import React, { memo, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QuestionName from "../../Components/QuestionName";
import { DataContext } from "../../Utils/DataProvider";

export default memo(function Result() {
  //context api
  const [{ result }, dispatch] = useContext(DataContext);

  //useNavigate for changing path of page
  const history = useNavigate();

  //useEffect for redirect quiz page if result data is empty!
  useEffect(() => {
    if (!result.length) {
      history("/");
    }
  }, [result]);

  return (
    <div className="row result align-items-center h-100">
      <div className="col-12 col-md-9 bg-white px-5 py-3 mx-auto rounded-3 shadow-lg">
        <div className="my-2">
          <h3 className="mb-1">Selected Answers</h3>
          <hr />
        </div>
        {result
          ?.sort((a, b) => a.questionNum - b.questionNum)
          ?.map(({ questionNum, answer, question }) => {
            return (
              <div key={questionNum}>
                <QuestionName name={question} number={questionNum + 1} />
                <div className="ms-3 my-2">
                  <h6 className="text-success">
                    <span className="fw-bold">Ans:</span> {String(answer)}
                  </h6>
                </div>
              </div>
            );
          })}

        <div className="my-2">
          <hr />
          <button
            className="go-back rounded-pill px-3 mt-2"
            onClick={() => {
              history("/");
            }}
          >
            Go Back
          </button>
          <button
            className="start rounded-pill px-3 mt-2 ms-1"
            onClick={() => {
              dispatch({ type: "reset" });
              history("/");
            }}
          >
            RESTART
          </button>
        </div>
      </div>
    </div>
  );
});
