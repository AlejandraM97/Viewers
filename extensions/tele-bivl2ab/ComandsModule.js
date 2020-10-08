/* eslint-disable no-console */
const telebivl2abCommandsModule = ({ servicesManager }) => {
  const { UINotificationService, UIModalService } = servicesManager.services;
  return {
    definitions: {
      mySampleFunction: {
        commandFn: () => {
          console.log('Printed from my sample function.');
          UINotificationService.show({
            title: 'Realizando prueba',
            message: 'Este proceso tomara unos segundos.',
            duration: 1000 * 4,
            type: 'warning',
          });
        },
        storeContexts: [],
        options: {},
      },
    },

    defaultContext: ['VIEWER'],
  };
};

export default telebivl2abCommandsModule;
