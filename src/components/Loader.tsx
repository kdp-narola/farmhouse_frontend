const FarmhouseLoader = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      {/* <div className="flex min-h-screen flex-col items-center justify-center bg-white"> */}
      {/* House */}
      <div className="relative mb-8 h-[120px] w-[120px]">
        <div className="absolute inset-0">
          {/* Roof */}
          <div
            className="absolute left-1/2 top-5 -translate-x-1/2 animate-roofPulse
            border-l-[50px] border-r-[50px] border-b-[40px]
            border-l-transparent border-r-transparent border-b-pink-500"
          ></div>

          {/* Base */}
          <div
            className="absolute bottom-5 left-1/2 h-[50px] w-[80px]
            -translate-x-1/2 rounded bg-emerald-400 animate-basePulse"
          ></div>

          {/* Door */}
          <div
            className="absolute bottom-0 left-1/2 h-[28px] w-[20px]
            -translate-x-1/2 rounded-t bg-amber-400 animate-doorPulse"
          ></div>

          {/* Windows */}
          <div
            className="absolute left-[25px] top-[50px] h-[15px] w-[15px]
            rounded bg-amber-400 animate-windowPulse"
          ></div>

          <div
            className="absolute right-[25px] top-[50px] h-[15px] w-[15px]
            rounded bg-amber-400 animate-windowPulse"
          ></div>
        </div>

        {/* Sparkles */}
        <span className="sparkle left-[20%] top-[10%]"></span>
        <span className="sparkle right-[15%] top-[30%] delay-[0.5s]"></span>
        <span className="sparkle left-[15%] bottom-[20%] delay-[1s]"></span>
        <span className="sparkle right-[20%] bottom-[35%] delay-[1.5s]"></span>
      </div>

      {/* Dots */}
      <div className="mb-5 flex gap-3">
        <span className="dot bg-emerald-400"></span>
        <span className="dot bg-pink-500 delay-[0.2s]"></span>
        <span className="dot bg-indigo-500 delay-[0.4s]"></span>
        <span className="dot bg-amber-400 delay-[0.6s]"></span>
      </div>

      {/* Text */}
      <p className="animate-textFade text-lg font-semibold tracking-widest text-gray-800">
        LOADING...
      </p>

      {/* Custom Animations */}
      <style>{`
        .sparkle {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 9999px;
          background: #6366f1;
          animation: sparkleFloat 2s ease-in-out infinite;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 9999px;
          animation: dotBounce 1.4s ease-in-out infinite;
        }

        @keyframes roofPulse {
          50% { transform: translateX(-50%) scale(1.1); opacity: 0.8; }
        }

        @keyframes basePulse {
          50% { transform: translateX(-50%) scale(1.05); opacity: 0.9; }
        }

        @keyframes doorPulse {
          50% { transform: translateX(-50%) scale(1.1); opacity: 0.8; }
        }

        @keyframes windowPulse {
          50% { transform: scale(1.2); opacity: 0.7; }
        }

        @keyframes dotBounce {
          50% { transform: translateY(-15px); }
        }

        @keyframes textFade {
          50% { opacity: 0.5; }
        }

        @keyframes sparkleFloat {
          0%,100% { opacity: 0; }
          50% { transform: translateY(-20px) scale(1.5); opacity: 1; }
        }

        .animate-roofPulse { animation: roofPulse 1.5s ease-in-out infinite; }
        .animate-basePulse { animation: basePulse 1.5s ease-in-out infinite 0.2s; }
        .animate-doorPulse { animation: doorPulse 1.5s ease-in-out infinite 0.4s; }
        .animate-windowPulse { animation: windowPulse 1.5s ease-in-out infinite 0.3s; }
        .animate-textFade { animation: textFade 1.5s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default FarmhouseLoader;
