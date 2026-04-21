export const theme = {
  colors: {
    bg: '#f5f2ec',
    surface: '#ffffff',
    surfaceRaised: '#faf9f7',
    border: '#d8d8d8',
    borderStrong: '#a8a8a8',

    ink: '#000000',
    inkMuted: '#252525',
    inkFaint: '#858585',

    logo:'#ff0022',

    accent: '#ff0022',
    accentHover: '#a8224f',
    accentLight: '#f9ece8',
    active: '#0004ff',

    scoreExcellent: '#00964b',
    scoreExcellentBg: '#e8f5ee',
    scoreGood: '#0054b4',
    scoreGoodBg: '#e8f0fa',
    scoreFair: '#be7c00',
    scoreFairBg: '#fdf3db',
    scorePoor: '#ad0000',
    scorePoorBg: '#faeaea',
  },

  radius: {
    sm: '2px',
    md: '4px',
    lg: '6px',
  },

  shadow: {
    sm: '0 1px 3px rgba(0,0,0,0.08)',
    md: '0 4px 16px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.06)',
    lg: '0 8px 32px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06)',
  },

  font: {
    display: '"Poppins", sans-serif',
    mono: '"Fira Mono", monospace',
    body: '"Poppins", sans-serif',
  },

  maxWidth: '768px',
  transition: '200ms ease',
};

export type Theme = typeof theme;
