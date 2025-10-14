import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#e0f0ff',
      100: '#c2daff',
      200: '#85b8ff',
      300: '#4d96ff',
      400: '#1a7aff',
      500: '#0066ff',
      600: '#0052cc',
      700: '#003d99',
      800: '#002866',
      900: '#001433',
      950: '#000a1a'
    },

  },
});

export default MyPreset;
