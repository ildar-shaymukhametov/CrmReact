import React, { useState } from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { LoadingButton } from "../lib";

export { CompanyForm };

function CompanyForm({
  onSubmit,
  isLoading,
  initialState = {
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
  const [state, setState] = useState(initialState);

  function handleChange(event) {
    const {
      target: { name, value },
    } = event;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(state);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="type">Type</Label>
        <Input
          id="type"
          name="type"
          value={state.type}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={state.name}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="inn">Inn</Label>
        <Input id="inn" name="inn" value={state.inn} onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label for="address">Address</Label>
        <Input
          id="address"
          name="address"
          value={state.address}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="ceo">Ceo</Label>
        <Input id="ceo" name="ceo" value={state.ceo} onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label for="phone">Phone</Label>
        <Input
          id="phone"
          name="phone"
          value={state.phone}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          id="email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="contacts">Contacts</Label>
        <Input
          id="contacts"
          name="contacts"
          value={state.contacts}
          onChange={handleChange}
        />
      </FormGroup>
      <LoadingButton isLoading={isLoading}>Create new company</LoadingButton>
    </Form>
  );
}
