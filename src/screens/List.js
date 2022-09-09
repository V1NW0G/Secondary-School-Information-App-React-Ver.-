import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, Linking } from 'react-native'
import { FlatList, View, Spinner, Center, Input, Text } from 'native-base'
import axios from 'axios'
import {
    get,
    slice,
    debounce,
    reduce,
    forEach,
    values,
    includes,
    toLower,
    lowerCase,
} from 'lodash'

import { useTranslation } from 'react-i18next'

const List = ({ navigation }) => {
    const { i18n } = useTranslation()

    const [offset, setOffset] = useState(10)
    const [loading, setLoading] = useState(false)
    const [searching, setSearching] = useState(false)
    const [schoolJSON, setSchoolJSON] = useState(null)
    const [schoolInfo, setSchoolInfo] = useState(null)

    useEffect(() => {
        let mounted = true
        const getSchoolJSON = async () => {
            setLoading(true)
            const { data } = await axios.get('https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.json')
            if (mounted) {
                setSchoolJSON(data)
                updateSchoolInfo(data)
            }
            setLoading(false)
        }

        getSchoolJSON()

        return () => { mounted = false }
    }, [])

    useEffect(() => {
        if (schoolJSON !== null) {
            updateSchoolInfo()
        }
    }, [schoolJSON])

    const updateSchoolInfo = () => {
        if (!schoolJSON || searching) return
        setSchoolInfo(slice(schoolJSON, 1, offset))
        if (offset + 10 <= schoolJSON.length) {
            setOffset(offset + 10)
            return
        }
        setOffset(schoolJSON.length)
    }

    const search = debounce(text => {
        setLoading(true)
        setSearching(text !== '')

        if (text === '') {
            updateSchoolInfo()
            setLoading(false)
            return
        }

        let result = reduce(schoolJSON, (accumulator, school) => {
            let match = false
            let detail = values(school)

            forEach(detail, value => {
                if (!match) match = includes(toLower(value), toLower(text))
            })

            if (match) accumulator.push(school)

            return accumulator
        }, [])

        setSchoolInfo(result)
        setOffset(10)
        setLoading(false)
    }, 200)

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => {
                console.log('AD: ', item.AD)
                if (!item.AD) return
                Linking.openURL(item.AD)
            }}>
                <View space="5" style={styles.item}>
                    <Text style={styles.number}>{item.A}</Text>
                    <Text style={styles.name}>{get(item, `${i18n.language === 'en' ? 'D' : 'E'}`)}</Text>
                    <Text style={styles.content}>{`${get(schoolJSON, `[0].${i18n.language === 'en' ? 'B' : 'C'}`)}: ${lowerCase(get(item, i18n.language === 'en' ? 'B' : 'C'))}`}</Text>
                    <Text style={styles.content}>{`${get(schoolJSON, `[0].${i18n.language === 'en' ? 'P' : 'Q'}`)}: ${lowerCase(get(item, i18n.language === 'en' ? 'P' : 'Q'))}`}</Text>
                    <Text style={styles.content}>{`${get(schoolJSON, `[0].${i18n.language === 'en' ? 'R' : 'S'}`)}: ${lowerCase(get(item, i18n.language === 'en' ? 'R' : 'S'))}`}</Text>
                    <Text style={styles.content}>{`${get(schoolJSON, `[0].${i18n.language === 'en' ? 'V' : 'W'}`)}: ${lowerCase(get(item, i18n.language === 'en' ? 'V' : 'W'))}`}</Text>
                    <Text style={styles.content}>{`${get(schoolJSON, `[0].${i18n.language === 'en' ? 'X' : 'Y'}`)}: ${lowerCase(get(item, i18n.language === 'en' ? 'X' : 'Y'))}`}</Text>
                    <Text style={styles.content}>{`${get(schoolJSON, `[0].${i18n.language === 'en' ? 'Z' : 'AA'}`)}: ${lowerCase(get(item, i18n.language === 'en' ? 'Z' : 'AA'))}`}</Text>
                    <Text style={styles.content}>{`${get(schoolJSON, `[0].${i18n.language === 'en' ? 'AB' : 'AC'}`)}: ${lowerCase(get(item, i18n.language === 'en' ? 'AB' : 'AC'))}`}</Text>
                    <Text style={styles.content}>{`${get(schoolJSON, `[0].${i18n.language === 'en' ? 'AF' : 'AG'}`)}: ${lowerCase(get(item, i18n.language === 'en' ? 'AF' : 'AG'))}`}</Text>
                    <Text style={styles.content}>{`${get(schoolJSON, `[0].${i18n.language === 'en' ? 'T' : 'U'}`)}: ${lowerCase(get(item, i18n.language === 'en' ? 'T' : 'U'))}`}</Text>
                    <Text style={styles.content}>{`${get(schoolJSON, `[0].${i18n.language === 'en' ? 'F' : 'G'}`)}: ${lowerCase(get(item, i18n.language === 'en' ? 'F' : 'G'))}`}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <>
            <Input w="100%" onChangeText={search} />
            {
                schoolInfo !== null && !loading ?
                    <FlatList style={styles.container}
                        data={schoolInfo}
                        renderItem={renderItem}
                        extraData={{ key: schoolJSON[0] }}
                        onEndReached={updateSchoolInfo}
                    />
                    :
                    <Center height="100%" width="100%">
                        <Spinner size="lg" />
                    </Center>
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        marginTop: 10,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
    },
    item: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#000',
        padding: 5,
        marginBottom: 18,
        minHeight: 40,
    },
    number: {
        fontSize: 12,
        color: '#2f2f2f',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    content: {
        fontSize: 14,
    },
})

export default List
