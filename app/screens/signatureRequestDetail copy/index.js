import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import configurations from '../../constants';
import {
  fetchSignatureRequestDetail,
  fetchSignatureRequestSignerReminder,
} from '../../helpers/SignatureRequestApiRequests';

const SignatureRequestDetailScreen = ({route: {params}}) => {
  const [signatureRequestDetail, setSignatureRequestDetail] =
      useState(undefined),
    [signersList, setSignersList] = useState([undefined]),
    [orderedSigners, setOrderedSigners] = useState(false);
  useEffect(() => {
    getSignatureRequestDetail(params.signature_request_id);
  }, [params]);

  const getSignatureRequestDetail = async signature_request_id => {
    const data = await fetchSignatureRequestDetail(signature_request_id),
      isOrdered = !data.signature_request.signatories.every(
        _x => _x.order === 0,
      );
    if (isOrdered) {
      setSignersList(
        data.signature_request.signatories.sort((a, b) => a.order - b.order),
      );
    } else {
      setSignersList(data.signature_request.signatories);
    }

    setSignatureRequestDetail(data);
    setOrderedSigners(isOrdered);
  };

  const remindSigner = async (id, signer_id) => {
    await fetchSignatureRequestSignerReminder(id, signer_id);
  };

  const reminderAlert = signer =>
    Alert.alert('Remind Signer', `This will remind ${signer.full_name}`, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Remind',
        onPress: () => remindSigner(signatureRequestDetail.id, signer.id),
      },
    ]);

  return (
    <View style={Styles.container}>
      <ScrollView>
        {signatureRequestDetail && (
          <>
            <View style={Styles.titleTextContainer}>
              <Text style={Styles.title}>Title:</Text>
              <Text style={Styles.desciption}>
                {signatureRequestDetail.signature_request_title}
              </Text>
            </View>
            <View style={Styles.titleTextContainer}>
              <Text style={Styles.title}>Created at:</Text>
              <Text style={Styles.desciption}>
                {moment(signatureRequestDetail.created_at).format(
                  'DD/MMM/YYYY - hh:mm a',
                )}
              </Text>
            </View>
            <View style={Styles.titleTextContainer}>
              <Text style={Styles.title}>Status:</Text>
              <Text style={Styles.desciption}>
                {signatureRequestDetail.signature_request.status}
              </Text>
            </View>
            <View style={[Styles.titleTextContainer, Styles.signerContainer]}>
              <Text style={Styles.title}>Signers:</Text>
              <View style={Styles.signerListContainer}>
                {signersList.map(_signer => (
                  <TouchableOpacity
                    activeOpacity={0.6}
                    key={_signer.id}
                    style={Styles.signerDetailContainer}
                    onPress={
                      _signer.status ? undefined : () => reminderAlert(_signer)
                    }>
                    <Text style={Styles.title}>
                      {orderedSigners ? `${_signer.order}- ` : ''}
                      {`${_signer.full_name}${'\n'}(${_signer.contact.email})`}
                    </Text>
                    <Text style={Styles.desciption}>
                      {_signer.status ?? 'PENDING'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  titleTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: configurations.theme.primaryColor,
  },
  title: {
    color: configurations.theme.textColor,
    fontWeight: '700',
    fontSize: 18,
  },
  desciption: {
    color: configurations.theme.textColor,
    fontSize: 16,
  },
  signerContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 20,
  },
  signerListContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 20,
  },
  signerDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default SignatureRequestDetailScreen;
