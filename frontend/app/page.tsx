import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import React, { Suspense } from "react";

const page = () => {
  return (
    <>
      <Suspense fallback="Loading...">
        <Navbar />
      </Suspense>
    </>
  );
};

export default page;
