import * as React from "react";
import PropTypes from "prop-types";
import { FormControl, useFormControlContext } from "@mui/base/FormControl";
import { Input } from "@mui/base/Input";
import clsx from "clsx";
import "./TextType.css";

export default function TextType() {
  return (
    <div>
      <FormControl required>
        <Label>Answer preview:</Label>
        <Input
          placeholder='Short answer'
          slotProps={{
            input: {
              className: clsx(
                "w-full text-sm font-normal font-sans leading-normal text-slate-900 bg-white border border-solid border-slate-200 px-3 py-2 rounded-lg hover:bg-slate-100 hover:border-slate-400 focus:outline-0 focus:shadow-outline-purple"
              ),
            },
          }}
        />
        <HelperText />
      </FormControl>
    </div>
  );
}

const Label = React.forwardRef(
  ({ className: classNameProp, children }, ref) => {
    const formControlContext = useFormControlContext();
    const [dirty, setDirty] = React.useState(false);

    React.useEffect(() => {
      if (formControlContext?.filled) {
        setDirty(true);
      }
    }, [formControlContext]);

    if (formControlContext === undefined) {
      return <p className={clsx("text-sm mb-1", classNameProp)}>{children}</p>;
    }

    const { error, required, filled } = formControlContext;
    const showRequiredError = dirty && required && !filled;

    return (
      <p
        ref={ref}
        className={clsx(
          "text-sm mb-1",
          classNameProp,
          error || showRequiredError ? "invalid text-red-500" : ""
        )}
      >
        {children}
        {required ? " *" : ""}
      </p>
    );
  }
);

const HelperText = React.forwardRef((props, ref) => {
  const { className, ...other } = props;
  const formControlContext = useFormControlContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return null;
  }

  const { required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return showRequiredError ? (
    <p ref={ref} className={clsx("text-sm", className)} {...other}>
      <span className='text-red-500'>Error text</span>
    </p>
  ) : null;
});

HelperText.propTypes = {
  className: PropTypes.string,
};
