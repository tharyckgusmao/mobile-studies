import ASFactory from '@react-native-community/async-storage';
import LegacyStorage from '@react-native-community/async-storage-backend-legacy';

const storageBackend = new LegacyStorage();

const storage = ASFactory.create(storageBackend);

export default storage;
