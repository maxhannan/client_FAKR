import { useState } from 'react';

export const useForm = (callback, initalState = {}) => {
  const [values, setValues] = useState(initalState);

  const handleChange = e => {
    console.log(e.target.name);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    callback();
  };

  return {
    handleChange,
    onSubmit,
    values,
  };
};
