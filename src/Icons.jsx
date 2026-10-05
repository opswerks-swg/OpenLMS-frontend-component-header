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
