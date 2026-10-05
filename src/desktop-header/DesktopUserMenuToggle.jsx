import React from 'react';
import PropTypes from 'prop-types';
import { CaretIcon } from '../Icons';
import Avatar from '../Avatar';

const DesktopUserMenuToggle = ({ avatar, label }) => (
  <>
    <Avatar size="24px" src={avatar} alt="" />
  </>
);

export const DesktopUserMenuTogglePropTypes = {
  avatar: PropTypes.string,
  label: PropTypes.string,
};

DesktopUserMenuToggle.propTypes = DesktopUserMenuTogglePropTypes;

export default DesktopUserMenuToggle;
