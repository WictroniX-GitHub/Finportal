import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { gsap } from "gsap";

const NumberAnimation = ({ initialValue, finalValue }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  const numberRef = useRef(null);

  useEffect(() => {
    if (inView) {
      gsap.to(numberRef.current, {
        duration: 2,
        innerHTML: finalValue,
        ease: "power2.out",
        roundProps: { innerHTML: 1 },
      });
    }
  }, [inView, finalValue]);

  return (
    <div className="number-container" ref={ref}>
      <span className="number" data-value={finalValue} ref={numberRef}>
        {initialValue}
      </span>
    </div>
  );
};

export default NumberAnimation;
