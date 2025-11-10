export default function GradientText({ children }) {
    return (
      <span
        className="text-4xl font-orbit bg-clip-text orbitron text-transparent"
        style={{
          backgroundImage: "linear-gradient(90deg, #ec4899, #8b5cf6, #06b6d4)",
          backgroundSize: "200% 200%",
          animation: "gradientMove 5s linear infinite",
        }}
      >
        {children}
        <style>
          {`
            @keyframes gradientMove {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `}
        </style>
      </span>
    );
  }
  