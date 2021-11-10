import React, { FC } from "react";

interface ErrorProps {
  error: string | undefined;
}

export const Error: FC<ErrorProps> = ({ error }) => {
  return (
    <div className="error">
      <h3>Something went wrong! :(</h3>
      <p>{error}</p>
    </div>
  );
};
