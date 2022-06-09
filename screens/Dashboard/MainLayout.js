import React, { useRef, createRef, useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    Animated,
    TouchableOpacity,
    Image
} from 'react-native';

import {Shadow} from 'react-native-shadow-2'

import { Home, Profile, Search } from '../../screens'
import { COLORS, SIZES, FONTS, constants } from '../../constants'

const bottomTabs = constants.bottom_tabs.map((bottomTab =>({
    ...bottomTab,
    ref: createRef()
})))

const TabIndicator = ({measureLayout, scrollX}) => {

    const inputRange = bottomTabs.map((_,i)=>i*SIZES.width)

    const tabIndicatorWidth = scrollX.interpolate({
        inputRange,
        outputRange: measureLayout.map(measure=>measure.width) 
    })

    const translateX = scrollX.interpolate({
        inputRange,
        outputRange: measureLayout.map(measure=>measure.x) 
    })

    return (
        <Animated.View 
        style={{
                position:'absolute', 
                left:0, 
                height:'100%', 
                width:tabIndicatorWidth, 
                borderRadius:SIZES.radius,
                backgroundColor:COLORS.primary,
                transform:[{translateX}]}}/>
    )
}

const Tabs = ({scrollX, onBottomTabPress}) =>{
    const containerRef = useRef()
    const [measureLayout, setMeasureLayout] = useState([])

    useEffect(()=>{
        let ml = []

        bottomTabs.forEach(bottomTab => {
            bottomTab?.ref?.current?.measureLayout(
                containerRef.current,
                (x,y,width,height)=>{
                    ml.push({
                        x,y,width,height
                    })
                    if(ml.length === bottomTabs.length){
                        setMeasureLayout(ml)
                    }
                }
            )
        })
    },[containerRef.current])
    return (
        <View ref={containerRef} style={{flex:1,flexDirection:'row'}}>
            {/* Tab Indicator */}
            {measureLayout.length > 0 && <TabIndicator measureLayout={measureLayout} scrollX={scrollX} />}
            {/* Tabs */}
            {bottomTabs.map((item,index)=>{
                return (
                    <TouchableOpacity 
                        key={`BottomTab-${index}`} 
                        ref={item.ref} 
                        style={{flex:1, paddingHorizontal:15, alignItems:'center',justifyContent:'center'}} onPress={()=>onBottomTabPress(index)}>
                            <Image source={item.icon} resizeMode="contain" style={{width:25, height:25}} />
                            <Text style={{marginTop:3, color:COLORS.white, ...FONTS.h3}}>{item.label}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const MainLayout = () => {

    const flatlistRef = useRef()
    const scrollX = useRef(new Animated.Value(0)).current

    const onBottomTabPress = useCallback(bottomTabIndex => {
        flatlistRef?.current?.scrollToOffset({
            offset: bottomTabIndex*SIZES.width,
        })
    })

    function renderContent(){
        return (
            <View style={{ flex: 1 }}>
                <Animated.FlatList 
                    ref={flatlistRef} 
                    scrollEnabled={false}
                    horizontal 
                    pagingEnabled
                    snapToAlignment="center" 
                    snapToInterval={SIZES.width}
                    decelerationRate="fast"
                    showHorizontalScrollIndicator={false}
                    data={constants.bottom_tabs}
                    keyExtractor={item=>`Main-${item.id}`}
                    onScroll={
                        Animated.event([
                            {nativeEvent:{contentOffset:{x:scrollX}}}
                        ],{useNativeDriver:false})}
                    renderItem={({item,index})=>{
                        return (
                            <View style={{height:SIZES.height, width:SIZES.width}}>
                                {item.label == constants.screens.home && <Home />}
                                {item.label == constants.screens.search && <Search />}
                                {item.label == constants.screens.profile && <Profile />}
                            </View>
                        )
                    }}
                />
            </View>
        )
    }    
    
    const renderBottomTab = () => {
        return (
            <View style={{marginBottom:20,paddingHorizontal:SIZES.padding,paddingVertical:SIZES.radius}}>
                <Shadow
                size={[SIZES.width - (SIZES.padding *2), 85]}
                >
                    <View style={{flex:1, borderRadius:SIZES.radius,backgroundColor:COLORS.primary3}}>
                        <Tabs scrollX={scrollX} onBottomTabPress={onBottomTabPress} />
                    </View>
                </Shadow>
            </View>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            {/* Content */}
            {renderContent()}

            {/* Bottom Tabs */}
            {renderBottomTab()}
        </View>
    )
}

export default MainLayout;