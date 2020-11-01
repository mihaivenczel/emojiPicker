import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SectionList,
} from 'react-native';

const EmojiTapped = ({value}) => {

  <SectionList
    style={styles.emojiAdd}
    data={value}
    renderItem={({data}) => {
      return (
        <View>
          <Text style={styles.text}> {value} </Text>
        </View>
      );
    }}
  />;
  return (
    <View>
      <Text style={styles.text}> {value} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emojiAdd: {
    borderColor: 'black',
    borderWidth: 2,
    width: '15%',
    fontSize: 20,
  },
  text: {
    fontSize: 24,
  },
  button: {
    fontSize: 15,
    borderWidth: 1,
    borderColor: 'black',
  },
});

export default EmojiTapped;
