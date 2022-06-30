import React from "react";
import { Button, Spinner } from "reactstrap";

export { LoadingButton };

function LoadingButton({ onClick, children, isLoading, ...props }) {
  return (
    <Button {...props} onClick={onClick} disabled={isLoading}>
      {isLoading ? <Spinner>Loading...</Spinner> : children}
    </Button>
  );
}
