import React, {useState, useRef, useEffect} from 'react';
import {Keyboard, Platform, Dimensions} from 'react-native';

export function useKeyboardStatus() {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const keyboardShowListener = useRef(null);
  const keyboardHideListener = useRef(null);
  const keyboardShowListenerFrame = useRef(null);
  const kbdWillOrDid = Platform.select({ios: 'Will', android: 'Did'});
  const showEventName = `keyboard${kbdWillOrDid}Show`;
  const hideEventName = `keyboard${kbdWillOrDid}Hide`;

  useEffect(() => {
    keyboardShowListener.current = Keyboard.addListener(showEventName, ev => {
      setHeight(ev.endCoordinates.height);
      setIsOpen(true);
    });
    keyboardHideListener.current = Keyboard.addListener(hideEventName, () => {
      // setHeight(0);
      setIsOpen(false);
    });

    return () => {
      keyboardShowListener.current.remove();
      keyboardHideListener.current.remove();
    };
  });

  return [isOpen, height];
}
