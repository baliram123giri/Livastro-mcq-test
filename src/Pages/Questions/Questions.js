import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { useNavigate } from "react-router-dom";
import QuestionName from "../../Components/QuestionName";
import QuestionOptions from "../../Components/QuestionOptions";
import { updateItem } from "../../Utils/controllers";
import { DataContext } from "../../Utils/DataProvider";

export default memo(function Questions() {
  //context api
  const [{ questionsList, result }, dispatch] = useContext(DataContext);

  //destructure questions object
  const { questions } = questionsList;

  //states
  const [questionNumber, setQuestionNumber] = useState(0);
  const [questionLeft, setQuestionLeft] = useState(0);

  //add Values function for adding new values to result (initial state)
  function addAns(value, number) {
    dispatch({
      type: "add",
      payload: {
        question: questions[number].question,
        answer: value,
        questionNum: number
      }
    });
  }
  //update Values function for updating the existing values of result (initial state)
  function updateAns(value, number) {
    dispatch({
      type: "replace",
      payload: updateItem(
        {
          question: questions[number].question,
          answer: value,
          questionNum: number
        },
        result
      )
    });
  }
  //onchnage will give two values
  //1) current value
  //2) current question number
  //here used useCallback for rerender to the component.
  const onChange = useCallback(
    (value, number) => {
      //objectIndex wiil find index of object from existing array
      let objIndex = result.findIndex((obj) => obj.questionNum === number);

      if (objIndex === -1) {
        addAns(value, number);
      } else {
        updateAns(value, number);
      }
    },
    [result]
  );

  //useNavigate for changing path of page
  let history = useNavigate();

  //here used useMemo for memorize provided values to the component.
  const question = useMemo(() => questions[questionNumber], [questionNumber]);

  //useEffect after onload
  useEffect(() => {
    let questionCount = questions?.filter((el) => {
      return !result?.find((element) => {
        return element.question === el.question;
      });
    });
    setQuestionLeft(questionCount.length);
  }, [result]);

  return (
    <div className="row  h-100 align-items-center">
      <div className="col-12  col-md-6 bg-white p-5 py-2 rounded-3 h-50 shadow-lg border mx-auto d-flex align-items-center">
        <div className="content w-100">
          <QuestionName
            validation={question["validation"]}
            name={question["question"]}
            number={questionNumber + 1}
          />
          <div className="options-box mt-3">
            <QuestionOptions
              type={question["questiontype"]}
              questionoption={question["questionoption"]}
              onchange={onChange}
              questionNumber={questionNumber}
            />
          </div>
          <br />
          <div className="my-2 ms-2">
            <span style={{ fontSize: 12 }}>
              {result?.length !== questions?.length ? (
                <span className="text-danger">
                  {questionLeft} out of {questions.length} are left
                </span>
              ) : (
                <span className="text-success">
                  Well done all questions are attempted...
                </span>
              )}
            </span>
          </div>
          <div className="buttons">
            <button
              className="prev me-2 rounded-pill px-3"
              disabled={questionNumber < 1}
              onClick={() => {
                setQuestionNumber(questionNumber - 1);
              }}
            >
              Previous
            </button>
            <button
              className="next rounded-pill px-3 me-1"
              disabled={
                questionNumber + 1 === questions.length || result.length === 0
              }
              onClick={() => {
                setQuestionNumber(questionNumber + 1);
              }}
            >
              Next
            </button>
            {result.length > 0 && (
              <button
                className="finish rounded-pill px-3"
                onClick={() => {
                  history("/result");
                }}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
