export default {
    vite: {
      css: {
        preprocessorOptions: {
          css: {
            additionalData: '@import "src/styles/global.css";',
          },
        },
      },
    },
  };
  
  