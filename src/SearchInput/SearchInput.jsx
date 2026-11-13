import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

// PRD LMS 6.1: Alt+/ (Option+/ on macOS) focuses the search bar from any page.
// event.code, not event.key: macOS reports Option+/ as "÷".
const isAltSlash = (event) => {
  const alt = event.altKey || event.getModifierState?.('Alt');
  if (!alt || event.ctrlKey || event.metaKey || event.shiftKey) {
    return false;
  }
  return event.code === 'Slash' || event.key === '/' || event.key === '÷';
};

const SearchInput = ({ label, catalogUrl, toLmsUrl }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isAltSlash(event)) {
        return;
      }
      const input = inputRef.current;
      if (!input) {
        return;
      }
      // Modifier chord, so it still moves focus when another field is active.
      event.preventDefault();
      input.focus();
    };
    document.addEventListener('keydown', handleKeyDown, true);
    return () => document.removeEventListener('keydown', handleKeyDown, true);
  }, []);

  return (
    <input
      ref={inputRef}
      className="lw-search-input"
      type="search"
      aria-label={label}
      placeholder={label}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          const q = e.target.value.trim();
          window.location.href = toLmsUrl(catalogUrl)
            + (q ? `?q=${encodeURIComponent(q)}` : '');
        }
      }}
    />
  );
};

SearchInput.propTypes = {
  label: PropTypes.string.isRequired,
  catalogUrl: PropTypes.string.isRequired,
  toLmsUrl: PropTypes.func.isRequired,
};

export default SearchInput;
