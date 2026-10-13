import React from 'react';
import PropTypes from 'prop-types';

import { UserIcon } from './Icons';

const Avatar = ({
  size,
  alt,
  className,
}) => {
  const avatar = (
    <UserIcon style={{ width: size, height: size }} role="img" aria-hidden focusable="false" />
  );

  return (
    <span
      style={{ height: size, width: size }}
      className={`avatar overflow-hidden d-inline-flex rounded-circle ${className}`}
      aria-label={alt || undefined}
    >
      {avatar}
    </span>
  );
};

Avatar.propTypes = {
  size: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
};

Avatar.defaultProps = {
  size: '2rem',
  alt: null,
  className: null,
};

export default Avatar;
