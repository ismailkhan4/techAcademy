import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    ScrollView
} from 'react-native';

import {FlatList} from 'react-native-gesture-handler';
import {FONTS,SIZES,icons,images,dummyData, COLORS} from '../../constants'

const Home = () => {
    const renderHeader = () => {
        return(
            <View style={{flexDirection:'row',marginTop:40,marginBottom:10,paddingHorizontal:SIZES.padding,alignItems:'center'}}>
                {/* Greetings */}
                <View style={{flex:1}}>
                    <Text style={{...FONTS.h2, color:COLORS.black}}>Hello, Ismail</Text>
                    <Text style={{color:COLORS.gray50, ...FONTS.body3}}>Thursday, 9th Sept 2021</Text>
                </View>

                {/* Notifications */}
            </View>
        )
    }
    return (
        <View style={{flex:1, backgroundColor:COLORS.white}}>
            {/* Header */}
            {renderHeader()}
        </View>
    )
}

export default Home;