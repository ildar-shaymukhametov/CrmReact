import React from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { LoadingButton } from "../lib";
import { useFormik } from "formik";

export { CompanyForm };

function CompanyForm({
  onSubmit,
  isLoading,
  initialValues = {
    type: "",
    name: "",
    address: "",
    phone: "",
    email: "",
    contacts: "",
    ceo: "",
    inn: "",
  },
}) {
  const { handleSubmit, handleChange, values } = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="type">Type</Label>
        <Input
          id="type"
          name="type"
          value={values.type}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="inn">Inn</Label>
        <Input id="inn" name="inn" value={values.inn} onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label for="address">Address</Label>
        <Input
          id="address"
          name="address"
          value={values.address}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="ceo">Ceo</Label>
        <Input id="ceo" name="ceo" value={values.ceo} onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label for="phone">Phone</Label>
        <Input
          id="phone"
          name="phone"
          value={values.phone}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="contacts">Contacts</Label>
        <Input
          id="contacts"
          name="contacts"
          value={values.contacts}
          onChange={handleChange}
        />
      </FormGroup>
      <LoadingButton type="submit" isLoading={isLoading}>
        Create new company
      </LoadingButton>
    </Form>
  );
}
