import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Emoji from './Emoji';

const SectionRow = ({data, _key, setEmojiList}) => {
  
  const arr = [];
  for (let i = 0; i < data.length; i++) {
    arr.push(<Emoji key={_key + '_' + i} emojiCode={data[i].emoji} setEmojiList={setEmojiList}/>);
  }
  return (
    <View style={styles.categoryRow}>
      
      <Text>{arr}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryRow: {
    flexDirection: 'row',
    flexGrow: 1,
    padding: 0,
    margin: 0,
  },
});

export default SectionRow;
