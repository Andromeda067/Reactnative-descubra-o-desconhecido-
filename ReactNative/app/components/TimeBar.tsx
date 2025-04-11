import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Animated } from 'react-native';

const TimeBar = ({ aoTerminarTempo }: { aoTerminarTempo: () => void }) => {
  const [tempoRestante, setTempoRestante] = useState(30);
  const animacao = useState(new Animated.Value(1))[0]; 
  const componenteMontado = useRef(true); 

  // Efeito para contagem regressiva e animação da barra
  useEffect(() => {
    const intervalo = setInterval(() => {
      if (!componenteMontado.current) {
        clearInterval(intervalo);
        return;
      }

      setTempoRestante((anterior) => {
        if (anterior <= 0) {
          clearInterval(intervalo);
          aoTerminarTempo(); // Chama função de término de tempo
          return 0;
        }
        return anterior - 1;
      });
    }, 1000); // Reduz a cada segundo

    Animated.timing(animacao, {
      toValue: 0,
      duration: 30000, 
      useNativeDriver: false,
    }).start();

    return () => {
      componenteMontado.current = false;
      clearInterval(intervalo);
    };
  }, [animacao, aoTerminarTempo]);

  // Define a cor da barra conforme o tempo restante
  const obterCorBarra = () => {
    if (tempoRestante > 20) return '#22c55e'; // verde-tempo
    if (tempoRestante > 10) return '#eab308'; // amarelo-tempo
    return '#ef4444'; // vermelho-tempo
  };

  return (
    <View className="w-full h-6 rounded-xl overflow-hidden justify-center bg-cinza-fundo">
      <Animated.View
        style={{
          width: animacao.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%', '100%'],
          }),
          backgroundColor: obterCorBarra(),
        }}
        className="h-full rounded-xl"
      />
      <Text className="absolute self-center text-white font-bold text-base">
        {tempoRestante}s
      </Text>
    </View>
  );
};

export default TimeBar;
