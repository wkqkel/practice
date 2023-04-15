import React from "react";

import Lottie from "react-lottie-player";

import lottieJson from "public/cookie-man.json";

export default function CookieMan() {
  return <Lottie loop animationData={lottieJson} play />;
}
