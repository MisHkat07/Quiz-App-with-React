import Answers from '../Answers';
import ProgressBar from '../ProgressBar';
import MiniPlayer from '../MiniPlayer';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect, useReducer, useState } from 'react';
import useQuestions from '../../Hooks/useQuestion';
import _ from 'lodash';
import { useAuth } from '../../contexts/AuthContext';
import { getDatabase, ref, set } from 'firebase/database';

const initialState = null;

const reducer = (state, action) => {
  switch (action.type) {
    case 'questions':
      action.value.forEach((questions) => {
        questions.options.forEach((option) => {
          option.checked = false;
        });
      });
      return action.value;
    case 'answer':
      const questions = _.cloneDeep(state);
      questions[action.questionID].options[action.optionsIndex].checked =
        action.value;
      return questions;

    default:
      return state;
  }
};

export default function Quiz() {
  const { id } = useParams();
  const { loading, error, questions } = useQuestions(id);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [qna, dispatch] = useReducer(reducer, initialState);
  const { currentUser } = useAuth();
  const history = useHistory();

  useEffect(() => {
    dispatch({
      type: 'questions',
      value: questions,
    });
  }, [questions]);

  function handleAnswerChange(e, index) {
    dispatch({
      type: 'answer',
      questionID: currentQuestion,
      optionsIndex: index,
      value: e.target.checked,
    });
  }

  function nextQuestion() {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prevCurrent) => prevCurrent + 1);
    }
  }
  function prevQuestion() {
    if (currentQuestion >= 1 && currentQuestion <= questions.length) {
      setCurrentQuestion((prevCurrent) => prevCurrent - 1);
    }
  }

  async function submit() {
    const { uid } = currentUser;
    const db = getDatabase();
    const resultRef = ref(db, `result/${uid}`);

    await set(resultRef, {
      [id]: qna
    });

    history.push({
      pathname: `/result/${id}`,
      state: {
        qna,
      }

    });
  
  }


  const percentage =
    questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>There was an error!</div>}
      {!loading && !error && qna && qna.length > 0 && (
        <>
          <h1>{qna[currentQuestion].title}</h1>
          <h4>Question can have multiple answers</h4>
          <Answers
            options={qna[currentQuestion].options}
            handleChange={handleAnswerChange}
          />
          <ProgressBar
            submit={submit}
            next={nextQuestion}
            prev={prevQuestion}
            progress={percentage} />
          <MiniPlayer />
        </>
      )}
    </>
  );
}
