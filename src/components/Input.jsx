import { AnimatePresence } from "framer-motion";
import { useFormContext } from "react-hook-form";
// import { findInputError, isFormInvalid } from '../utils'
import cn from "classnames";
// import { findInputError, isFormInvalid } from '../utils'
// import { useFormContext } from 'react-hook-form'
import { motion } from "framer-motion";
import { MdError } from "react-icons/md";

const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
};

const InputError = ({ message }) => {
  return (
    <motion.p
      className="flex items-center gap-1 px-2 font-semibold text-red-500 bg-red-100 rounded-md"
      {...framer_error}
    >
      <MdError />
      {message}
    </motion.p>
  );
};

export const Input = (data) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const { label,  id, validation, name,...restData } = data
  const isFormInvalid = (err) => {
    if (Object.keys(err).length > 0) return true;
    return false;
  };
  function findInputError(errors, name) {
    const filtered = Object.keys(errors)
      .filter((key) => key.includes(name))
      .reduce((cur, key) => {
        return Object.assign(cur, { error: errors[key] });
      }, {});
    return filtered;
  }
  const inputError = findInputError(errors, name);
  const isInvalid = isFormInvalid(inputError);
  console.log(isInvalid, name, errors, inputError);
  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex justify-between">
        <label htmlFor={id} className="font-semibold capitalize">
          {label}
        </label>
        <AnimatePresence mode="wait" initial={false}>
          {isInvalid && (
            <InputError
              message={inputError.error.message}
              key={inputError.error.message}
            />
          )}
        </AnimatePresence>
      </div>
      <input
        className="w-full p-5 font-medium border rounded-md border-slate-300 placeholder:opacity-60"
        {...register(name, validation)}
        {...restData}
      />
    </div>
  );
};
