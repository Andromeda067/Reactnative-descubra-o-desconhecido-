import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Lista fixa de opções (botões)
const buttonOptions = [
  { id: -1, name: '-1 Subsolo' },
  { id: 0, name: '0 Térreo' },
  { id: 1, name: '1 Andar' },
  { id: 2, name: '2 Andar' },
  { id: 3, name: '3 Andar' },
];

const AnswerButton = ({ onPress, selectedButton, isCorrect }) => {
  return (
    <View style={styles.optionsContainer}>
      {buttonOptions.map((option) => {

        let buttonColor = '#ffffff'; 
        if (selectedButton === option.id) {
          buttonColor = isCorrect ? '#22c55e' : '#ef4444'; 
        }

        return (
          <TouchableOpacity
            key={option.id}
            style={[styles.optionButton, { backgroundColor: buttonColor }]}
            onPress={() => onPress(option)} 
          >
            <Text style={styles.optionText}>{option.name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// Estilos do componente
const styles = StyleSheet.create({
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 10,
  },
  optionButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    margin: 8,
    borderWidth: 2,
    borderColor: '#ffd700', // Borda dourada para um toque elegante
    shadowColor: '#000', // Sombra para dar profundidade
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Sombra no Android
  },
  optionText: {
    color: '#4b0082', // Texto roxo escuro para combinar com o fundo
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AnswerButton;