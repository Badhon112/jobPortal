import React, { Suspense } from "react";
import HeroSection from "./HeroSection";

const page = () => {
  return (
    <Suspense fallback="Loading...">
      <section className="">
        <HeroSection />
        <div className="max-w-7xl mx-auto">
          {/* Your other modules/components will go here */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="p-6 rounded-xl bg-gray-900/50 border border-gray-800">
              <h3 className="text-lg font-semibold mb-3">
                Module 1: Code Repository
              </h3>
              <p className="text-gray-400">Connect your GitHub/GitLab repos</p>
            </div>
            <div className="p-6 rounded-xl bg-gray-900/50 border border-gray-800">
              <h3 className="text-lg font-semibold mb-3">
                Module 2: Build Pipeline
              </h3>
              <p className="text-gray-400">Automated build and testing</p>
            </div>
            <div className="p-6 rounded-xl bg-gray-900/50 border border-gray-800">
              <h3 className="text-lg font-semibold mb-3">
                Module 3: Deployment
              </h3>
              <p className="text-gray-400">Deploy to staging/production</p>
            </div>
          </div>
        </div>
      </section>
    </Suspense>
  );
};

export default page;
