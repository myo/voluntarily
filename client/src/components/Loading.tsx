import "./styles/Loading.scss";

function Loading({zIndex, text}: {zIndex: number, text: string}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        zIndex: zIndex || 1,
      }}
    >
      <div
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-20px, -20px)",
          position: "absolute",
        }}
      >
        <div style={{ position: "relative" }}>
          <svg className="circle-loader" width="40" height="40">
            <circle cx="20" cy="20" r="15" />
          </svg>
          <svg className="circle-loader2" width="40" height="40">
            <circle cx="20" cy="20" r="15" />
          </svg>
        </div>
        <div style={{ position: "relative", top: 50, left: -15 }}>
          {text}
        </div>
      </div>
    </div>
  );
}
export default Loading;
