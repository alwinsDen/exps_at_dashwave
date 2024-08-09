import img1 from "../../assets/img.png";
import img2 from "../../assets/img_1.png";
import img3 from "../../assets/img_2.png";
import PyCharm from "../assets/pycharm.svg";
import Rider from "../assets/rider.gif";
import Idea from "../assets/idea.svg";
import "./index.css";
import { useEffect, useRef } from "react";
const Exp1 = () => {
  const mainRef = useRef(null);
  const imageRef = useRef(null);
  const lastElement = useRef(null);
  const firstRef = useRef(null);
  let mainElementInView = false;

  // here is the list of all text elemental refs
  const textElement1 = useRef(null);
  const textElement2 = useRef(null);
  const textElement3 = useRef(null);
  const textElement4 = useRef(null);
  const elementalControl = {
    textElement1: PyCharm,
    textElement2: Rider,
    textElement3: Idea,
    textElement4: Rider,
  };
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrollDirection = "down";
    let loaded = false;
    window.addEventListener("scroll", () => {
      scrollDirection = window.scrollY > lastScrollY ? "down" : "up";
      lastScrollY = window.scrollY;
    });
    window.addEventListener("load", () => {
      loaded = true;
    });
    const allElnts = [textElement1, textElement2, textElement3, textElement4];
    // Observer to watch the Text Elements
    const textElObserver = new IntersectionObserver(
      ([entry]) => {
        if (!loaded) return;
        console.log("THIS IS THE ELEMTN ID", entry.target.id);
        imageRef.current.querySelector("img").src =
          elementalControl[entry.target.id];
      },
      {
        threshold: 1,
      },
    );
    allElnts.forEach((elms) => {
      textElObserver.observe(elms.current);
    });
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!loaded) return;
        if (entry.isIntersecting) {
          imageRef.current.style.position = "";
        }
        if (entry.isIntersecting === false && scrollDirection === "down") {
          console.log("scrolled out of view");
          imageRef.current.style.position = "fixed";
          imageRef.current.style.top = "100px";
          mainElementInView = false;
        }
        if (entry.isIntersecting === true && scrollDirection === "up") {
          console.log("scrolled into view");
          mainElementInView = true;
          imageRef.current.style.position = "relative";
          imageRef.current.style.top = "";
          firstRef.current.appendChild(imageRef.current);
        }
      },
      {
        threshold: 0,
      },
    );
    observer.observe(mainRef.current);
    // last element observer. this will observe the last element.
    const lastObserver = new IntersectionObserver(
      ([entry]) => {
        if (!loaded) return;
        if (entry.isIntersecting) {
          window.addEventListener("scroll", () => {
            if (window.scrollY < 4200 && scrollDirection === "up") {
              if (mainElementInView === false) {
                imageRef.current.style.position = "fixed";
                imageRef.current.style.top = "100px";
              }
            }
            if (window.scrollY > 4200) {
              imageRef.current.style.position = "";
              lastElement.current.appendChild(imageRef.current);
            }
          });
        }
      },
      {
        // root: null,
        rootMargin: "0px 0px 0px 0px",
        threshold: 1,
      },
    );
    lastObserver.observe(lastElement.current);
    return () => {
      window.removeEventListener("scroll", () => {
        scrollDirection = window.scrollY > lastScrollY ? "down" : "up";
        lastScrollY = window.scrollY;
      });
      window.removeEventListener("scroll", () => {
        if (window.scrollY < 4200 && scrollDirection === "up") {
          if (mainElementInView === false) {
            imageRef.current.style.position = "fixed";
            imageRef.current.style.top = "100px";
          }
        }
        if (window.scrollY > 4200) {
          imageRef.current.style.position = "";
          lastElement.current.appendChild(imageRef.current);
        }
      });
      window.removeEventListener("load", () => {
        loaded = true;
      });
      observer.unobserve(mainRef.current);
      lastObserver.unobserve(lastElement.current);
    };
  }, []);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        background: "#000000",
      }}
    >
      <img src={img1} />
      <img src={img2} />
      <img src={img3} />
      <div
        style={{
          color: "#ffffff",
          margin: "30px 0",
          width: "1650px",
          display: "flex",
          flexDirection: "column",
          gap: "100px",
        }}
      >
        <p
          style={{
            fontSize: "48px",
            fontWeight: 600,
            marginLeft: "100px",
          }}
          ref={mainRef}
        >
          Trusted by more than 11.4M developers
        </p>

        {/*This is the major text section.*/}
        <div>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "5rem" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                width: "500px",
                marginTop: "50px",
              }}
              id={"textElement1"}
              ref={textElement1}
            >
              <p style={{ fontSize: "38px", fontWeight: 600 }}>
                Ready for actual use right out of the box
              </p>
              <p style={{ fontSize: "22px" }}>
                Mission-critical tools and a wide variety of supported languages
                and frameworks are at your fingertips – no plugin hassle
                included.
              </p>
            </div>
            <div style={{ width: "750px", height: "510px" }} ref={firstRef}>
              <div
                ref={imageRef}
                style={{
                  width: "750px",
                  height: "510px",
                  position: "relative",
                }}
              >
                <img src={PyCharm} height={"100%"} />
              </div>
            </div>
          </div>

          {/*This is the 2nd major text section.*/}
          <div
            style={{ display: "flex", justifyContent: "center", gap: "5rem" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                width: "500px",
                marginTop: "50px",
              }}
              id={"textElement2"}
              ref={textElement2}
            >
              <p style={{ fontSize: "38px", fontWeight: 600 }}>
                Complex tasks become easy
              </p>
              <p style={{ fontSize: "22px" }}>
                The IDE knows everything about your code and uses this knowledge
                to offer blazing-fast navigation and relevant suggestions in
                every context.
              </p>
            </div>
            <div style={{ width: "750px", height: "510px" }}></div>
          </div>

          {/*This is the 3rd major text section.*/}
          <div
            style={{ display: "flex", justifyContent: "center", gap: "5rem" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                width: "500px",
                marginTop: "50px",
              }}
              id={"textElement3"}
              ref={textElement3}
            >
              <p style={{ fontSize: "38px", fontWeight: 600 }}>
                Customizable and extendable
              </p>
              <p style={{ fontSize: "22px" }}>
                Your IDE is ready to be configured to match your taste and
                preferences and help you stay in the zone during all your coding
                sessions.
              </p>
            </div>
            <div style={{ width: "750px", height: "510px" }}></div>
          </div>

          {/*This is the 2nd major text section.*/}
          <div
            style={{ display: "flex", justifyContent: "center", gap: "5rem" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                width: "500px",
                marginTop: "50px",
              }}
              id={"textElement4"}
              ref={textElement4}
            >
              <p style={{ fontSize: "38px", fontWeight: 600 }}>
                Built-in tools
              </p>
              <p style={{ fontSize: "22px" }}>
                Run, debug, and test your applications without leaving the IDE
                and the code view. All important tools are within a hand’s
                reach.
              </p>
            </div>
            <div
              ref={lastElement}
              style={{ width: "750px", height: "510px" }}
            ></div>
          </div>
        </div>
      </div>
      <img src={img1} />
      <img src={img2} />
      <img src={img3} />
    </div>
  );
};
export default Exp1;
