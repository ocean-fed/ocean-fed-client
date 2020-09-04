import React from "react";
import "./GuestInfo.scss";

export interface IGuestInfo {
  name: string | undefined;
  email: string | undefined;
  phone: string | undefined;
}

export default function GuestInfo(props: IGuestInfo) {
  return (
    <ul>
      <li>{props.name}</li>
      <li>{props.email}</li>
      <li>{props.phone ? props.phone : null}</li>
    </ul>
  );
}
