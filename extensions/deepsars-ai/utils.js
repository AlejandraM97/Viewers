import cornerstone from 'cornerstone-core';
import OHIF from '@ohif/core';

/*TODO List: By Yesid G.
  1) Create petitions utilities inside of utils.py
  2) Create the logic of each button in the corresponding section (heatmaps.js or predictions.js) by using functions.
  3) Inside this file(commands module) just call the functions from heatmaps.js or predictions.js in front of each commandFn.
  4) This file should have the same form of the one that is currently in index, the idea is to export the whole object to index.
  5) In the file index.js import this commandsModule.js file and return the object of this file
  6) commit the changes and have fun!
*/

export const makeContract = (dicomData, file_type, file_mod, file_view) => {
  var contract = {
    microservice: 'orthanc',
    task: 'predict_pathology',
    file_ID: dicomData,
    file_type: file_type,
    file_mod: file_mod,
    file_view: file_view,
  };

  return contract;
};

export const getDicomUIDs = () => {
  const defaultEnabledElement = cornerstone.getEnabledElements()[0];
  const image = defaultEnabledElement.image;
  const imageIdArray = image.imageId.split('/');
  return {
    StudyInstanceUID: imageIdArray.slice(-7)[0],
    SeriesInstanceUID: imageIdArray.slice(-5)[0],
    SOPInstanceUID: imageIdArray.slice(-3)[0],
  };
};

export const getAllInstancesUIDs = () => {
  const allSlicesUIDS = [];
  const UIDsMap = OHIF.cornerstone.metadataProvider.imageIdToUIDs;
  for (const [key, value] of UIDsMap.entries()) {
    allSlicesUIDS.push(value);
  }
  return allSlicesUIDS;
};

export const makeTransaction = (route, operation, data) => {
  const requestPayload = {
    count: 0,
    data: data,
    date: String(new Date().getTime()),
    enterprise: 1,
    ips: ['2QEJ8cO8CC'],
    operation: operation,
    route: route,
    _v: 3,
  };

  const promisePetition = new Promise((resolve, reject) => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4) {
        if (xhttp.status == 200) {
          resolve(JSON.parse(xhttp.response));
        } else {
          reject('Sin conexión');
        }
      }
    };
    xhttp.open('POST', `/trs/${route}/`, true);
    xhttp.setRequestHeader(
      'Authorization',
      'eW1I0vBmaURGlp0uo9a7gm3cQ8EpRgcQYyIa86uXIIFVEbWrrwnnfVgE8xtR22LkfIpXUPrM4h9FQwhdvqqioUPKHycVPNrSQ7ssV40JNUHmw35Jeks0Q8zI+ad8vaLD4tlhxQ87h7t57mNGP7Utgni37geebJ6lHzqwubrYgPfBjvu/ODLO/HItbC4/r4iT4sFG6r0ZjFWM76Gm8mk9+Qr/tFCIIszfpIecc34pinRoEoCmIZNjqJjEkjS5IiYQeNYNJmt4a1RESfLZ5Xf5LZw3pA5NhRisRGpoLTDqJdPUzo0qKMo3INpivZxjm93XOiJ5wKpQEgwblPQ2Qd+lbWp3aujQzEXWVzcK1AGZKGtzhnjOw+eAJEcEO4ygRntUDNIqv5wAlaLvr7d2UoLcbq42ZCKC/EcBXPhJ6MGBkYCi1Wh6zG5kXfuJeSaFvjzHHYDvstN39K6vyUbFJa+gow/pw1vSaLLellv1lQ/WPy4G1+JFQpeVC9iOGFaRKAaH7IaUfZLrjwSsMzF9hyZ53cO92mttVjNAwLx30fK4LfMRUzLGJwEk7nzxm+zElptqfSru/IIVqPWuBZdzGYuFK6JOXYLEf+1ULzXF5SShLCcMKT9hcIRB9FRzIELgEvUMTgKgW4s5AxQJckMUbkgTXziXWiT/iL49a03eLvc1i8Lm4UIWLTWU/+bm0VnHo+b4C5kYHIyyKkToThwTAWj8C5tmgWE1U5/rJrqXndt3fiVdQtk/fCHxD9BsM2gM/osF92KjmZ3axJLn3Zm0JTOVjBxsTN1Sz1S8nIHvIs/CVmJfp1UFz8FfETWwzJYjQKguOAW7xnPfypZGY544soXmGlo9fzFT+5b3uZBYPrf2al4cOUDNz/w2MtWdPSQeNgRmYS5oFLBUTUb7wsHqA3QJgTEK2Rkuy0ZSpzSlUzqtM33jPMz8uqAUVmGjk6kE+vixHpHwdT8drLcoEyvoaHPTfV1j1pmuGCJq2Bqk0qGpcHXH/4cp3yNockBwFEWXhGnp6A=='
    );
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(requestPayload));
  });

  return promisePetition;
};
