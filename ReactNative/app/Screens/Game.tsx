import React, { useState, useEffect } from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import BarraTempo from '../components/TimeBar';
import BotaoResposta from '../components/botoes'; 


const listaImagens = [
  {
    id: 1,
    uri: require('../public/image/lixo.jpeg'),
    local: '-1 Subsolo',
  },
  {
    id: 2,
    uri: require('../public/image/bicicleta.jpeg'),
    local: '-1 Subsolo',
  },
  {
    id: 3,
    uri: require('../public/image/parede.jpeg'),
    local: '2 Andar',
  },
  {
    id: 4,
    uri: require('../public/image/patio.jpeg'),
    local: '0 Térreo',
  },
  {
    id: 5,
    uri: require('../public/image/samuel_e_joao.jpeg'),
    local: '2 Andar',
  },
  {
    id: 6,
    uri: require('../public/image/lixo_patio.jpeg'),
    local: '0 Térreo',
  },
  {
    id: 7,
    uri: require('../public/image/microondas.jpeg'),
    local: '0 Térreo',
  },
  {
    id: 8,
    uri: require('../public/image/parede_subsolo.jpeg'),
    local: '-1 Subsolo',
  },
  {
    id: 9,
    uri: require('../public/image/pintura_velha.jpeg'),
    local: '0 Térreo',
  },
  {
    id: 10,
    uri: require('../public/image/pintura_nova.jpeg'),
    local: '0 Térreo',
  },
  {
    id: 11,
    uri: require('../public/image/podologia.jpeg'),
    local: '1 Andar',
  },
  {
    id: 12,
    uri: require('../public/image/parede_1.jpeg'),
    local: '1 Andar',
  },
  {
    id: 13,
    uri: require('../public/image/careca.jpeg'),
    local: '2 Andar',
  },
  {
    id: 14,
    uri: require('../public/image/secretaria.jpeg'),
    local: '1 Andar',
  },
];

export default function TelaJogo() {
  const [imagemAtual, setImagemAtual] = useState(null); 
  const [pontuacao, setPontuacao] = useState(0); 
  const [chaveTemporizador, setChaveTemporizador] = useState(0); 
  const [botaoSelecionado, setBotaoSelecionado] = useState(null); 
  const [respostaCorreta, setRespostaCorreta] = useState(null); 
  const [imagensUsadas, setImagensUsadas] = useState([]);
  const [jogoFinalizado, setJogoFinalizado] = useState(false); 
  const [podePontuar, setPodePontuar] = useState(true); 


  const selecionarProximaImagem = () => {

    const imagensDisponiveis = listaImagens.filter(
      (imagem) => !imagensUsadas.includes(imagem.id)
    );

    console.log('Imagens disponíveis:', imagensDisponiveis.length);


    if (imagensDisponiveis.length === 0) {
      console.log('Jogo finalizado com pontuação:', pontuacao);
      router.push({ pathname: '/Screens/end', params: { score: pontuacao.toString() } });
      return;
    }

    
    const indiceAleatorio = Math.floor(Math.random() * imagensDisponiveis.length);
    const proximaImagem = imagensDisponiveis[indiceAleatorio];


    setImagemAtual(proximaImagem);
    setImagensUsadas([...imagensUsadas, proximaImagem.id]); 
    setChaveTemporizador((prev) => prev + 1); 
    setBotaoSelecionado(null); 
    setRespostaCorreta(null); 
    setPodePontuar(true); 
  };


  const lidarComPressaoBotao = (opcao: { id: number; name: string }) => {

    setBotaoSelecionado(opcao.id);
    const correto = opcao.name === imagemAtual?.local;
    setRespostaCorreta(correto);


    if (correto && podePontuar) {
      setPontuacao(pontuacao + 1);
    }


    setTimeout(() => {
      selecionarProximaImagem();
    }, 1000); 
  };


  const lidarComFimTempo = () => {
    console.log('Tempo acabou! Mudando para a próxima imagem sem somar pontos.');
    setPodePontuar(false); 
    selecionarProximaImagem(); 
  };


  const reiniciarJogo = () => {
    console.log('Reiniciando o jogo...');
    setImagemAtual(null);
    setPontuacao(0);
    setChaveTemporizador(0);
    setBotaoSelecionado(null);
    setRespostaCorreta(null);
    setImagensUsadas([]);
    setJogoFinalizado(false);
    setPodePontuar(true);
    selecionarProximaImagem(); 
  };


  useEffect(() => {
    selecionarProximaImagem();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-roxo-escuro">
      <View className="flex-1 bg-roxo-escuro">

        <BarraTempo key={chaveTemporizador} onTimeUp={lidarComFimTempo} />


        <View className="flex-1 justify-end items-center p-4">

          <Text className="absolute top-10 text-xl font-bold text-dourado">
            Pontuação: {pontuacao}
          </Text>

          {imagemAtual && (
            <Image
              source={imagemAtual.uri}
              className="w-full h-[300px] mb-4 rounded-xl border-2 border-dourado"
              resizeMode="contain"
            />
          )}


          <BotaoResposta
            onPress={lidarComPressaoBotao}
            selectedButton={botaoSelecionado}
            isCorrect={respostaCorreta}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}