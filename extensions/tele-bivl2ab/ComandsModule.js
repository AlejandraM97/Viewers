/* eslint-disable no-console */
import * as utils from './utils';
import { ohifConf } from './index';
import * as BUTTONS from './ToolbarModule';
import * as predictions from './operationsAI/predictions';

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
      predictHeartVolume:{
        commandFn: () => {
          var dicomData = utils.getDicomUIDs();
          console.log(dicomData);
          if (utils.isSeriesMR()) {
            const services = {
              notification: UINotificationService,
              modal: UIModalService,
            };
            const payloadData = {
              microservice: 'orthanc',
              // task: 'predict_pathologies',
              task: 'predict_voting_pathology',
              file_ID: dicomData.SeriesInstanceUID,
              file_type: 'volumen',
              task_class: 'classify',
              task_mode: 'heart',
            };
            UINotificationService.show({
              title: 'Realizando predicción.',
              message: 'Este proceso tomara unos segundos.',
              duration: 1000 * 4,
            });
            // You have to know if the payload is the right one.
            var promisePetition = predictions.predictMultiplePathologies(payloadData);

            promisePetition
              .then(response => {
                console.log(response);
                console.log(response.hasOwnProperty('error'));
                if (response.hasOwnProperty('error')) {
                  //Handle model with less than 11 slices
                  var uidData = utils.getAllInstancesUIDs();
                  const minInstancesNumber = 11;
                  if (
                    uidData.length < minInstancesNumber &&
                    payloadData.file_type == 'volumen'
                  ) {
                    UINotificationService.show({
                      title: 'Insuficientes instancias:',
                      type: 'warning',
                      duration: 15 * 1000,
                      autoClose: false,
                      position: 'topRight',
                      message:
                        'El modelo requiere más instancias DICOM para realizar un diagnóstico.',
                    });
                  } else {
                    UINotificationService.show({
                      title: 'Error de Predicción:',
                      type: 'warning',
                      duration: 5 * 1000,
                      position: 'topRight',
                      message: 'Por favor intente de nuevo.',
                    });
                  }
                } else {
                  console.log(response);
                  utils.generate_distribution('Probabilidades por clase', '', response, services);//, MODELS_INFORMATION.ct_3d.train_samples, MODELS_INFORMATION.ct_3d.acc);
                }
              })
              .catch(rst => {
                console.log(rst);
                if (rst.error == "There was an exception") {
                  UINotificationService.show({
                    type: 'error',
                    title: 'Error:',
                    message:
                      'Hubo un error con el modelo.',
                    duration: 1000 * 4,
                  });
                }
                if (rst.status == 400) {
                  UINotificationService.show({
                    type: 'error',
                    title: 'Error de entidad:',
                    message:
                      'Por favor verificar la entidad asociada a su usuario.',
                    duration: 1000 * 4,
                  });
                }
                if (rst.status == 403 || rst.result.status == 403) {
                  UINotificationService.show({
                    type: 'error',
                    title: 'Recurso prohibido:',
                    message: 'Sin permisos para realizar esta acción.',
                    duration: 1000 * 4,
                  });
                }
                if (rst.status == 401) {
                  UINotificationService.show({
                    type: 'error',
                    title: 'Error de autenticación:',
                    message: 'Usuario no autenticado.',
                    duration: 1000 * 4,
                  });
                }
                if (rst.status == 404) {
                  UINotificationService.show({
                    type: 'error',
                    title: 'Error:',
                    message: 'Sin conexion.',
                    duration: 1000 * 4,
                  });
                }
              });
          } else {
            UINotificationService.show({
              title: 'Modalidad incorrecta:',
              type: 'warning',
              duration: 15 * 1000,
              autoClose: false,
              position: 'topRight',
              message:
                'La serie actual no corresponde a un MR, se recomienda altamente utilizar este modelo sobre series MR.',
            });
          }
        },
        storeContexts: [],
        options: {},
        },
      },
    defaultContext: ['VIEWER'],
  };
};

export default telebivl2abCommandsModule;
