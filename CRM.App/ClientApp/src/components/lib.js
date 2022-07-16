import React from "react";
import { Button, FormFeedback, Input, Label, Spinner } from "reactstrap";
import { useField } from "formik";

export { LoadingButton, FormInput };

function LoadingButton({ onClick, children, isLoading, ...props }) {
  return (
    <Button
      {...props}
      onClick={onClick}
      disabled={isLoading}
      className="d-flex align-items-center"
    >
      {isLoading ? <Spinner className="me-2">Loading...</Spinner> : null}
      {children}
    </Button>
  );
}

function FormInput({ label, ...props }) {
  const [field, meta] = useField(props);
  const invalid = meta.touched && Boolean(meta.error);
  const valid = meta.touched && !Boolean(meta.error) && Boolean(meta.value);
  return (
    <>
      <Label for={props.id || props.name}>{label}</Label>
      <Input {...field} {...props} invalid={invalid} valid={valid} />
      {invalid ? <FormFeedback>{meta.error}</FormFeedback> : null}
    </>
  );
}
