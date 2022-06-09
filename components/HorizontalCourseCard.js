import React from 'react'
import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native'
import {IconLabel} from '../components'
import { SIZES,COLORS,FONTS,icons } from '../constants'

const HorizontalCourseCard = ({containerStyle, course}) => {
  return (
    <TouchableOpacity
        style={{
            flexDirection:'row',
            ...containerStyle
        }}
    >
      {/* Thumbnail */}
      <ImageBackground
        source={course.thumbnail}
        resizeMode="cover"
        style={{
            width:120,
            height:120,
            marginBottom:SIZES.radius
        }}
        imageStyle={{
            borderRadius: SIZES.radius
        }}
      >
          <View
            style={{
                position:'absolute',
                top:10,
                right:10,
                width:30,
                height:30,
                alignItems:'center',
                justifyContent:'center',
                borderRadius:5,
                backgroundColor:COLORS.white
            }}
          >
              <Image
                source={icons.favourite}
                resizeMode="contain"
                style={{
                    width:20,
                    height:20,
                    tintColor: course.is_favourite ? COLORS.secondary : COLORS.additionalColor4
                }}
              />
          </View>
      </ImageBackground>
      {/* Details */}
      <View
        style={{
            flex:1,
            marginLeft: SIZES.base
        }}
      >
          {/* Title */}
          <Text
            style={{
                color:COLORS.black,
                ...FONTS.h3,
                fontSize:18 
            }}
          >
              {course.title}
          </Text>

          {/* Instrutor & Duration */}
          <View
            style={{
                flexDirection:'row',
                alignItems:'center',
                marginTop:SIZES.base
            }}
          >
              <Text
                style={{
                    color:COLORS.black,
                    ...FONTS.body4
                }}
              >
                  By {course.instructor}
              </Text>

              <IconLabel 
                icon={icons.time}
                label={course.duration}
                containerStyle={{
                    marginLeft:SIZES.base
                }}
                iconStyle={{
                    width:15,
                    height:15
                }}
                labelStyle={{
                    ...FONTS.body4
                }}
              />
          </View>
          {/* Price & Rating */}
          <View
            style={{
                flexDirection:'row',
                alignItems:'center',
                marginTop:SIZES.base
            }}
          >
              <Text
                style={{
                    color:COLORS.primary,
                    ...FONTS.h2
                }}
              >
                  ${course.price.toFixed(2)}
              </Text>
              <IconLabel 
                icon={icons.star}
                label={course.ratings}
                containerStyle={{
                    marginLeft:SIZES.base
                }}
                iconStyle={{
                    width:15,
                    height:15,
                    tintColor: COLORS.primary2
                }}
                labelStyle={{
                    marginLeft:5,
                    color:COLORS.black,
                    ...FONTS.h3
                }}
              />
          </View>
      </View>
    </TouchableOpacity>
  )
}

export default HorizontalCourseCard