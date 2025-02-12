import Label from "./Label";
import Input from "./Input";
import { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
  const { name, placeholder, children, htmlfor } = props;
  return (
    <div className="mb-6">
      <Label htmlfor={htmlfor}>{children}</Label>
      <Input
        name={name}
        type={name}
        placeholder={placeholder}
        id={name}
        ref={ref}
      ></Input>
    </div>
  );
});

export default Input;
