import React, { useContext } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { dataContext } from "../Providers/DataProvider";
import NotFound from "../Components/NotFound";
import ResourceContainer from "../Components/ListContainers/ResourcesContainer";
import ModulesContainer from "../Components/ListContainers/ModulesContainer";

const CourseBuilder = () => {
  const {onDragEnd, resources, modules} = useContext(dataContext);

  const hasContent = modules.length > 0 || resources.length > 0;

  return (
    <div className="w-full">
      {!hasContent ? (
        <NotFound />
      ) : (
        <>
          <DragDropContext onDragEnd={onDragEnd}>
            <ModulesContainer />
            <ResourceContainer />
          </DragDropContext>
        </>
      )}
    </div>
  );
};

export default CourseBuilder;
