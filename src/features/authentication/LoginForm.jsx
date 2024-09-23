import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import useLogin from "../authentication/useLogin.js";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm() {
  const [email, setEmail] = useState("saif@gmail.com");
  const [password, setPassword] = useState("7439966193");
  const { login, isLogin } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;

    login({ email, password });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button disabled={isLogin} size="large">
          {isLogin ? <SpinnerMini /> : "Login"}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
