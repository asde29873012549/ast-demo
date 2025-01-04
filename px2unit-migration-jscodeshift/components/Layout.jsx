import { useEffect } from "react";
import { setInitialRemSize } from "@/styles/utils";

export default function Layout({ children }) {
  useEffect(() => {
    setInitialRemSize();
    window.addEventListener("resize", () => {
      setInitialRemSize();
    });

    return window.removeEventListener("resize", setInitialRemSize);
  }, []);

  return <>{children}</>;
}
