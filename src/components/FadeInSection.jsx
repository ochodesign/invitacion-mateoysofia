import React, { useRef, useEffect, useState } from "react";

// Componente que aplica fade-in cuando entra en viewport
const FadeInSection = ({ children, className = "", ...props }) => {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16"} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
};

export default FadeInSection;
