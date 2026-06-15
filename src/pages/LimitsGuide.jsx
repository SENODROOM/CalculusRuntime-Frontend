import { useState } from "react";
import { useProgress } from "../context/ProgressContext";
import "./PartialDerivativesGuide.css";

function LimitsQuiz({ part }) {
  const { saveQuizScore } = useProgress();
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const QUIZ_DATA = {
    1: [
      {
        q: "Which condition must hold for a multivariable limit to exist?",
        options: [
          "The limit along every path must be equal.",
          "The limit along x-axis must equal limit along y-axis only.",
          "f(a,b) must be defined.",
          "The function must be differentiable at (a,b).",
        ],
        answer: 0,
      },
      {
        q: "For f(x,y) = xy / (x^2 + y^2), the limit as (x,y) approaches (0,0):",
        options: [
          "equals 0",
          "equals 1",
          "equals 1/2",
          "does not exist",
        ],
        answer: 3,
      },
      {
        q: "The Squeeze Theorem says if |f(x,y)| <= g(x,y) and lim g = 0, then:",
        options: [
          "lim f = 1",
          "lim f = 0",
          "lim f does not exist",
          "f is continuous",
        ],
        answer: 1,
      },
    ],
    2: [
      {
        q: "A function f(x,y) is continuous at (a,b) if:",
        options: [
          "It is defined at (a,b) only.",
          "The limit exists but may differ from f(a,b).",
          "f(a,b) is defined, the limit exists, and they are equal.",
          "It is differentiable at (a,b).",
        ],
        answer: 2,
      },
      {
        q: "Is f(x,y) = (x^2 - y^2)/(x^2 + y^2) continuous at the origin?",
        options: [
          "Yes, because it is a rational function.",
          "No, because the limit does not exist at the origin.",
          "Yes, because f(0,0) = 0.",
          "No, because the domain excludes the origin.",
        ],
        answer: 1,
      },
      {
        q: "Compositions of continuous functions are:",
        options: [
          "Always discontinuous",
          "Continuous wherever the composition is defined",
          "Only continuous on closed sets",
          "Differentiable but not continuous",
        ],
        answer: 1,
      },
    ],
  };

  const questions = QUIZ_DATA[part];
  const quizId = "limits-" + part;

  function handleSelect(qIdx, oIdx) {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qIdx]: oIdx }));
  }

  function handleSubmit() {
    if (Object.keys(answers).length < questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }
    setSubmitted(true);
    const score = questions.filter((q, i) => answers[i] === q.answer).length;
    saveQuizScore(quizId, score, questions.length);
  }

  function handleReset() {
    setAnswers({});
    setSubmitted(false);
  }

  const score = questions.filter((q, i) => answers[i] === q.answer).length;

  return (
    <div className="quiz-block">
      <div className="quiz-header">
        <span className="quiz-badge">MCQ Practice</span>
        <h3 className="quiz-title">Part {part} Quiz</h3>
      </div>
      {questions.map((q, i) => (
        <div
          key={i}
          className={
            "quiz-q" +
            (submitted ? (answers[i] === q.answer ? " correct" : " wrong") : "")
          }
        >
          <p className="quiz-question">{q.q}</p>
          <ul className="quiz-options">
            {q.options.map((opt, j) => (
              <li key={j}>
                <button
                  className={
                    "quiz-opt" +
                    (answers[i] === j ? " selected" : "") +
                    (submitted && j === q.answer ? " reveal-correct" : "")
                  }
                  onClick={() => handleSelect(i, j)}
                  disabled={submitted}
                >
                  {opt}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {!submitted ? (
        <button className="quiz-submit" onClick={handleSubmit}>
          Submit answers
        </button>
      ) : (
        <div className="quiz-result">
          <p>
            Score: <strong>{score} / {questions.length}</strong>
          </p>
          <button className="quiz-retry" onClick={handleReset}>
            Try again
          </button>
        </div>
      )}
    </div>
  );
}

function LimitsGuide({ part }) {
  if (part === 1) {
    return (
      <article className="guide-article">
        <div className="guide-opening">
          <p>
            Limits and continuity form the foundation of multivariable calculus.
            We extend the single-variable idea of a limit to functions of two or
            more variables, where inputs can approach a point from infinitely
            many directions.
          </p>
        </div>

        <section className="section" id="lc-1">
          <div className="sec-badge">Section</div>
          <h2 className="sec-title">Limits of Functions of Two Variables</h2>
          <p>
            We say the limit of f(x,y) as (x,y) approaches (a,b) equals L if
            f(x,y) can be made arbitrarily close to L by taking (x,y)
            sufficiently close to (a,b), regardless of the direction of approach.
          </p>

          <div className="box def">
            <div className="box-lbl">Definition — Limit</div>
            <p>
              The limit equals L means: for every error margin there exists a
              distance delta such that whenever (x,y) is within delta of (a,b),
              f(x,y) is within that error margin of L.
            </p>
          </div>

          <h3 className="subsec">Evaluating Limits — Direct Substitution</h3>
          <p>
            If f is a polynomial or rational function and the denominator is
            non-zero at (a,b), simply substitute the values directly.
          </p>

          <div className="box exm">
            <div className="box-lbl">Example</div>
            <div className="exm-title">
              Find the limit of (3x squared + y) as (x,y) approaches (1,2)
            </div>
            <div className="sol">
              <div className="sol-lbl">Solution</div>
              <p>
                Substitute directly: 3(1) + 2 = 5.
              </p>
              <p>Therefore the limit equals 5.</p>
            </div>
          </div>

          <h3 className="subsec">Showing a Limit Does NOT Exist</h3>
          <p>
            If two different paths to (a,b) give different limit values, the
            overall limit does not exist. This is called the two-path test.
          </p>

          <div className="box exm">
            <div className="box-lbl">Example</div>
            <div className="exm-title">
              Show that the limit of xy / (x squared + y squared) as (x,y)
              approaches (0,0) does not exist.
            </div>
            <div className="sol">
              <div className="sol-lbl">Solution</div>
              <p>Along the path y = 0: the expression becomes 0, so the limit is 0.</p>
              <p>Along the path y = x: the expression becomes 1/2, so the limit is 1/2.</p>
              <p>
                Two paths give different values, so the limit does not exist.
              </p>
            </div>
          </div>
        </section>

        <hr className="divider" />

        <section className="section" id="lc-2">
          <div className="sec-badge">Section</div>
          <h2 className="sec-title">Squeeze Theorem for Two Variables</h2>
          <p>
            If the absolute value of f(x,y) is less than or equal to g(x,y)
            near (a,b), and the limit of g equals 0, then the limit of f is
            also 0.
          </p>

          <div className="box exm">
            <div className="box-lbl">Example</div>
            <div className="exm-title">
              Evaluate the limit of (x squared times y) / (x squared + y
              squared) as (x,y) approaches (0,0).
            </div>
            <div className="sol">
              <div className="sol-lbl">Solution</div>
              <p>
                Since x squared is less than or equal to x squared plus y
                squared, the absolute value of the expression is less than or
                equal to the absolute value of y, which approaches 0.
              </p>
              <p>Therefore by the Squeeze Theorem, the limit equals 0.</p>
            </div>
          </div>
        </section>

        <LimitsQuiz part={1} />
      </article>
    );
  }

  return (
    <article className="guide-article">
      <div className="guide-opening">
        <p>
          In Part 2 we define continuity precisely for functions of several
          variables and explore its consequences — in particular, how continuity
          interacts with composition and limits.
        </p>
      </div>

      <section className="section" id="lc-3">
        <div className="sec-badge">Section</div>
        <h2 className="sec-title">Continuity of Multivariable Functions</h2>

        <div className="box def">
          <div className="box-lbl">Definition — Continuity at a Point</div>
          <p>f is continuous at (a,b) if all three conditions hold:</p>
          <ol className="steps">
            <li><span>f(a,b) is defined.</span></li>
            <li><span>The limit of f(x,y) as (x,y) approaches (a,b) exists.</span></li>
            <li><span>The limit equals f(a,b).</span></li>
          </ol>
        </div>

        <div className="box exm">
          <div className="box-lbl">Example</div>
          <div className="exm-title">
            Is f(x,y) = (x squared minus y squared) / (x squared + y squared)
            continuous at the origin?
          </div>
          <div className="sol">
            <div className="sol-lbl">Solution</div>
            <p>
              Along y = 0 the limit is 1. Along x = 0 the limit is -1.
              Different paths give different limits, so the limit at the origin
              does not exist. The function is not continuous at the origin.
            </p>
          </div>
        </div>

        <h3 className="subsec">Continuity on a Region</h3>
        <p>
          A function is continuous on an open set D if it is continuous at every
          point in D. Polynomials, rational functions away from where the
          denominator equals zero, and compositions of continuous functions are
          all continuous on their domains.
        </p>
      </section>

      <LimitsQuiz part={2} />
    </article>
  );
}

export default LimitsGuide;

