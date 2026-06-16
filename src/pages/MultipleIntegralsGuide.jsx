import { useState } from "react";
import { useProgress } from "../context/ProgressContext";
import StudyGuideShell from "./StudyGuideShell";
import "./PartialDerivativesGuide.css";

function Divider() {
  return <hr className="divider" />;
}

function GuideSidebarPart1() {
  return (
    <nav className="sidebar">
      <div className="sb-brand">
        <div className="sb-title">{"Multiple Integrals · Part 1"}</div>
      </div>
      <a className="sb-link" href="#mi-1">{"Double Integrals"}</a>
      <a className="sb-link" href="#mi-2">{"Fubini's Theorem"}</a>
      <a className="sb-link" href="#mi-3">{"Changing Order"}</a>
      <a className="sb-link" href="#mi-quiz1">{"Practice Quiz"}</a>
    </nav>
  );
}

function GuideSidebarPart2() {
  return (
    <nav className="sidebar">
      <div className="sb-brand">
        <div className="sb-title">{"Multiple Integrals · Part 2"}</div>
      </div>
      <a className="sb-link" href="#mi-4">{"Triple Integrals"}</a>
      <a className="sb-link" href="#mi-5">{"Polar Coordinates"}</a>
      <a className="sb-link" href="#mi-6">{"Cylindrical Coordinates"}</a>
      <a className="sb-link" href="#mi-quiz2">{"Practice Quiz"}</a>
    </nav>
  );
}

function GuideHeaderPart1() {
  return (
    <div className="ch-hdr">
      <p className="ch-eye">{"MULTIVARIABLE CALCULUS STUDY GUIDE · PART 1 OF 2"}</p>
      <h1 className="ch-title">{"Multiple Integrals"}</h1>
      <p className="ch-sub">{"Double Integrals, Fubini's Theorem & Changing Order of Integration"}</p>
      <p className="ch-orn">{"✦ \u00a0 ✦ \u00a0 ✦"}</p>
    </div>
  );
}

function GuideHeaderPart2() {
  return (
    <div className="ch-hdr">
      <p className="ch-eye">{"MULTIVARIABLE CALCULUS STUDY GUIDE · PART 2 OF 2"}</p>
      <h1 className="ch-title">{"Triple Integrals & Coordinate Systems"}</h1>
      <p className="ch-sub">{"Triple Integrals, Polar, Cylindrical & Spherical Coordinates"}</p>
      <p className="ch-orn">{"✦ \u00a0 ✦ \u00a0 ✦"}</p>
    </div>
  );
}

function TableOfContentsPart1() {
  return (
    <div className="toc">
      <p className="toc-h">{"CONTENTS — PART 1 OF 2"}</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
        <a className="toc-a" href="#mi-1">{"Double Integrals"}</a>
        <a className="toc-a" href="#mi-2">{"Fubini's Theorem"}</a>
        <a className="toc-a" href="#mi-3">{"Changing Order of Integration"}</a>
        <a className="toc-a" href="#mi-quiz1">{"Practice Quiz"}</a>
      </div>
    </div>
  );
}

function TableOfContentsPart2() {
  return (
    <div className="toc">
      <p className="toc-h">{"CONTENTS — PART 2 OF 2"}</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
        <a className="toc-a" href="#mi-4">{"Triple Integrals"}</a>
        <a className="toc-a" href="#mi-5">{"Polar Coordinates"}</a>
        <a className="toc-a" href="#mi-6">{"Cylindrical Coordinates"}</a>
        <a className="toc-a" href="#mi-quiz2">{"Practice Quiz"}</a>
      </div>
    </div>
  );
}

