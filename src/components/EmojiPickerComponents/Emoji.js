import React from 'react';
import {
  FlatList,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const Emoji = ({emojiCode, setEmojiList}) => {

  return (
    <TouchableOpacity
      style={styles.emojiHolder}
      onPress={() => {
        setEmojiList((prevState) => {
          const array = [...prevState, emojiCode];
          return array;
        });
      }}>
      <Text style={styles.emojiStyle}> {emojiCode}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  emojiHolder: {
    flexGrow: 1,
    borderRadius: 50,
  },
  emojiStyle: {
    fontSize: RFValue(25),
    paddingLeft: 5,
  },
});

export default Emoji;
