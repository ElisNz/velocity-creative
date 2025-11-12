const config = {
  plugins: {
    "@tailwindcss/postcss": {
      content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
      theme: {
        extend: {
          padding: {
            sm: '0.625rem', // 10px
            md: '1rem',    // 16px
            lg: '1.5rem',  // 24px
            xl: '2rem',    // 32px
            'fluid-video': '56.25%',
          },
        },
      },
      plugins: [],
    },
  },
};

export default config;
