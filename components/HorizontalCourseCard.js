import React from "react";
import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native';

import { IconLabel } from "../components";
import { SIZES, COLORS, FONTS, icons } from "../constants";

const HorizontalCourseCard = ({ containerStyle, course, i , onPress }) => {

  const thumbnails = [
    require('../assets/images/thumbnail_1.png'),
    require('../assets/images/thumbnail_2.png'),
    require('../assets/images/thumbnail_3.png'),
    require('../assets/images/thumbnail_4.png'),
    require('../assets/images/thumbnail_1.png'),
    require('../assets/images/thumbnail_2.png'),
    // Add more thumbnails as needed
  ];

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        ...containerStyle
      }}
    >
      {/* Thumbnail */}
      <ImageBackground
        // source={course.thumbnail}
        source={thumbnails[i]}
        resizeMode="cover"
        style={{
          width: 130,
          height: 130,
          marginBottom: SIZES.radius
        }}
        imageStyle={{
          borderRadius: SIZES.radius
        }}
      >
        <View
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            width: 30,
            height: 30,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            backgroundColor: COLORS.white
          }}
        >
          <Image
            source={icons.favourite}
            resizeMode="contain"
            style={{
              width: 20,
              height: 20,
              tintColor: course.is_favourite ?
                COLORS.secondary : COLORS.additionalColor4
            }}
          />

        </View>
      </ImageBackground>

      {/* Details */}
      <View
        style={{
          flex: 1,
          marginLeft: SIZES.base
        }}
      >
        {/* Title */}
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.black,
            fontWeight: 'bold',
            fontSize: 18
          }}
        >
          {course.title}
        </Text>

        {/* Instruction & Duration */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: SIZES.base - 8
          }}
        >
          <Text
            style={{
              ...FONTS.body4,
              color: COLORS.gray50,
            }}
          >
            By {course.mentor}
          </Text>

          <IconLabel
            icon={icons.time}
            label={course.duration}
            containerStyle={{
              marginLeft: SIZES.base
            }}
            iconStyle={{
              width: 15,
              height: 15,
              tintColor: COLORS.gray30
            }}
            labelStyle={{
              ...FONTS.body5,
              color: COLORS.gray30,
            }}
          />
        </View>

        {/* Price & Ratings */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: SIZES.base - 8
          }}
        >
          <Text
            style={{
              ...FONTS.h2,
              color: COLORS.primary

            }}
          >
            ${course.price}
          </Text>

          <IconLabel
            icon={icons.star}
            label={course.ratings}
            containerStyle={{
              marginLeft: SIZES.base
            }}
            iconStyle={{
              width: 15,
              height: 15,
              tintColor: COLORS.primary2
            }}
            labelStyle={{
              marginLeft: 5,
              color: COLORS.black,
              ...FONTS.h3

            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default HorizontalCourseCard;  