import React, { ReactElement } from 'react'
import sampleColors from '../data/sample_colors.json'
import useLanguage from '../hooks/language'
import useSampleAnim from '../hooks/sample_anim'
import useSamplePosition from '../hooks/sample_position'
import { Animated, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import { BASE_DARK_COLOR, FONT_SIZE, MARGIN } from '../data/styles.json'
import { SAMPLE_ITEM_SIZE } from '../data/constants.json'

interface SampleItemProps {
  color: string,
  initPosition: number,
  animated: boolean,
}

const SampleItem = ( props:SampleItemProps ): ReactElement => {
  const { color:backgroundColor, initPosition, animated } = props
  // Setting position and displacement animation
  const { top, left } = useSamplePosition( initPosition )
  const x = useSampleAnim( animated )
  // Saving parameters at a styleobject
  const transform = [ { translateX: x } ]
  const itemStyle = { top, left, backgroundColor, transform }
  // Rendering
  return <Animated.View style={ [ styles.sampleItem, itemStyle ] } />
}

const SampleItemsList = (): ReactElement => {
  const items: ReactElement[] = []
  // Creating an item for each color
  for( let _this = 0; _this < sampleColors.length; _this++ ) {
    const color: string = sampleColors[ _this ]!
    const initPosition: number = _this >= 5  // Skipping cell 6
      ? _this + 1
      : _this
    const animated: boolean = color === sampleColors[ 4 ]  // Setting displacement animation in 5th element
    // Rendering item
    const item =
      <SampleItem
        key={ _this }
        color={ color }
        initPosition={ initPosition }
        animated={ animated } />
    items.push( item )
  }
  return <>{ items }</>
}

const ItemsGroup = (): ReactElement => {
  return (
    <View style={ styles.itemsGroup }>
      <SampleItemsList />
    </View>
  )
}

const AnimatedSample = (): ReactElement => {
  const language = useLanguage()
  const { width } = useWindowDimensions()
  const containerStyle = {
    width: width - MARGIN * 2,
    alignItems: 'center' as const,
  }
  return (
    <View style={ containerStyle }>
      <ItemsGroup />
      <Text style={ styles.instructions }>{ language.gameInstructions }</Text>
    </View>
  )
}

const ITEMS_GROUP_SIZE = SAMPLE_ITEM_SIZE * 3 + MARGIN * 2

const styles = StyleSheet.create( {
  itemsGroup: {
    width: ITEMS_GROUP_SIZE,
    height: ITEMS_GROUP_SIZE,
  },
  sampleItem: {
    width: SAMPLE_ITEM_SIZE,
    height: SAMPLE_ITEM_SIZE,
    position: 'absolute',
    borderRadius: 4,
  },
  instructions: {
    marginTop: MARGIN,
    color: BASE_DARK_COLOR,
    fontSize: FONT_SIZE * 0.83,
    fontFamily: 'Comfortaa-Bold',
    textAlign: 'center',
  },
} )

export default AnimatedSample
