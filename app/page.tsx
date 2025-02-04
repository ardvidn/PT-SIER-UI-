"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useMemo } from "react";

// const DynamicMap = dynamic(() => import("../components/Map"), {
//   loading: () => <p>A map is loading</p>,
//   ssr: false,
// });

export default function Home() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );
  return (
    <>
      <div>
        <Map />
      </div>
    </>
  );
}
