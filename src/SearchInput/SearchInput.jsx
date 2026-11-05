import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

// PRD LMS 6.1: pressing "/" focuses the search bar from any page.
const SEARCH_SHORTCUT_KEY = '/';

const isTypingTarget = (element) => (
  element instanceof HTMLElement
  && (element.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(element.tagName))
);

const SearchInput = ({ label, catalogUrl, toLmsUrl }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key !== SEARCH_SHORTCUT_KEY || event.ctrlKey || event.metaKey || event.altKey) {
        return;
      }
      // Don't steal the key from someone who is typing a "/" somewhere else.
      if (isTypingTarget(event.target)) {
        return;
      }
      event.preventDefault();
      inputRef.current?.focus();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
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
