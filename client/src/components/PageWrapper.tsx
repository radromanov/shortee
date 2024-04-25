import React from "react";

interface Props {
  children: React.ReactNode;
}

const PageWrapper = ({ children }: Props) => {
  return (
    <div className="flex flex-col relative gap-2 justify-center items-center w-screen h-screen">
      {children}
    </div>
  );
};

export default PageWrapper;
