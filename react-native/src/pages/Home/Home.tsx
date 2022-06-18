import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DEFAULTSTYLES } from '../../utils/utils/styles'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { FONT_FAMILY_BOLD, SIZES } from '../../utils/utils/constants'

type Props = {}



const routes = [{
    title:"🎯   Roulette",
    route:"Roullete"
},{
    title:"🎫   Events",
    route:"EventsCalendar"
}]
const Home = (props: Props) => {
    const {navigate} = useNavigation()
  return (
    <ScrollView style={DEFAULTSTYLES.containerPadding}>
        {routes.map(e=>{
            return <TouchableOpacity activeOpacity={0.6} onPress={()=>{
                navigate(e.route)
            }} style={styles.routeItem}>
                <Text style={styles.title}>{e.title}</Text>
            </TouchableOpacity>
        })}
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({
routeItem:{
    padding: SIZES.size_10,
},
title:{
    fontFamily:FONT_FAMILY_BOLD,
    color:"#000",
    fontSize:SIZES.size_14,
    textTransform:"uppercase"
}

})