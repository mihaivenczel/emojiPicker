import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import EmojiPicker from '../components/EmojiPicker';

const HomeScreen = () => {
  const [emojiList, setEmojiList] = useState([]);
  console.log(emojiList);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {'\u{1F602}'}
        {'\u{1F602}'}
        {'\u{1F602}'}
        {'\u{1F602}'}
      </Text>

      <EmojiPicker setEmojiList={setEmojiList} />

        <Text style={styles.emojiReact}>{emojiList}</Text>
    
    </View>
  );
};

const styles = StyleSheet.create({
  emojiReact: {
    left: 20,
    top: 500,
    fontSize: 30,
  },
  container: {
    alignSelf: 'center',
    justifyContent: 'flex-start',
    flexGrow: 1,
  },
  text: {
    alignContent: 'center',
    fontSize: 25,
    padding: 10,
    width: 400,
  },
});

export default HomeScreen;
