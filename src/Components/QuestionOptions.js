import React, { memo, useContext } from "react";
import { DataContext } from "../Utils/DataProvider";

export default memo(function QuestionOptions({
  type,
  questionoption,
  onchange,
  questionNumber
}) {
  //use context api
  const [{ result }, dispatch] = useContext(DataContext);

  //single object data
  function getObj() {
    return result?.filter((ele) => {
      return ele.questionNum === questionNumber;
    })[0];
  }

  //object reset after remove or if not value exist
  function resetObj() {
    let newVals = result.filter((ele) => {
      return ele.questionNum !== questionNumber;
    });
    //dispatch to initial state
    dispatch({
      type: "replace",
      payload: newVals
    });
  }

  //JSX will render base on types
  switch (type) {
    case "Radio":
      return (
        <>
          {questionoption?.map(({ optionvalue, optionid }) => {
            return (
              <div
                key={optionid}
                className={`${
                  getObj()?.answer === optionvalue ? "active" : null
                } ms-2 mt-1 d-flex align-items-center gap-1 bg-light my-1 ps-1 rounded w-25 option`}
              >
                <input
                  type="radio"
                  className=""
                  id={optionvalue}
                  defaultChecked={getObj()?.answer === optionvalue}
                  name={type}
                  onChange={(e) => {
                    const { value } = e.target;
                    onchange(value, questionNumber);
                  }}
                  value={optionvalue}
                />
                <label className="w-100 p-1 " htmlFor={optionvalue}>
                  {optionvalue}
                </label>
                <br></br>
              </div>
            );
          })}
        </>
      );
    case "Date":
      return (
        <>
          {questionoption?.map(({ optionid }) => {
            return (
              <div key={optionid} className="my-1 ms-2">
                <input
                  className="rounded-pill px-3 py-1"
                  type="datetime-local"
                  value={getObj()?.answer || ""}
                  name={type}
                  onChange={(e) => {
                    const { value } = e.target;
                    if (value) {
                      onchange(value, questionNumber);
                    } else {
                      resetObj();
                    }
                  }}
                />
                <br></br>
              </div>
            );
          })}
        </>
      );
    case "Checkbox":
      return (
        <>
          {questionoption?.map(({ optionvalue, optionid }) => {
            return (
              <div
                key={optionid}
                className={`${
                  getObj()?.answer?.includes(optionvalue) ? "active" : null
                } ms-2 mt-1 d-flex align-items-center gap-1 bg-light my-1 ps-1 rounded w-25 option`}
              >
                <input
                  type="checkbox"
                  id={optionid}
                  name={type}
                  defaultChecked={getObj()?.answer?.includes(optionvalue)}
                  onChange={(e) => {
                    const { value } = e.target;
                    if (
                      getObj()?.answer &&
                      !getObj()?.answer?.includes(value) &&
                      getObj()?.answer?.length <= questionoption.length &&
                      getObj()?.answer?.length > 0
                    ) {
                      //1). if values are exist in object answer!... then spread and add new one
                      onchange([...getObj()?.answer, value], questionNumber);
                    } else if (getObj()?.answer?.includes(value)) {
                      //1).if upcomming value is exist in ans... then filter it
                      //2). it means remove existing value from ans array and reassign with new array
                      let newVals = getObj()?.answer.filter((ele) => {
                        return ele !== value;
                      });
                      if (newVals.length) {
                        onchange(newVals, questionNumber);
                      } else {
                        resetObj();
                      }
                    } else {
                      onchange([value], questionNumber);
                    }
                  }}
                  value={optionvalue}
                />
                <label className="w-100 cursor p-1 " htmlFor={optionid}>
                  {optionvalue}
                </label>
                <br />
              </div>
            );
          })}
        </>
      );
    case "Textarea":
      return (
        <>
          {questionoption?.map(({ optionid }) => {
            return (
              <div key={optionid} className="my-1 ms-2">
                <textarea
                  className="textarea px-2 py-1 rounded-3"
                  value={getObj()?.answer || ""}
                  placeholder="Type here..."
                  id={optionid}
                  name={type}
                  rows="4"
                  cols="50"
                  onChange={(e) => {
                    const { value } = e.target;
                    if (value) {
                      onchange(value, questionNumber);
                    } else {
                      resetObj();
                    }
                  }}
                />
                <br />
              </div>
            );
          })}
        </>
      );
    default:
      return <>TEST</>;
  }
});
