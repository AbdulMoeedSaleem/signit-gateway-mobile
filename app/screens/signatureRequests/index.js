import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import configurations from '../../constants';
import {fetchSignatureRequest} from '../../helpers/ApiRequests';

const SignatureRequestScreen = () => {
  const [requests, setRequests] = useState([]),
    navigation = useNavigation();
  useEffect(() => {
    getSignatureRequests();
  }, []);

  const getSignatureRequests = async () => {
    const data = await fetchSignatureRequest();
    setRequests(data);
  };

  return (
    <View style={Styles.container}>
      <FlatList
        data={requests}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Signature Request Detail', {
                signature_request_id: item.id,
              })
            }
            activeOpacity={0.5}
            style={Styles.listItemContainer}>
            <Text style={Styles.listItemText}>
              {item.signature_request_title}
            </Text>
            <Text style={Styles.listItemDate}>
              {moment(item.created_at).format('DD/MMM/YYYY - hh:mm a')}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={<View style={Styles.divider} />}
      />
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
  listItemContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: configurations.theme.textColor,
  },
  listItemText: {
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

export default SignatureRequestScreen;
