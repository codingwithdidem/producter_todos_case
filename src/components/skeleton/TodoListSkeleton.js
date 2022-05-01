import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CheckBoxSkeleton = () => <Skeleton width={30} height={30} />;

const TodoListSkeleton = () => {
  return [...Array(6)].map((_, i) => (
    <SkeletonTheme key={i} enableAnimation baseColor="#ccc">
      <div className="mb-3 flex items-start space-x-3">
        <CheckBoxSkeleton />
        <Skeleton containerClassName="flex-grow-1" count={2} />
      </div>
    </SkeletonTheme>
  ));
};

export default TodoListSkeleton;
