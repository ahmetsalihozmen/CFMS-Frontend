import { useState } from "react";

const useInputHandling = defaultValue => {
  const [inputs, setInputs] = useState(defaultValue ? defaultValue : null);

  const handleInputChange = event => {
    const { name, value } = event.currentTarget;
    setInputs({ ...inputs, [name]: value });
  };

  return [inputs, handleInputChange, setInputs];
};

export default useInputHandling;
