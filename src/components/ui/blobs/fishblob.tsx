const FishBlob = () => {
  return (
    <div className="absolute top-[50px] -z-10 w-[500px] max-w-[90%] overflow-hidden overflow-x-hidden opacity-20 blur-3xl">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="fishGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "hsl(var(--fish-foreground" }}
            />
            <stop offset="100%" style={{ stopColor: "hsl(var(--fish))" }} />
          </linearGradient>
        </defs>
        <path
          fill="url(#fishGradient)"
          d="M55.8,-63.8C69.8,-54.7,77,-34.8,78.6,-15.4C80.1,4,76.1,22.8,65.7,35.2C55.3,47.6,38.5,53.6,21.7,59.7C5,65.8,-11.7,72,-28.6,69.7C-45.5,67.4,-62.5,56.7,-68.4,41.8C-74.2,26.9,-68.9,7.8,-61.7,-7C-54.5,-21.9,-45.4,-32.5,-34.8,-42.2C-24.2,-51.9,-12.1,-60.5,4.4,-65.8C20.9,-71,41.8,-72.8,55.8,-63.8Z"
          transform="translate(100 100)"
        />
      </svg>
    </div>
  );
};

export default FishBlob;
