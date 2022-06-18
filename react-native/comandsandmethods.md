-- Criar projeto
npx react-native init <name>

-- .local.properties
sdk.dir=/home/tharyckgusmao/Android/Sdk/

-- change icon
mover assets para pastas android e ios

-- change fonts
create folder assets on android/main
create react-native.config

module.exports = {
project: {
ios: {},
android: {},
},
assets: ['./src/assets/fonts/', './src/assets/icons/'],
};

-- context api

criar contexto
criar provider
criar usecontext
import {createContext, useContext, useState} from 'react';

const ThemeContext = createContext(undefined);

function ThemeProvider({children, defaulTheme}) {
const [theme, setTheme] = useState(defaulTheme);

return (
<ThemeContext.Provider value={[theme, setTheme]}>
{children}
</ThemeContext.Provider>
);
}

function useTheme() {
const context = useContext(ThemeContext);
if (context === undefined) {
throw new Error('useTheme must be used within a ThemeProvider');
}
return context;
}
export default ThemeContext;
export {ThemeProvider, useTheme};
