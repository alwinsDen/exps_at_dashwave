import { useEffect, useRef } from "react";
import DashwaveLogo from "../../assets/DashwaveLogoBlue.svg";
const Exp2 = () => {
  const firstTextRef = useRef(null);
  const introTextRef = useRef(null);
  const imageDivRef = useRef(null);
  const textP_ref = useRef(null);
  useEffect(() => {
    let loaded = false;
    let lastY = window.scrollY;
    let direction = "null";
    function loadEvent() {
      loaded = true;
    }
    function findDir() {
      direction = lastY > window.scrollY ? "up" : "down";
      lastY = window.scrollY;
    }
    window.addEventListener("load", loadEvent);
    window.addEventListener("scroll", findDir);
    const firstTextObs = new IntersectionObserver(
      () => {
        if (direction === "down") {
          console.log(direction);
          firstTextRef.current.style.position = "fixed";
          firstTextRef.current.style.top = "40%";
          firstTextRef.current.style.transform = "translate(-50%, -100%)";
          function blurControls() {
            //in-genius solution from gpt. DAMN!
            let opacity = 1 - window.scrollY / (window.innerHeight * 1);
            opacity = Math.max(0, Math.min(opacity, 1));
            firstTextRef.current.style.opacity = opacity;
            if (opacity === 0) {
              // This section animates the entire

              let inc_opacity = window.scrollY / (window.innerHeight * 1) - 1;
              inc_opacity = Math.min(1, Math.max(inc_opacity, 0));
              introTextRef.current.style.opacity = inc_opacity;

              //this section animates the fade-in.
              if (window.scrollY > window.innerHeight * 1.5) {
                let img_opacity =
                  // starting point for the scroll
                  (window.scrollY - window.innerHeight * 1.5) /
                  (window.innerHeight * 0.45); // the scroll requirement.
                img_opacity = Math.min(1, Math.max(img_opacity, 0));
                imageDivRef.current.style.opacity = img_opacity;
              }

              //this section animated the zoom out of image.
              if (window.scrollY > window.innerHeight * 2) {
                const currentWidth =
                  imageDivRef.current.firstElementChild.offsetWidth;
                introTextRef.current.firstElementChild.style.display = "none";
                if (currentWidth + 1 <= 100) {
                  imageDivRef.current.firstElementChild.style.width = `${
                    currentWidth + 1
                  }px`;
                }
                if (currentWidth === 100) {
                  const text_currentWidth = textP_ref.current.offsetWidth;
                  if (text_currentWidth <= 300) {
                    textP_ref.current.style.width = `${
                      text_currentWidth + 2
                    }px`;
                  }
                }
              }
            }
          }
          window.addEventListener("scroll", blurControls);
          return () => {
            window.removeEventListener("scroll", blurControls);
          };
        }
      },
      {
        rootMargin: "-40% 0px 0px 0px",
        threshold: 0,
      },
    );
    firstTextObs.observe(firstTextRef.current);
    return () => {
      window.removeEventListener("load", loadEvent);
      window.removeEventListener("scroll", findDir);
      firstTextObs.unobserve(firstTextRef.current);
    };
  }, []);
  return (
    <div
      style={{
        height: "600vh",
        position: "relative",
        width: "100%",
        background: "#000000",
      }}
    >
      <p
        style={{
          fontSize: "2rem",
          color: "#fff",
          fontWeight: 600,
          top: "50vh",
          left: "50vw",
          width: "600px",
          textAlign: "center",
          transform: "translate(-50%,-50%)",
          position: "absolute",
          opacity: 1,
        }}
        ref={firstTextRef}
      >
        Want to increase your development process by 20x?
      </p>
      <div
        ref={introTextRef}
        style={{
          top: "50vh",
          left: "50vw",
          transform: "translate(-50%,-50%)",
          position: "fixed",
          opacity: 0,
        }}
      >
        <p
          style={{
            fontSize: "3rem",
            color: "#fff",
            fontWeight: 600,
            width: "600px",
            textAlign: "center",
          }}
        >
          Introducing
        </p>
        <div
          style={{
            opacity: 0,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: "-1",
            width: "max-content",
            gap: "1rem",
          }}
          ref={imageDivRef}
        >
          <img
            src={DashwaveLogo}
            alt="Dashwave"
            style={{
              width: "2rem",
            }}
          />
          <p
            style={{
              fontSize: "3.5rem",
              fontWeight: 600,
              color: "#fff",
              width: "0px",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
            ref={textP_ref}
          >
            Dashwave
          </p>
        </div>
      </div>
    </div>
  );
};
export default Exp2;
