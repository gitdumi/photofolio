import React, { useState } from "react";

export const withLoading = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  // eslint-disable-next-line react/display-name
  return (props: P) => {
    const [isLoading, setIsLoading] = useState(false);
    const [state, setState] = useState();

    if (isLoading) {
      return (
        <section className="flex-1 flex bg-base-100 text-primary ">
          <p className="m-auto flex gap-2 items-center text-xl">
            <span className="loading loading-ring loading-xl"></span>
            Loading...
          </p>
        </section>
      );
    }

    return (
      <WrappedComponent
        {...props}
        setIsLoading={setIsLoading}
        state={state}
        setState={setState}
      />
    );
  };
};
