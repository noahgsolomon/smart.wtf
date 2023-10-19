const BrainBlob = () => {
  return (
    <div className="absolute top-[50px] -z-10 w-[500px] max-w-[90%] overflow-hidden overflow-x-hidden opacity-20 blur-3xl">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient
            id="brainGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              style={{ stopColor: "hsl(var(--brain-foreground))" }}
            />
            <stop offset="100%" style={{ stopColor: "hsl(var(--brain))" }} />
          </linearGradient>
        </defs>
        <path
          fill="url(#brainGradient)"
          d="M32.2,-46.6C46.2,-47.6,65.3,-48.1,72.1,-40.3C78.9,-32.4,73.4,-16.2,73.2,-0.1C73.1,16.1,78.3,32.1,70,37.5C61.8,42.9,40.2,37.6,26.3,44.2C12.4,50.8,6.2,69.3,-1.8,72.5C-9.9,75.7,-19.8,63.5,-30.1,54.8C-40.4,46.1,-51.2,41,-53.8,32.4C-56.5,23.9,-50.9,11.9,-44.2,3.9C-37.5,-4.1,-29.5,-8.3,-26,-15.3C-22.5,-22.3,-23.4,-32.2,-19.8,-37.3C-16.2,-42.3,-8.1,-42.5,0.5,-43.4C9.1,-44.2,18.1,-45.6,32.2,-46.6Z"
          transform="translate(100 100)"
        />
      </svg>
    </div>
  );
};

export default BrainBlob;
