import { View, Text, ScrollView } from "react-native";

import { generateDatesFromYearStart } from "../utils/generate-dates-from-year-start";

import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { Header } from "../components/Header";
import { useNavigation } from "@react-navigation/native";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
const datesFromYearStart = generateDatesFromYearStart();
const minimumSummaryDatesSizes = 18 * 5; //Tamanhos mínimos de datas de resumo
const amountOfDaysToFill = minimumSummaryDatesSizes - datesFromYearStart.length; //quantidade de dias para preencher

export function Home() {

  const { navigate } = useNavigation()

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <View className="flex-row mt-6 mb-2">
        {weekDays.map((weekDays, i) => (
          <Text
            key={`${weekDays}-${i}`}
            className="text-zinc-400 text-xl font-bold text-center mx-1"
            style={{ width: DAY_SIZE }}
          >
            {weekDays}
          </Text>
        ))}
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100}}
      >

        <View className="flex-row flex-wrap">
          {datesFromYearStart.map((date) => (
            <HabitDay 
              key={date.toISOString()} 
              onPress={() => navigate('habit', {date: date.toISOString()})}
              
              />
          ))}

          {amountOfDaysToFill > 0 && 
            Array.from({ length: amountOfDaysToFill }).map((_, index) => (
              <View
                key={index}
                className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                style={{ width: DAY_SIZE, height: DAY_SIZE }}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}
