import { COLORS } from './colors';

export const ICONS = {
  upArrow: `
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3L4 11H9V21H15V11H20L12 3Z" fill="${COLORS.primaryAction}"/>
    </svg>
  `,
  imagePlaceholder: `
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="${COLORS.primaryAction}" stroke-width="2"/>
      <circle cx="8.5" cy="8.5" r="1.5" fill="${COLORS.primaryAction}"/>
      <path d="M21 15L16 10L5 21" stroke="${COLORS.primaryAction}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `
};
