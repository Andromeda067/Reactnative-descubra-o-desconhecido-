import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';

export default function TelaPreparacao() {
  const [contagemRegressiva, setContagemRegressiva] = useState(10);
  const roteador = useRouter();

  useEffect(() => {
    const temporizador = setInterval(() => {
      setContagemRegressiva((anterior) => {
        if (anterior > 0) {
          return anterior - 1;
        } else {
          clearInterval(temporizador);
          roteador.push('/Screens/Game');
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(temporizador);
  }, [roteador]);

  return (
    <View className="flex-1 bg-roxo-escuro justify-center items-center">

      <Text className="absolute top-12 text-2xl text-white font-bold text-center">
        Prepare-se, o jogo já vai começar!
      </Text>

      <Text className="text-[120px] text-amarelo-vivo font-bold text-center shadow-lg shadow-black/50">
        {contagemRegressiva}
      </Text>
    </View>
  );
}