function SectionMI1() {
  return (
    <section className="section" id="mi-1">
      <div className="sec-badge">{"Section"}</div>
      <h2 className="sec-title">{"Double Integrals over Rectangles"}</h2>
      <p>
        {"A double integral extends single-variable integration to functions of two variables. Over a rectangle $R = [a,b] \\times [c,d]$, we integrate $f(x,y)$ over both variables."}
      </p>
      <div className="box def">
        <div className="box-lbl">{"Definition \u2014 Double Integral"}</div>
        <p>
          {"The double integral of $f$ over rectangle $R$ is:"}
        </p>
        <div className="fml">
          {"$$\\iint_R f(x,y)\\,dA = \\lim_{m,n\\to\\infty} \\sum_{i=1}^{m}\\sum_{j=1}^{n} f(x_{ij}^*, y_{ij}^*)\\,\\Delta A$$"}
        </div>
        <p>
          {"where $\\Delta A = \\Delta x\\,\\Delta y$ is the area of each small rectangle."}
        </p>
      </div>
      <h3 className="subsec">{"Geometric Interpretation"}</h3>
      <p>
        {"If $f(x,y) \\geq 0$, the double integral $\\iint_R f(x,y)\\,dA$ represents the volume of the solid that lies above the rectangle $R$ and below the surface $z = f(x,y)$."}
      </p>
      <div className="box exm">
        <div className="box-lbl">{"Example"}</div>
        <div className="exm-title">
          {"Estimate $\\iint_R (x+2y)\\,dA$ over $R=[0,2]\\times[0,1]$"}
        </div>
        <div className="sol">
          <div className="sol-lbl">{"Solution"}</div>
          <p>{"Using midpoints: $\\Delta x = 1$, $\\Delta y = 0.5$."}</p>
          <p>{"Sample points: $(0.5, 0.25)$, $(0.5, 0.75)$, $(1.5, 0.25)$, $(1.5, 0.75)$."}</p>
          <p>{"$f(0.5,0.25)=1$, $f(0.5,0.75)=2$, $f(1.5,0.25)=2$, $f(1.5,0.75)=3$."}</p>
          <div className="fml">{"$$\\iint_R f\\,dA \\approx (1+2+2+3)\\times 0.5 = 4$$"}</div>
        </div>
      </div>
    </section>
  );
}

