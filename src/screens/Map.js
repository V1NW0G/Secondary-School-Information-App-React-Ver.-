import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import { map, toNumber } from 'lodash'
import axios from 'axios'

import { useTranslation } from 'react-i18next'

const Map = () => {
    const { i18n } = useTranslation()

    const [schoolJSON, setSchoolJSON] = useState(null)

    useEffect(() => {
        let mounted = true
        const getSchoolJSON = async () => {
            const { data } = await axios.get('https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.json')
            if (mounted) {
                setSchoolJSON(data)
            }
        }

        getSchoolJSON()

        return () => { mounted = false }
    }, [])

    return (
        <>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 22.352734,
                    longitude: 114.1277,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {
                    schoolJSON !== null &&
                    map(schoolJSON, (school, index) => {
                        if (index !== 0) {
                            return (
                                <Marker
                                    coordinate={{ latitude: toNumber(school.J), longitude: toNumber(school.H) }}
                                    key={`marker-${index}`}
                                >
                                </Marker>
                            )
                        } else {
                        }
                    })
                }
            </MapView>
        </>
    )
}

const styles = StyleSheet.create({
    map: {
        height: '100%',
        width: '100%',
    },
})

export default Map
