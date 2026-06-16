

import { useEffect } from "react";
import { useProgress } from "../context/ProgressContext";
import BookmarkButton from "../components/BookmarkButton";
import SectionCompleteBar from "../components/SectionCompleteBar";
import MultipleIntegralsGuide from "./MultipleIntegralsGuide";
import "./GuidePart.css";

function IntegralsPart1() {
  const { recordVisit } = useProgress();

  useEffect(() => {
    recordVisit("integrals-1");
  }, [recordVisit]);

  return (
    <div className="guide-part-wrapper">
      <div className="guide-part-topbar">
        <div className="guide-part-info">
          <span className="guide-part-badge">Part 1 of 2</span>
          <span className="guide-part-title">
            Multiple Integrals — Double Integrals & Fubini's Theorem
          </span>
        </div>
        <BookmarkButton
          id="integrals-1"
          title="Multiple Integrals — Part 1"
          path="/multiple-integrals/1"
        />
      </div>
      <MultipleIntegralsGuide part={1} />
      <SectionCompleteBar
        sectionId="integrals-1"
        nextPath="/multiple-integrals/2"
        nextLabel="Part 2: Triple Integrals & Coordinates"
      />
    </div>
  );
}

export default IntegralsPart1;