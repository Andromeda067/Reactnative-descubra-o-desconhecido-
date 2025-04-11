import React, { useRef, useEffect } from 'react';
import { Text, View, TouchableOpacity, Animated } from 'react-native';
import Carrossel from './components/Carrossel';
import { router, useRouter } from 'expo-router';

export default function TelaInicial() {
  const animacaoSaltoTitulo = useRef(new Animated.Value(0)).current;
  const animacaoSaltoBotao = useRef(new Animated.Value(0)).current;
  const animacaoFundo = useRef(new Animated.Value(0)).current;

  const roteador = useRouter();

  function iniciarJogo() {
    roteador.push('/Screens/InicarGame');
  }

  useEffect(() => {
    // Animação de fundo
    Animated.timing(animacaoFundo, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    // Animação de salto do título
    Animated.sequence([
      Animated.timing(animacaoSaltoTitulo, {
        toValue: -20,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(animacaoSaltoTitulo, {
        toValue: 0,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();

    // Animação de salto do botão (executa uma vez)
    Animated.sequence([
      Animated.timing(animacaoSaltoBotao, {
        toValue: -15,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(animacaoSaltoBotao, {
        toValue: 0,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  }, [animacaoSaltoTitulo, animacaoSaltoBotao, animacaoFundo]);

  return (
    <Animated.View
      className="flex-1"
      style={{
        backgroundColor: animacaoFundo.interpolate({
          inputRange: [0, 1],
          outputRange: ['#1f2937', '#4b0082'],
        }),
      }}
    >
      {/* Cabeçalho */}
      <Animated.View
        className="mt-20 mb-6 px-6"
        style={{ transform: [{ translateY: animacaoSaltoTitulo }] }}
      >
        <Text className="text-5xl text-roxo-claro font-extrabold text-center shadow-md">
          Jogo dos Locais 🗺️
        </Text>
        <Text className="text-xl text-cinza-claro text-center mt-3 italic">
          Descubra o desconhecido 📍
        </Text>
      </Animated.View>

      {/* Carrossel */}
      <View className="flex-grow">
        <Carrossel />
      </View>

      {/* Botão */}
      <View className="mb-16 px-6 items-center">
        <Animated.View style={{ transform: [{ translateY: animacaoSaltoBotao }] }}>
          <TouchableOpacity
            className="bg-roxo-medio w-80 h-24 rounded-[40px] justify-center items-center shadow-2xl border-4 border-cinza-escuro"
            onPress={() => iniciarJogo()}
          >
            <Text className="text-3xl text-cinza-claro font-bold tracking-wide">
              JOGAR! 🎮
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Animated.View>
  );
}