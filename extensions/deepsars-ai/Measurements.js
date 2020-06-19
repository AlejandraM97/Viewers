import OHIF from '@ohif/core';
import cornerstone from 'cornerstone-core';
import { tempMeasurements } from './mocks/MeasurementsMock';

const localMeasurementAPI = OHIF.measurements.MeasurementApi.Instance;

export const saveMeasurements = () => {
  console.log('The following tool anotations are going to be saved');
  console.log(localMeasurementAPI.tools);
};

export const retrieveAllMeasurements = () => {
  tempMeasurements.forEach(tempMeasurements =>
    localMeasurementAPI.addMeasurement(
      tempMeasurements.toolType,
      tempMeasurements
    )
  );
  localMeasurementAPI.syncMeasurementsAndToolData();
  cornerstone.getEnabledElements().forEach(enabledElement => {
    cornerstone.updateImage(enabledElement.element);
  });
  // Let others know that the measurements are updated
  localMeasurementAPI.onMeasurementsUpdated();
};
