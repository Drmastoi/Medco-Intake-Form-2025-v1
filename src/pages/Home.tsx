
import React from "react";
import { MainNavigation } from "@/components/layout/MainNavigation";

const Home = () => {
  return (
    <>
      <MainNavigation />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Accident Assistant Pro
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Welcome to the digital platform for managing accident claims and medical assessments.
            </p>
          </div>
          
          <div className="mt-12 bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900">Getting Started</h2>
              <div className="mt-4 text-gray-700">
                <p>
                  This application helps streamline the process of documenting and assessing accident-related injuries.
                </p>
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <h3 className="text-md font-medium text-gray-900">Key Features:</h3>
                  <ul className="mt-3 list-disc list-inside text-gray-600 space-y-2">
                    <li>Simple and intuitive interface</li>
                    <li>Secure data handling</li>
                    <li>Comprehensive reporting tools</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
