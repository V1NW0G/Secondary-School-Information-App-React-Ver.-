import React from 'react'
import { StyleSheet } from 'react-native'
import { VStack, Text, View, Button } from 'native-base'

import { useTranslation } from 'react-i18next'

const Home = ({ navigation }) => {
    const { t, i18n } = useTranslation('home')

    navigateToList = () => {
        navigation.navigate('List')
    }

    return (
        <View style={styles.container}>
            <VStack space="30" alignItems="center">
                <Text style={styles.title}>{t('title')}</Text>

                <Button onPress={navigateToList}>{t('get_start')}</Button>

                <Button onPress={() => { i18n.changeLanguage(i18n.language === 'en' ? 'zh' : 'en') }}>{t('language')}</Button>
            </VStack>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
        paddingBottom: 15,
    },
    title: {
        fontSize: 15,
    },
})
export default Home
