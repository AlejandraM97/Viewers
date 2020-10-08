import ToolbarModule from './ToolbarModule';
import telebivl2abCommandsModule from './ComandsModule';
import init from './init';

export const TeleBivl2abExtension = {
  id: 'Tele-Bivl2ab extension',
  async preRegistration({ servicesManager, configuration = {} }) {
    init({ servicesManager, configuration });
  },
  getToolbarModule() {
    return ToolbarModule;
  },
  getCommandsModule({ servicesManager, commandsManager }) {
    return telebivl2abCommandsModule({ servicesManager, commandsManager });
  },
};

export {};
