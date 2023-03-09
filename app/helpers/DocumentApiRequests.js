import axios from 'axios';
import {ToastAndroid} from 'react-native';
import configurations from '../constants';

export const fetchDocumentList = async () => {
  try {
    const documentsList = await axios({
      method: 'GET',
      url: `${configurations.BaseUrl}/document/get`,
    });
    if (documentsList.data.status) {
      return documentsList.data.data.records;
    } else {
      throw documentsList.data.message;
    }
  } catch (error) {
    throw error;
  }
};

export const uploadDocumentApi = async data => {
  try {
    const document = await axios({
      method: 'POST',
      data,
      url: `${configurations.BaseUrl}/document/upload`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (document.data.status) {
      ToastAndroid.show('Document Uploaded', ToastAndroid.LONG);
    } else {
      throw document.data.message;
    }
  } catch (error) {
    console.log('ERROR: ', error);
    throw error;
  }
};
