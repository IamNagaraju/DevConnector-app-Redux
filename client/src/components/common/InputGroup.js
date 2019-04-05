import React from 'react';
import classnames from 'classnames';

const InputGroup = ({
  name,
  placeholder,
  value,
  error,
  info,
  onChange,
  icon,
  type,
}) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon} />
        </span>
      </div>
      <textarea
        className={classnames('form-control form-control-lg', {
          'is-invalid': error,
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

InputGroup.defaultProps = {
  type: 'text',
};

export default InputGroup;
