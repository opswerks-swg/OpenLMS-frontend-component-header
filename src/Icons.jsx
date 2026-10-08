import React from 'react';

export const MenuIcon = (props) => (
  <svg
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    version="1.1"
    {...props}
  >
    <rect fill="currentColor" x="2" y="5" width="20" height="2" />
    <rect fill="currentColor" x="2" y="11" width="20" height="2" />
    <rect fill="currentColor" x="2" y="17" width="20" height="2" />
  </svg>
);

export const AvatarIcon = (props) => (
  <svg
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    version="1.1"
    {...props}
  >
    <path
      d="M4.10255106,18.1351061 C4.7170266,16.0581859 8.01891846,14.4720277 12,14.4720277 C15.9810815,14.4720277 19.2829734,16.0581859 19.8974489,18.1351061 C21.215206,16.4412566 22,14.3122775 22,12 C22,6.4771525 17.5228475,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,14.3122775 2.78479405,16.4412566 4.10255106,18.1351061 Z M12,24 C5.372583,24 0,18.627417 0,12 C0,5.372583 5.372583,0 12,0 C18.627417,0 24,5.372583 24,12 C24,18.627417 18.627417,24 12,24 Z M12,13 C9.790861,13 8,11.209139 8,9 C8,6.790861 9.790861,5 12,5 C14.209139,5 16,6.790861 16,9 C16,11.209139 14.209139,13 12,13 Z"
      fill="currentColor"
    />
  </svg>
);

// Profile icon (Tabler "user", 1.33 stroke) used by the account menu toggle.
// Same path as the LMS navbar's header/user_dropdown.html (tutor-indigo).
export const UserIcon = (props) => (
  <svg
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M6 21V19C6 17.9391 6.42143 16.9217 7.17157 16.1716C7.92172 15.4214 8.93913 15 10 15H14C15.0609 15 16.0783 15.4214 16.8284 16.1716C17.5786 16.9217 18 17.9391 18 19V21M8 7C8 8.06087 8.42143 9.07828 9.17157 9.82843C9.92172 10.5786 10.9391 11 12 11C13.0609 11 14.0783 10.5786 14.8284 9.82843C15.5786 9.07828 16 8.06087 16 7C16 5.93913 15.5786 4.92172 14.8284 4.17157C14.0783 3.42143 13.0609 3 12 3C10.9391 3 9.92172 3.42143 9.17157 4.17157C8.42143 4.92172 8 5.93913 8 7Z"
      stroke="currentColor"
      strokeWidth="1.33"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Help menu icon (OpenLMS Figma, 1.33 stroke). Same paths as the LMS navbar's
// header/navbar-authenticated.html HELP_SVG (tutor-indigo).
export const HelpIcon = (props) => (
  <svg
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.33"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M19.875 6.27008C20.575 6.66808 21.005 7.41308 21 8.21808V15.5021C21 16.3111 20.557 17.0571 19.842 17.4501L13.092 21.7201C12.7574 21.9038 12.3818 22.0001 12 22.0001C11.6182 22.0001 11.2426 21.9038 10.908 21.7201L4.158 17.4501C3.80817 17.2589 3.51612 16.9772 3.31241 16.6346C3.1087 16.2919 3.0008 15.9007 3 15.5021V8.21708C3 7.40808 3.443 6.66308 4.158 6.27008L10.908 2.29008C11.2525 2.10011 11.6396 2.00049 12.033 2.00049C12.4264 2.00049 12.8135 2.10011 13.158 2.29008L19.908 6.27008H19.875Z" />
    <path d="M12 16V16.01" />
    <path d="M12 12.9998C12.4497 13.0011 12.8868 12.8508 13.2407 12.5732C13.5945 12.2956 13.8444 11.9068 13.95 11.4696C14.0557 11.0324 14.0109 10.5724 13.8229 10.1638C13.6349 9.75524 13.3147 9.42195 12.914 9.21776C12.5162 9.01397 12.0611 8.95079 11.6228 9.03848C11.1845 9.12618 10.7888 9.3596 10.5 9.70076" />
  </svg>
);

export const CaretIcon = (props) => (
  <svg
    width="16px"
    height="16px"
    viewBox="0 0 16 16"
    version="1.1"
    {...props}
  >
    <path
      d="M7,4 L7,8 L11,8 L11,10 L5,10 L5,4 L7,4 Z"
      fill="currentColor"
      transform="translate(8.000000, 7.000000) rotate(-45.000000) translate(-8.000000, -7.000000) "
    />
  </svg>
);
