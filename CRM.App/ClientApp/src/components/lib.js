import React from "react";
import { Button, Input, Label, Spinner } from "reactstrap";
import { useField } from "formik";

export { LoadingButton, FormInput };

function LoadingButton({ onClick, children, isLoading, ...props }) {
  return (
    <Button {...props} onClick={onClick} disabled={isLoading}>
      {isLoading ? <Spinner>Loading...</Spinner> : children}
    </Button>
  );
}

function FormInput({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <>
      <Label for={props.id || props.name}>{label}</Label>
      <Input {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
}
