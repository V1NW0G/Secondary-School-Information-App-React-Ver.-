module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        [
            'import-glob',
        ],
        [
            'module-resolver',
        ],
        [
            'react-native-reanimated/plugin',
        ],
    ],
}
