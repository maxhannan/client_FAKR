import { useState } from 'react';

export const useForm = (callback, initalState = {}) => {
  const [values, setValues] = useState(initalState);

  const handleChange = e => {
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