function SectionMI2() {
  return (
    <section className="section" id="mi-2">
      <div className="sec-badge">{"Section"}</div>
      <h2 className="sec-title">{"Fubini's Theorem"}</h2>
      <p>
        {"Fubini's Theorem allows us to evaluate double integrals as iterated (repeated) single integrals, which is the practical method used in all calculations."}
      </p>
      <div className="box def">
        <div className="box-lbl">{"Theorem \u2014 Fubini's Theorem"}</div>
        <p>{"If $f$ is continuous on $R = [a,b]\\times[c,d]$, then:"}</p>
        <div className="fml">
          {"$$\\iint_R f(x,y)\\,dA = \\int_a^b\\int_c^d f(x,y)\\,dy\\,dx = \\int_c^d\\int_a^b f(x,y)\\,dx\\,dy$$"}
        </div>
      </div>
      <div className="box exm">
        <div className="box-lbl">{"Example"}</div>
        <div className="exm-title">
          {"Evaluate $\\iint_R (x^2 + 2xy)\\,dA$ where $R = [0,1]\\times[0,2]$"}
        </div>
        <div className="sol">
          <div className="sol-lbl">{"Solution"}</div>
          <p>{"Integrate with respect to $y$ first, then $x$:"}</p>
          <div className="fml">
            {"$$\\int_0^1\\int_0^2 (x^2+2xy)\\,dy\\,dx = \\int_0^1\\left[x^2 y + xy^2\\right]_0^2 dx$$"}
          </div>
          <div className="fml">
            {"$$= \\int_0^1 (2x^2 + 4x)\\,dx = \\left[\\frac{2x^3}{3} + 2x^2\\right]_0^1 = \\frac{2}{3} + 2 = \\frac{8}{3}$$"}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionMI3() {
  return (
    <section className="section" id="mi-3">
      <div className="sec-badge">{"Section"}</div>
      <h2 className="sec-title">{"Changing the Order of Integration"}</h2>
      <p>
        {"Sometimes an integral is impossible or very hard in one order but straightforward in the other. Switching the order requires redrawing the region of integration."}
      </p>
      <div className="box exm">
        <div className="box-lbl">{"Example"}</div>
        <div className="exm-title">
          {"Change the order: $\\int_0^1\\int_x^1 e^{y^2}\\,dy\\,dx$"}
        </div>
        <div className="sol">
          <div className="sol-lbl">{"Solution"}</div>
          <p>{"Original region: $0 \\leq x \\leq 1$, $x \\leq y \\leq 1$."}</p>
          <p>{"Redescribed: $0 \\leq y \\leq 1$, $0 \\leq x \\leq y$."}</p>
          <div className="fml">
            {"$$\\int_0^1\\int_0^y e^{y^2}\\,dx\\,dy = \\int_0^1 y\\,e^{y^2}\\,dy = \\frac{1}{2}(e-1)$$"}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionMI4() {
  return (
    <section className="section" id="mi-4">
      <div className="sec-badge">{"Section"}</div>
      <h2 className="sec-title">{"Triple Integrals"}</h2>
      <p>
        {"Triple integrals extend double integrals to functions of three variables over a 3D region $E$."}
      </p>
      <div className="box def">
        <div className="box-lbl">{"Definition \u2014 Triple Integral"}</div>
        <div className="fml">
          {"$$\\iiint_E f(x,y,z)\\,dV = \\int_a^b\\int_{g_1(x)}^{g_2(x)}\\int_{h_1(x,y)}^{h_2(x,y)} f(x,y,z)\\,dz\\,dy\\,dx$$"}
        </div>
      </div>
      <div className="box exm">
        <div className="box-lbl">{"Example"}</div>
        <div className="exm-title">
          {"Evaluate $\\iiint_E xyz\\,dV$ where $E=[0,1]\\times[0,2]\\times[0,3]$"}
        </div>
        <div className="sol">
          <div className="sol-lbl">{"Solution"}</div>
          <div className="fml">
            {"$$\\int_0^1\\int_0^2\\int_0^3 xyz\\,dz\\,dy\\,dx = \\int_0^1 x\\,dx\\cdot\\int_0^2 y\\,dy\\cdot\\int_0^3 z\\,dz$$"}
          </div>
          <div className="fml">
            {"$$= \\frac{1}{2}\\cdot 2\\cdot\\frac{9}{2} = \\frac{9}{2}$$"}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionMI5() {
  return (
    <section className="section" id="mi-5">
      <div className="sec-badge">{"Section"}</div>
      <h2 className="sec-title">{"Double Integrals in Polar Coordinates"}</h2>
      <p>
        {"When the region or integrand involves $x^2+y^2$, polar coordinates simplify the integral greatly."}
      </p>
      <div className="box def">
        <div className="box-lbl">{"Polar Substitution"}</div>
        <p>{"Let $x = r\\cos\\theta$, $y = r\\sin\\theta$. Then:"}</p>
        <div className="fml">
          {"$$\\iint_R f(x,y)\\,dA = \\int_\\alpha^\\beta\\int_a^b f(r\\cos\\theta, r\\sin\\theta)\\,r\\,dr\\,d\\theta$$"}
        </div>
        <p>{"Note the extra factor of $r$ — this comes from the Jacobian."}</p>
      </div>
      <div className="box exm">
        <div className="box-lbl">{"Example"}</div>
        <div className="exm-title">
          {"Evaluate $\\iint_R \\sqrt{x^2+y^2}\\,dA$ over the disk $x^2+y^2 \\leq 4$"}
        </div>
        <div className="sol">
          <div className="sol-lbl">{"Solution"}</div>
          <p>{"In polar: $\\sqrt{x^2+y^2} = r$, region is $0\\leq r\\leq 2$, $0\\leq\\theta\\leq 2\\pi$."}</p>
          <div className="fml">
            {"$$\\int_0^{2\\pi}\\int_0^2 r\\cdot r\\,dr\\,d\\theta = 2\\pi\\cdot\\frac{8}{3} = \\frac{16\\pi}{3}$$"}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionMI6() {
  return (
    <section className="section" id="mi-6">
      <div className="sec-badge">{"Section"}</div>
      <h2 className="sec-title">{"Cylindrical Coordinates"}</h2>
      <p>
        {"Cylindrical coordinates combine polar coordinates in $xy$ with the $z$-axis: $(r, \\theta, z)$ where $x=r\\cos\\theta$, $y=r\\sin\\theta$, $z=z$."}
      </p>
      <div className="box def">
        <div className="box-lbl">{"Triple Integral in Cylindrical Coordinates"}</div>
        <div className="fml">
          {"$$\\iiint_E f\\,dV = \\int_\\alpha^\\beta\\int_a^b\\int_{u_1}^{u_2} f(r\\cos\\theta,r\\sin\\theta,z)\\,r\\,dz\\,dr\\,d\\theta$$"}
        </div>
      </div>
      <div className="box exm">
        <div className="box-lbl">{"Example"}</div>
        <div className="exm-title">
          {"Find the volume of the cylinder $x^2+y^2 \\leq 4$, $0\\leq z\\leq 3$"}
        </div>
        <div className="sol">
          <div className="sol-lbl">{"Solution"}</div>
          <div className="fml">
            {"$$\\int_0^{2\\pi}\\int_0^2\\int_0^3 r\\,dz\\,dr\\,d\\theta = 2\\pi\\cdot 2\\cdot 3 = 12\\pi$$"}
          </div>
        </div>
      </div>
    </section>
  );
}

function IntegralsQuiz({ part }) {
  const { saveQuizScore } = useProgress();
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const QUIZ_DATA = {
    1: [
      {
        q: "What does a double integral represent geometrically when f(x,y) >= 0?",
        options: [
          "The area of the region R.",
          "The volume under the surface z = f(x,y) above R.",
          "The surface area of z = f(x,y).",
          "The perimeter of the region R.",
        ],
        answer: 1,
      },
      {
        q: "Fubini's Theorem says we can evaluate a double integral as:",
        options: [
          "A single integral only.",
          "Two separate single integrals multiplied together.",
          "An iterated integral in either order.",
          "A limit of a sum only.",
        ],
        answer: 2,
      },
      {
        q: "To change the order of integration, you must:",
        options: [
          "Change the function f(x,y).",
          "Redraw and redescribe the region of integration.",
          "Multiply by a Jacobian factor.",
          "Convert to polar coordinates.",
        ],
        answer: 1,
      },
    ],
    2: [
      {
        q: "When converting to polar coordinates, the area element dA becomes:",
        options: ["dr dθ", "r dr dθ", "r² dr dθ", "dθ dr"],
        answer: 1,
      },
      {
        q: "Cylindrical coordinates are best used when the region has:",
        options: [
          "Rectangular symmetry",
          "Symmetry about the z-axis",
          "Symmetry about the x-axis",
          "No particular symmetry",
        ],
        answer: 1,
      },
      {
        q: "The volume of a solid region E using a triple integral is:",
        options: [
          "∯ f(x,y,z) dV where f = x+y+z",
          "∯ 1 dV over E",
          "∯ 0 dV over E",
          "∯ f(x,y) dA",
        ],
        answer: 1,
      },
    ],
  };

  const questions = QUIZ_DATA[part];
  const quizId = "integrals-" + part;

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
    <section className="mcq-section" id={"mi-quiz" + part}>
      <div className="mcq-section-badge">{"Practice"}</div>
      <h2 className="mcq-section-title">{"Part " + part + " Quiz"}</h2>
      {questions.map((q, i) => (
        <div
          key={i}
          className={"mcq-card" + (submitted ? (answers[i] === q.answer ? " correct" : " wrong") : "")}
        >
          <p className="mcq-q">{q.q}</p>
          <ul className="mcq-options">
            {q.options.map((opt, j) => (
              <li key={j}>
                <button
                  className={"mcq-opt" + (answers[i] === j ? " selected" : "") + (submitted && j === q.answer ? " correct" : "")}
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
          {"Submit answers"}
        </button>
      ) : (
        <div className="quiz-result">
          <p>{"Score: "}<strong>{score + " / " + questions.length}</strong></p>
          <button className="quiz-retry" onClick={handleReset}>{"Try again"}</button>
        </div>
      )}
    </section>
  );
}

function GuideFooter() {
  return (
    <div className="pg-foot">
      <p>{"End of Multiple Integrals guide."}</p>
    </div>
  );
}

function IntegralsContent({ part }) {
  if (part === 1) {
    return (
      <>
        <GuideSidebarPart1 />
        <main className="main">
          <GuideHeaderPart1 />
          <TableOfContentsPart1 />
          <Divider />
          <SectionMI1 />
          <Divider />
          <SectionMI2 />
          <Divider />
          <SectionMI3 />
          <Divider />
          <IntegralsQuiz part={1} />
          <GuideFooter />
        </main>
      </>
    );
  }

  return (
    <>
      <GuideSidebarPart2 />
      <main className="main">
        <GuideHeaderPart2 />
        <TableOfContentsPart2 />
        <Divider />
        <SectionMI4 />
        <Divider />
        <SectionMI5 />
        <Divider />
        <SectionMI6 />
        <Divider />
        <IntegralsQuiz part={2} />
        <GuideFooter />
      </main>
    </>
  );
}

function MultipleIntegralsGuide({ part }) {
  return (
    <StudyGuideShell guideClass="partial-derivatives-guide">
      <IntegralsContent part={part} />
    </StudyGuideShell>
  );
}

export default MultipleIntegralsGuide;