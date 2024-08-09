import img1 from "../../assets/img.png";
import img2 from "../../assets/img_1.png";
import img3 from "../../assets/img_2.png";
import PyCharm from "../assets/pycharm.svg";
import "./index.css";
import { useEffect, useRef } from "react";
const Exp1 = () => {
  const mainRef = useRef(null);
  const imageRef = useRef(null);
  const lastElement = useRef(null);
  const firstRef = useRef(null);
  let mainElementInView = false;
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
                marginLeft: "50px",
                marginTop: "50px",
              }}
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
                <img src={PyCharm} />
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
                marginLeft: "50px",
                marginTop: "50px",
              }}
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
                marginLeft: "50px",
                marginTop: "50px",
              }}
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
                marginLeft: "50px",
                marginTop: "50px",
              }}
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
