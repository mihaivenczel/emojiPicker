import React, {useState, useRef, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SectionList,
  TextInput,
} from 'react-native';

import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import * as EmojiJson from '../resources/data-by-group.json';
import SectionRow from './EmojiPickerComponents/SectionRow';
import {RFValue} from 'react-native-responsive-fontsize';
import EmojiTapped from './EmojiPickerComponents/EmojiTapped';


//get data from json
const getJsonKeys = () => {
  const keys = [];
  for (let key in EmojiJson) {
    keys.push(key);
  }
  keys.pop();
  return keys;
};

const getSectionData = (name) => {
  const keys = getJsonKeys();

  if (name != '') {
    let allData = [...EmojiJson[keys[0]]];
    for (let i = 1; i < keys.length; i++) {
      allData = allData.concat(EmojiJson[keys[i]]);
    }

    const filteredData = allData.filter((e) => {
      const args = e.name.split('_');

      for (let i = 0; i < args.length; i++) {
        if (args[i].includes(name)) {
          return true;
        }
      }
      return false;
    });

    const genRows = () => {
      const key = 'Results';
      const rowArray = [];
      let i;
      const len = filteredData.length;
      for (i = 0; i + 6 <= len; i += 6) {
        rowArray.push({
          data: filteredData.slice(i, i + 6),
          key: '' + key + '_' + rowArray.length,
        });
      }

      if (len - i > 0) {
        rowArray.push({
          data: filteredData.slice(i, len),
          key: '' + key + '_' + rowArray.length,
        });
      }

      return rowArray;
    };

    const sectionData = [{data: genRows(), title: 'Results'}];
    return sectionData;
  } else {
    const sectionData = keys.map((key) => {
      const rowArray = [];

      let i;
      const len = EmojiJson[key].length;
      for (i = 0; i + 6 <= len; i += 6) {
        rowArray.push({
          data: EmojiJson[key].slice(i, i + 6),
          key: '' + key + '_' + rowArray.length,
        });
      }

      if (len - i > 0) {
        rowArray.push({
          data: EmojiJson[key].slice(i, len),
          key: '' + key + '_' + rowArray.length,
        });
      }

      return {data: rowArray, title: key};
    });
    return sectionData;
  }
};

const EmojiPicker = ({setEmojiList}) => {
  const [pressed, setPressed] = useState(false);
  const [name, setName] = useState('');
  //const [tapEmoji, setTapEmoji]=useState('');

  const sectionListRef = useRef(null);
  const sectionData = getSectionData(name);
  const scroll = useCallback((index) => {
    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        itemIndex: 0,
        sectionIndex: index,
      });
    } else {
      return;
    }
  }, []);

  const createListHeader = () => {
    const icons = [
      {},
      {name: 'emoticon-excited-outline', icon: 'CommunityIcon'},
      {name: 'emoji-people', icon: 'MaterialIcon'},
      {name: 'leaf', icon: 'CommunityIcon'},
      {name: 'food-apple', icon: 'CommunityIcon'},
      {name: 'airplane-takeoff', icon: 'CommunityIcon'},
      {name: 'sports-soccer', icon: 'MaterialIcon'},
      {name: 'dots-horizontal', icon: 'CommunityIcon'},
    ];

    let arr = [];

    for (let i = 0; i < icons.length; i++) {
      const e = icons[i];
      arr.push(
        <TouchableOpacity
          onPress={() => scroll(i - 1)}
          key={e.name + e.icon}
          style={styles.listHeaderItemStyle}>
          {e.icon === 'CommunityIcon' ? (
            <CommunityIcon
              style={styles.listHeaderItemTextStyle}
              name={e.name}
            />
          ) : (
            <MaterialIcon
              style={styles.listHeaderItemTextStyle}
              name={e.name}
            />
          )}
        </TouchableOpacity>,
      );
    }
    return arr;
  };

  return (
    <View>
      {pressed ? (
        <View style={styles.picker}>
          <View style={styles.listHeaderStyle}>{createListHeader()}</View>
          <TextInput
            autoCapitalize="none"
            onChangeText={(text) => {
              setName(text);
            }}
            placeholder={'Search Emoji'}
            style={styles.searchBar}
          />

          <SectionList
            ref={sectionListRef}
            sections={sectionData}
            renderSectionHeader={({section}) => {
              return <Text style={styles.categoryHeader}>{section.title}</Text>;
            }}
            renderItem={({item}) => {
              return <SectionRow data={item.data} _key={item.key} setEmojiList={setEmojiList} />;
            }}
            keyExtractor={(item) => {
              return item.key;
            }}
            showsVerticalScrollIndicator={false}
            style={{flexGrow: 100}}
            getItemLayout={(data, index) => {
              const l = RFValue(24);
              return {length: l, offset: l * index, index};
            }}
          />
        </View>
      ) : null}

      <TouchableOpacity
        onPress={() => {
          if (!pressed) {
            setPressed(true);
          } else {
            setPressed(false);
          }
        }}
        style={{alignSelf: 'flex-start'}}>
        <CommunityIcon style={styles.icon} name="emoticon-outline" />
      </TouchableOpacity>

      <EmojiTapped />

    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: 'yellow',
    paddingTop: 5,
    paddingBottom: 5,
    borderColor: 'grey',
    borderWidth: 1,
    padding: 10,
  },
  icon: {
    marginTop: 5,
    fontSize: 25,
  },
  picker: {
    width: 300,
    height: 320,
    position: 'absolute',
    left: 20,
    top: 70,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
    overflow: 'hidden',
  },
  categoryHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#add8e9',
    paddingLeft: 11,
  },
  listHeaderStyle: {
    justifyContent: 'space-evenly',
    backgroundColor: '#6bb8d1',
    flexGrow: 1,
    flexDirection: 'row',
  },
  listHeaderItemStyle: {
    flexGrow: 1,
  },
  listHeaderItemTextStyle: {
    fontSize: 35,
    textAlign: 'center',
  },
});

export default EmojiPicker;
