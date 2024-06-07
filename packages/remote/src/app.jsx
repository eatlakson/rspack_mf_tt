import React from "react";

export function SayHello(props) {
  const [count, setCount] = React.useState(0);

  return (
    <div style={{ backgroundImage: "linear-gradient(to right, red , yellow)" }}>
      <h1>Hello from the Remote! {props.name}</h1>
      <button onClick={() => setCount((n) => n + 1)}>increment</button>
      <br />
      <button>Remote Button count: {count} </button>
    </div>
  );
}