import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import configurations from '../../constants';
import {fetchSignatureRequestDetail} from '../../helpers/ApiRequests';

const SignatureRequestDetailScreen = ({route: {params}}) => {
  const [signatureRequestDetail, setSignatureRequestDetail] =
    useState(undefined);
  useEffect(() => {
    getSignatureRequestDetail(params.signature_request_id);
  }, [params]);

  const getSignatureRequestDetail = async signature_request_id => {
    const data = await fetchSignatureRequestDetail(signature_request_id);
    setSignatureRequestDetail(data);
  };

  console.log('HERE WE GOT THE DETAIL: ', signatureRequestDetail);

  return (
    <View style={Styles.container}>
      <TouchableOpacity activeOpacity={0.6} style={Styles.floatingButton}>
        <Text style={Styles.floatingButtonText}>Create Request</Text>
      </TouchableOpacity>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
  },
  floatingButton: {
    position: 'absolute',
    padding: 10,
    bottom: 20,
    right: 20,
    backgroundColor: configurations.theme.primaryColor,
    borderRadius: 5,
  },
  floatingButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: configurations.theme.textColorLight,
  },
});

export default SignatureRequestDetailScreen;
