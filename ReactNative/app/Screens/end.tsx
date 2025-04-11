import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';


const dadosPlacar = [
  { id: '1', nome: 'Jogador Atual', pontuacao: 0 },
  { id: '2', nome: 'Jogador 1', pontuacao: 12 },
  { id: '3', nome: 'Jogador 2', pontuacao: 10 },
  { id: '4', nome: 'Jogador 3', pontuacao: 8 },
];

export default function TelaFinal() {
  const { score: pontuacao } = useLocalSearchParams(); 
  console.log('Pontuação recebida na Tela Final:', pontuacao);

  const pontuacaoJogador = parseInt(pontuacao as string) || 0;

  dadosPlacar[0].pontuacao = pontuacaoJogador;

  const voltarParaTelaInicial = () => {
    console.log('Voltando à tela inicial...');
    router.replace('/'); 
  };

  const reiniciarJogo = () => {
    console.log('Reiniciando o jogo...');
    router.replace('/'); 
  };

  return (
    <View className="flex-1 bg-roxo-escuro justify-center items-center p-4">
      {/* Título estilizado */}
      <View className="bg-dourado py-2 px-5 rounded-2xl mb-5 shadow-lg shadow-black/30">
        <Text className="text-3xl font-bold text-roxo-escuro text-center">
          🏆 Jogo Finalizado! 🏆
        </Text>
      </View>

      {/* Pontuação do jogador */}
      <View className="bg-white p-4 rounded-xl mb-5 items-center border-2 border-dourado shadow-lg shadow-black/30">
        <Text className="text-lg text-roxo-escuro font-bold">
          Sua Pontuação:
        </Text>
        <Text className="text-5xl text-roxo-escuro font-bold">
          {pontuacaoJogador}
        </Text>
      </View>

      {/* Placar */}
      <View className="bg-white rounded-xl p-4 mb-5 w-[90%] border-2 border-dourado shadow-lg shadow-black/30">
        <Text className="text-2xl font-bold text-roxo-escuro text-center mb-2">
          Placar
        </Text>
        <FlatList
          data={dadosPlacar}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View
              className={`flex-row justify-between py-2 px-3 border-b border-gray-200 ${
                index === 0 ? 'bg-dourado rounded-md' : ''
              }`}
            >
              <Text className="text-base font-bold text-roxo-escuro">
                {index + 1}º
              </Text>
              <Text className="text-base text-roxo-escuro flex-1 text-center">
                {item.nome}
              </Text>
              <Text className="text-base font-bold text-roxo-escuro">
                {item.pontuacao} pts
              </Text>
            </View>
          )}
          className="max-h-40"
        />
      </View>

      {/* Botões */}
      <View className="flex-row justify-between w-[90%]">
        <TouchableOpacity
          className="bg-dourado py-3 px-5 rounded-xl border-2 border-white shadow-lg shadow-black/30"
          onPress={reiniciarJogo}
        >
          <Text className="text-roxo-escuro text-lg font-bold text-center">
            Jogar Novamente
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-white py-3 px-5 rounded-xl border-2 border-dourado shadow-lg shadow-black/30"
          onPress={voltarParaTelaInicial}
        >
          <Text className="text-roxo-escuro text-lg font-bold text-center">
            Voltar à Tela Inicial
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}