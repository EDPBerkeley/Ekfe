import React from 'react';
import { View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { SCREEN_WIDTH } from "../../Constants/constants";

const MyLineChart = () => {
  return (
    <View>
      <View style={{flexDirection:"row-reverse"}}>
        <View style={{borderWidth: 0, marginLeft: -50}}>
          <LineChart
            data={{
              datasets: [{
                data: [
                  1186,1303,1464,1464,1605,1657,1716,1809,1899,1899,2083
                ]
              }]
            }}
            width={SCREEN_WIDTH + 50} // from react-native
            height={220}
            chartConfig={{
              backgroundColor: 'transparent',
              backgroundGradientFrom: 'transparent',
              backgroundGradientTo: 'transparent',
              backgroundGradientFromOpacity: 0,
              backgroundGradientToOpacity: 0,
              color: () => `rgba(142, 0, 0, 1.0)`,
              labelColor: (opacity = 1) => `rgba(142, 0, 0, ${opacity})`,
              style: {
                backgroundColor: 'transparent',
              },
              propsForDots: {
                r: '0',
                strokeWidth: '0',
                stroke: '#8E0000'
              },
              propsForBackgroundLines: {
                stroke: 'transparent' // Hides the grid lines
              },
              fillShadowGradient: 'transparent',
              fillShadowGradientFrom: 'transparent',
              fillShadowGradientTo: 'transparent',
              fillShadowGradientFromOpacity: 0,
              fillShadowGradientToOpacity: 0,
              strokeWidth: 3,
              endSpacing: 0
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
            withInnerLines={false}
            withOuterLines={false}
            withVerticalLabels={false}
            withHorizontalLabels={false}
          />
        </View>
      </View>
    </View>
  );
}

export default MyLineChart;
