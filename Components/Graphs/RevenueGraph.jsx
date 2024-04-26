import React from 'react';
import { View, ScrollView } from "react-native";
import { LineChart } from 'react-native-chart-kit';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../Constants/constants";

const MyLineChart = () => {
  return (
    <View>
      <View style={{flexDirection:"row-reverse"}}>
        <ScrollView style={{borderWidth: 0, marginLeft: -65, marginBottom: -120}}>
          <LineChart
            data={{
              datasets: [
                {
                  data: [1186,1303,1464,1464,1605,1657,1716,1809,1899,1899,2083]
                },
                {
                  data: [1] // min
                },
                {
                  data: [10] // max
                }
              ]
            }}
            width={SCREEN_WIDTH + 110} // from react-native
            height={SCREEN_HEIGHT - 350}
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
                r: '5',
                strokeWidth: '1',
                stroke: '#8E0000'
              },
              propsForBackgroundLines: {
                stroke: 'transparent' // Hides the grid lines
              },
              fillShadowGradientFrom: 'rgba(220,0,0,0.64)',
              fillShadowGradientTo: 'rgba(220,0,0,0.64)',
              fillShadowGradientFromOpacity: .6,
              fillShadowGradientToOpacity: .2,
              strokeWidth: 2.5,
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
        </ScrollView>
      </View>
    </View>
  );
}

export default MyLineChart;
