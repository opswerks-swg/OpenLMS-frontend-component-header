// True when any item in a grouped user menu ({ heading, items }[]) is the current page.
const hasActiveMenuItem = (menu = []) => menu.some(
  (group) => (group.items || []).some((item) => item.isActive),
);

export default hasActiveMenuItem;
