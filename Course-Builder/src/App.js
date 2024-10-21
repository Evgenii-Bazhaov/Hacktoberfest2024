import React from "react";
import CourseBuilder from "./Pages/CourseBuilder";
import DataProvider from "./Providers/DataProvider";
import PrimaryLayout from "./Layouts/PrimaryLayout";

function App() {
  return (
    <div className="App">
      <DataProvider>
        <PrimaryLayout>
          <CourseBuilder />
        </PrimaryLayout>
      </DataProvider>
    </div>
  );
}

export default App;
