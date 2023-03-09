import axios from 'axios';
import {ToastAndroid} from 'react-native';
import configurations from '../constants';

export const fetchSignatureRequest = async () => {
  try {
    const signatureRequests = await axios({
      method: 'GET',
      url: `${configurations.BaseUrl}/signature-request/get`,
    });
    if (signatureRequests.data.status) {
      return signatureRequests.data.data.records;
    } else {
      throw signatureRequests.data.message;
    }
  } catch (error) {
    throw error;
  }
};

export const fetchSignatureRequestDetail = async id => {
  try {
    const signatureRequests = await axios({
      method: 'GET',
      url: `${configurations.BaseUrl}/signature-request/get/${id}`,
    });
    if (signatureRequests.data.status) {
      return signatureRequests.data.data;
    } else {
      throw signatureRequests.data.message;
    }
  } catch (error) {
    throw error;
  }
};

export const fetchSignatureRequestSignerReminder = async (
  signature_request_id,
  signer_id,
) => {
  try {
    const signatureRequests = await axios({
      method: 'GET',
      url: `${configurations.BaseUrl}/signature-request/${signature_request_id}/remind/${signer_id}`,
    });
    if (signatureRequests.data.status) {
      ToastAndroid.show('Reminded succcessfully', ToastAndroid.LONG);
      return signatureRequests.data.data;
    } else {
      throw signatureRequests.data.message;
    }
  } catch (error) {
    throw error;
  }
};
