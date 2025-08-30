export default function UnsubscribedPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        fontFamily: "sans-serif",
      }}
    >
      <h1>You have been unsubscribed :(</h1>
      <p style={{ marginTop: "10px", fontSize: "16px" }}>
        We're sorry to see you go. You won't receive daily motivation emails anymore.
      </p>
    </div>
  );
}
