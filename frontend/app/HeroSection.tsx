import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

const HeroSection = () => {
  //   const stats = [
  //     { label: "Active Pipelines", value: "12" },
  //     { label: "Successful Deploys", value: "245" },
  //     { label: "Avg. Build Time", value: "9m" },
  //     { label: "Uptime", value: "99.9%" },
  //   ];
  const stats = [
    { label: "React Tests", value: "48/50", icon: "⚛️" },
    { label: "Nest.js APIs", value: "25", icon: "🔄" },
    { label: "DB Connections", value: "12", icon: "🗄️" },
    { label: "Response Time", value: "≤200ms", icon: "⚡" },
  ];
  return (
    <div className="relative  overflow-hidden">
      {/* Main Hero Content */}
      <div className="relative z-10 px-6 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full border mb-6">
                <span className="h-2 w-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                <span className="text-sm">All Systems Operational</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Streamline Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  MERN Stack Deployments
                </span>
              </h1>

              <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                Automated CI/CD pipeline for your MERN applications. Build,
                test, and deploy with confidence using our integrated DevOps
                platform.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="p-6 rounded-xl backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex flex-col items-center mb-4">
                    <div className="text-3xl mb-2">{stat.icon}</div>
                    <div className="text-3xl font-bold">{stat.value}</div>
                    <div className="text-gray-400 text-sm mt-1">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pipeline Visualization */}
      <div className="relative z-10 px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="p-6 rounded-2xl bg-gray-900/20 backdrop-blur-sm border border-gray-800">
            <h3 className="text-xl font-semibold text-center mb-6">
              Pipeline Flow
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-8">
              {["Code Push", "Build", "Test", "Deploy", "Monitor"].map(
                (step, index) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`p-4 rounded-full ${
                        index < 2
                          ? "bg-green-900/30 border border-green-500"
                          : "bg-gray-500 border border-gray-600"
                      }`}>
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center ${
                          index < 2 ? "bg-green-500" : "bg-gray-400"
                        }`}>
                        {index + 1}
                      </div>
                    </div>
                    <span className="ml-3 font-medium">{step}</span>
                    {index < 4 && (
                      <div
                        className={`h-1 w-16 mx-4 ${
                          index < 1 ? "bg-green-500" : "bg-gray-400"
                        }`}
                      />
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
