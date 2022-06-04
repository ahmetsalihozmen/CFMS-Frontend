import React, { useEffect } from "react";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) router.push("/login");
    else router.push("/chat");
  }, []);

  return <></>;
}
