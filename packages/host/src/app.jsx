import React from "react";
import { SayHello } from "@mf/remote";

export default function HostApp(props) {
  return (
    <>
      <h1>{props?.name || "HOST app"}</h1>
      <div style={{ border: "1px solid blue" }}>
        <SayHello name="props_from_host" />
      </div>
    </>
  );
}
