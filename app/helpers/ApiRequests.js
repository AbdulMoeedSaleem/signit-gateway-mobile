import axios from 'axios';
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
