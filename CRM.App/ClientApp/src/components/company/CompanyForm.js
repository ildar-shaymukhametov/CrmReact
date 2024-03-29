import React from "react";
import { Form, FormGroup } from "reactstrap";
import { FormInput, LoadingButton } from "../lib";
import { Formik } from "formik";
import * as Yup from "yup";

export { CompanyForm };

const validationSchema = Yup.object({
  name: Yup.string().required().max(200),
  email: Yup.string().email(),
  inn: Yup.string().matches(/^\d{10}$/),
});

function CompanyForm({
  onSubmit,
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
  submitButtonText,
  isSubmitting,
}) {
  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <FormInput label="Type" id="type" name="type" />
          </FormGroup>
          <FormGroup>
            <FormInput label="Name" id="name" name="name" />
          </FormGroup>
          <FormGroup>
            <FormInput label="Inn" id="inn" name="inn" />
          </FormGroup>
          <FormGroup>
            <FormInput label="Address" id="address" name="address" />
          </FormGroup>
          <FormGroup>
            <FormInput label="Ceo" id="ceo" name="ceo" />
          </FormGroup>
          <FormGroup>
            <FormInput label="Phone" id="phone" name="phone" />
          </FormGroup>
          <FormGroup>
            <FormInput label="Email" id="email" name="email" />
          </FormGroup>
          <FormGroup>
            <FormInput label="Contacts" id="contacts" name="contacts" />
          </FormGroup>
          <div className="d-flex justify-content-end">
            <LoadingButton
              color="success"
              type="submit"
              isLoading={isSubmitting}
            >
              {submitButtonText}
            </LoadingButton>
          </div>
        </Form>
      )}
    </Formik>
  );
}
