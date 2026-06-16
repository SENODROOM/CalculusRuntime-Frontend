import { useEffect } from "react";
import { useProgress } from "../context/ProgressContext";
import BookmarkButton from "../components/BookmarkButton";
import SectionCompleteBar from "../components/SectionCompleteBar";
import MultipleIntegralsGuide from "./MultipleIntegralsGuide";
import "./GuidePart.css";

function IntegralsPart2() {
  const { recordVisit } = useProgress();

  useEffect(() => {
    recordVisit("integrals-2");
  }, [recordVisit]);

  return (
    <div className="guide-part-wrapper">
      <div className="guide-part-topbar">
        <div className="guide-part-info">
          <span className="guide-part-badge">Part 2 of 2</span>
          <span className="guide-part-title">
            Multiple Integrals — Triple Integrals & Coordinate Systems
          </span>
        </div>
        <BookmarkButton
          id="integrals-2"
          title="Multiple Integrals — Part 2"
          path="/multiple-integrals/2"
        />
      </div>
      <MultipleIntegralsGuide part={2} />
      <SectionCompleteBar
        sectionId="integrals-2"
        nextPath="/partial-derivatives/1"
        nextLabel="Partial Derivatives Part 1"
      />
    </div>
  );
}

export default IntegralsPart2;