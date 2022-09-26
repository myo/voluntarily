import "./styles/Loading.scss";

function Loading({zIndex=1, text, opacity=0.2, width="100%", height="100%"}: {zIndex?: number, text: string, opacity?: number, width?: string, height?:string}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        backgroundColor: "rgba(0, 0, 0, " + opacity + ")",
        zIndex: zIndex,
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
