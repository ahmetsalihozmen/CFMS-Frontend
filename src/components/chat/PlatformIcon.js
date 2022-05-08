import React from "react";

const platformIcons = [
  "/img/facebook.png",
  "/img/question-mark.png",
  "/img/instagram.png",
  "/img/twitter.png",
  "/img/telegram.png",
];

export default function PlatformIcon({ platform, size }) {
  if (!size) size = 48;
  if (platform < 0 || platform >= platformIcons.length) platform = 1;
  const image = platformIcons[platform];

  return <img src={image} width={size} className="rounded-circle" />;
}
