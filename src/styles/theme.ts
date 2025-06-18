export const theme = {
  colors: {
    primary: '#002A42',    // Lumo Navy - primary background
    secondary: '#0B3A57',  // Midnight Blue - card background
    accent: '#008893',     // Teal Blue - accent color
    warning: '#F9B233',    // Warm Yellow - alerts/notifications
    highlight: '#F05A28',  // Vibrant Orange - CTAs/important elements
    background: '#FDF5E5', // Soft Cream - UI background (light background if needed)
    text: '#F5F7FA',       // Light text for dark mode
    muted: '#9CA3AF',      // Optional: muted/secondary text
    border: '#1f2f47',     // Border color for card edges and containers
  },

  fonts: {
    heading: "'Poppins', sans-serif",  // Logo-like font for headings
    body: "'Inter', sans-serif",       // Clean sans-serif for body
    ui: "'Inter', sans-serif",         // Same as body, consistent UI
  },

  gradients: {
    card: 'linear-gradient(135deg, #0B3A57 0%, #002A42 100%)',
    hero: 'linear-gradient(135deg, #002A42 0%, #008893 100%)',
    accent: 'linear-gradient(135deg, #F05A28 0%, #F9B233 100%)',
  },
};
