// import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import configurations from '../../constants';
import {
  fetchDocumentList,
  uploadDocumentApi,
} from '../../helpers/DocumentApiRequests';
import DocumentPicker from 'react-native-document-picker';

const DocumentsScreen = () => {
  const [documents, setDocuments] = useState([]);
  // navigation = useNavigation();
  useEffect(() => {
    getSignatureRequests();
  }, []);

  const getSignatureRequests = async () => {
    const data = await fetchDocumentList();
    setDocuments(data);
  };

  const uploadDocument = async pdfFile => {
    const formdata = new FormData();
    formdata.append('name', pdfFile.name);
    formdata.append('document', pdfFile);
    await uploadDocumentApi(formdata);
    await getSignatureRequests();
  };

  const pickDocument = async () => {
    const pdfFile = await DocumentPicker.pickSingle({
      type: 'application/pdf',
    });
    if (pdfFile && pdfFile.type === 'application/pdf') {
      Alert.alert(
        'Upload document',
        `Do you want to upload "${pdfFile.name}" document? `,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Upload',
            onPress: () => uploadDocument(pdfFile),
          },
        ],
      );
    }
  };

  return (
    <View style={Styles.container}>
      <FlatList
        data={documents}
        renderItem={({item}) => (
          <TouchableOpacity
            // onPress={() =>
            //   navigation.navigate('Signature Request Detail', {
            //     signature_request_id: item.id,
            //   })
            // }
            activeOpacity={0.5}
            style={Styles.listItemContainer}>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={Styles.listItemText}>
              {item.name}
            </Text>
            <Text style={Styles.listItemDate}>
              {moment(item.created_at).format('DD/MMM/YYYY - hh:mm a')}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={<View style={Styles.divider} />}
      />
      <TouchableOpacity
        onPress={pickDocument}
        activeOpacity={0.6}
        style={Styles.floatingButton}>
        <Text style={Styles.floatingButtonText}>or add new document</Text>
      </TouchableOpacity>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
  },
  listItemContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: configurations.theme.textColor,
    gap: 10,
  },
  listItemText: {
    flex: 1,
    fontSize: 20,
    fontWeight: '500',
    color: configurations.theme.textColor,
  },
  listItemDate: {
    fontSize: 12,
    color: configurations.theme.textColor,
  },
  divider: {
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: configurations.theme.primaryColor,
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

export default DocumentsScreen;
