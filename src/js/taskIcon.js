import { mdiCartOutline, mdiHeadCog, mdiLightbulbOutline } from '@mdi/js';

const generateIkon = category => {
  let icon = '';

  switch (category) {
    case 'Task':
      icon = mdiCartOutline;
      break;
    case 'Random thought':
      icon = mdiHeadCog;
      break;
    case 'Idea':
      icon = mdiLightbulbOutline;
      break;

    default:
      break;
  }

  return icon;
};

export default generateIkon;
