import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Section = (props) => {
  const { children } = props;

  return (
    <section
      className={`
  h-screen w-screen p-8 max-w-screen-2xl mx-auto
  flex flex-col items-start justify-center
  `}>
      {children}
    </section>
  );
};

const Clouds = () => {
  useEffect(() => {
    gsap.set(".cloud1", { y: 100 });
    gsap.set(".cloud2", { y: -150 });
    gsap.set(".cloud3", { y: -50 });
    gsap.set(".mountain", { y: 200 });
    gsap.set(".mountBg", { y: 300 }); // Added mountBg animation setup
    gsap.set(".mountFg", { y: 100 }); // Added mountFg animation setup
    gsap.set(".sky", { y: 0 }); // Added sky animation setup

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".scroll-container",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      })
      .fromTo(".cloud1", { y: 100 }, { y: -800 }, 0)
      .fromTo(".cloud2", { y: -150 }, { y: -500 }, 0)
      .fromTo(".cloud3", { y: -50 }, { y: -650 }, 0)
      .fromTo(".mountain", { y: 200 }, { y: -300 }, 0)
      .fromTo(".mountBg", { y: 300 }, { y: -200 }, 0) // Added mountBg animation
      .fromTo(".mountFg", { y: 100 }, { y: -100 }, 0); // Added mountFg animation
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden scroll-container">
      {/* Added mountBg image */}
      <img
        src="https://assets.codepen.io/721952/cloud1.png"
        alt="Cloud 1"
        className="absolute top-10 left-0 w-full cloud1"
      />
      <img
        src="https://assets.codepen.io/721952/cloud2.png"
        alt="Cloud 2"
        className="absolute bottom-28 right-0 w-full cloud2"
      />
      <img
        src="https://assets.codepen.io/721952/cloud3.png"
        alt="Cloud 3"
        className="absolute bottom-12 left-0 w-full cloud3"
      />
      <img
        src="https://assets.codepen.io/721952/mountMg.png"
        alt="Mountain Middle Ground"
        className="absolute bottom-24 left-0 w-full mountain"
      />
      <img
        src="https://assets.codepen.io/721952/mountFg.png"
        alt="Mountain Foreground"
        className="absolute bottom-96 right-0 w-full mountFg"
      />{" "}
      {/* Added mountFg image */}
    </div>
  );
};

export const Interface = () => {
  return (
    <div className="relative flex flex-col items-center w-screen">
      <EmptyScreen />
      <EmptyScreen />
      <EmptyScreen />
      <EmptyScreen />
      <EmptyScreen />
      <EmptyScreen />
      <EmptyScreen />
      <EmptyScreen />
      <EmptyScreen />
      <EmptyScreen />
      <EmptyScreen />
      <EmptyScreen />
      <EmptyScreen />
      <EmptyScreen />
      <EmptyScreen />
      <EmptyScreen />
      <EmptyScreen />
      <EmptyScreen />
      <EmptyScreen />
      <EmptyScreen />
      <ContactSection />
    </div>
  );
};

const EmptyScreen = () => {
  return <Section></Section>;
};

const ContactSection = () => {
  return (
    <Section>
      <Clouds />
    </Section>
  );
};

export default Interface;
