import { useDispatch } from "react-redux";
import { ActionCreator } from "@reduxjs/toolkit";

const Kakao = (props) => {
  const dispatch = useDispatch();
  const code = new URL(window.location.href).searchParams.get("code");
};
