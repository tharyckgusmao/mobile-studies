import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SharedElement} from 'react-navigation-shared-element';
import {SIZES, width} from '../../utils/utils/constants';

export default function EventDetails({route: {params: item}}) {
  const {item: itemEvent} = item;
  console.log('render');
  return (
    <View
      style={{
        flex: 1,
      }}>
      <SharedElement id={`item.${itemEvent.key}.photo`} style={styles.image}>
        <Image
          source={itemEvent.image}
          resizeMode="cover"
          style={styles.image}
        />
      </SharedElement>
      <Text>{itemEvent.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: width,
    height: SIZES.size_240,
  },
});
