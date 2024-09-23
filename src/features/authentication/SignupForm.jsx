import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSignup from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();
  const { isSignup, signup } = useSignup();

  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        onSettled: () => reset(),
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          disabled={isSignup}
          type="text"
          id="fullName"
          name="fullName"
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          disabled={isSignup}
          type="email"
          id="email"
          name="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          disabled={isSignup}
          type="password"
          id="password"
          name="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          disabled={isSignup}
          type="password"
          id="passwordConfirm"
          name="repeatPassword"
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) => {
              value === getValues().password || "Passwords needs to match";
            },
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button disabled={isSignup} variation="secondary" type="reset">
          Cancel
        </Button>

        <Button disabled={isSignup}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
