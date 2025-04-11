import React, { useState, useEffect, useRef } from 'react';
import {View,FlatList,Image,Dimensions,Text,} from 'react-native';

const { width } = Dimensions.get('window');

const Carrossel = () => {

  const [imagens] = useState([
    { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKNMAcqegvgdodaBAomsNwBjI-GONjOy4TGg&s' },
    { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6-B-1mXlZNoTYdDBKeKDqril67eYkhW0sow&s' },
    require('../public/image/lixo.jpeg'),
    require('../public/image/bicicleta.jpeg'),
  ]);

  const [indiceAtivo, setIndiceAtivo] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndiceAtivo((indiceAnterior) => {
        const proximoIndice = (indiceAnterior + 1) % imagens.length;
        flatListRef.current?.scrollToIndex({
          index: proximoIndice,
          animated: true,
        });
        return proximoIndice;
      });
    }, 3000);

    return () => clearInterval(intervalo);
  }, [imagens.length]);

  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setIndiceAtivo(viewableItems[0].index);
    }
  });

  const configVisibilidade = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const renderizarItem = ({ item }) => (
    <View style={{ width: width }} className="h-[340px]">
      <Image source={item} resizeMode="cover" className="w-full h-full" />
    </View>
  );

  return (
    <View className="flex-1 justify-center items-center">
      <FlatList
        ref={flatListRef}
        data={imagens}
        renderItem={renderizarItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={configVisibilidade.current}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />

      <View className="flex-row absolute bottom-5">
        {imagens.map((_, index) => (
          <View
            key={index}
            className={`w-2.5 h-2.5 rounded-full mx-1 ${
              index === indiceAtivo ? 'bg-white opacity-100' : 'bg-white opacity-30'
            }`}
          />
        ))}
      </View>
    </View>
  );
};

export default Carrossel;
