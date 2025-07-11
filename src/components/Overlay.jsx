import { useProgress } from "@react-three/drei";
import { usePlay } from "../contexts/Play";

export const Overlay = () => {
  const { progress } = useProgress();
  const { play, end, setPlay, hasScroll } = usePlay();
  return (
    <div
      className={`overlay ${play ? "overlay--disable" : ""}
    ${hasScroll ? "overlay--scrolled" : ""}`}>
      <div
        className={`loader ${progress === 100 ? "loader--disappear" : ""}`}
      />
      {progress === 100 && (
        <div className={`intro ${play ? "intro--disappear" : ""}`}>
          <h1 className="logo">CSM Aviation</h1>
          <h2 className="logo--subtext">
            ANYWHERE ANYTIME PRIVATE JET CHARTER
          </h2>

          {/* <h2>ANYWHERE ANYTIME PRIVATE JET CHARTER</h2> */}
          <p className="intro__scroll">Scroll to begin the journey</p>
          <button
            className="explore"
            onClick={() => {
              setPlay(true);
            }}>
            Explore
          </button>
        </div>
      )}
      <div className={`outro`}>
        <p className="outro__text">Wish you had a great flight with us...</p>
      </div>
    </div>
  );
};
