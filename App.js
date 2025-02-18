import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import 'moment/locale/pt-br'; // Importa a localidade para pt-br
import styles from './styles';

// Define o locale para pt-br
moment.locale('pt-br');

const App = () => {
  const [people, setPeople] = useState([]);
  const [newPerson, setNewPerson] = useState('');
  const [currentMonth, setCurrentMonth] = useState(moment().format('YYYY-MM'));
  const [currentGroup, setCurrentGroup] = useState('Unisosiesc'); // Estado para armazenar o grupo atual

  // Carrega a lista do AsyncStorage sempre que currentMonth OU currentGroup mudam
  useEffect(() => {
    const loadPeople = async () => {
      try {
        const key = `${currentMonth}_${currentGroup}`;
        const savedData = await AsyncStorage.getItem(key);

        if (savedData) {
          // Se existir dados para o mês/grupo, utiliza-os
          setPeople(JSON.parse(savedData));
        } else {
          // Se não houver dados, tenta carregar os nomes do mês anterior
          const previousMonth = moment(currentMonth, 'YYYY-MM').subtract(1, 'month').format('YYYY-MM');
          const previousKey = `${previousMonth}_${currentGroup}`;
          const previousData = await AsyncStorage.getItem(previousKey);

          if (previousData) {
            // Se houver dados no mês anterior, persiste apenas os nomes, com pagamento pendente
            const previousPeople = JSON.parse(previousData);
            const newPeople = previousPeople.map(person => ({ name: person.name, paid: false }));
            setPeople(newPeople);
            // Salva os novos dados para o mês atual
            await AsyncStorage.setItem(key, JSON.stringify(newPeople));
          } else {
            // Caso não haja dados anteriores, inicia com lista vazia
            setPeople([]);
          }
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };
    loadPeople();
  }, [currentMonth, currentGroup]);

  // Salva os dados de acordo com o mês e o grupo atual
  const saveData = async (data) => {
    const key = `${currentMonth}_${currentGroup}`;
    await AsyncStorage.setItem(key, JSON.stringify(data));
    setPeople(data);
  };

  const addPerson = () => {
    if (newPerson.trim()) {
      const updatedPeople = [...people, { name: newPerson, paid: false }];
      saveData(updatedPeople);
      setNewPerson('');
    }
  };

  const togglePayment = (index) => {
    const updatedPeople = [...people];
    updatedPeople[index].paid = !updatedPeople[index].paid;
    saveData(updatedPeople);
  };

  const deletePerson = (index) => {
    const updatedPeople = people.filter((_, i) => i !== index);
    saveData(updatedPeople);
  };

  // Função para trocar de grupo (exemplo simples alternando entre Unisosiesc e Univille)
  const switchGroup = () => {
    if (currentGroup === 'Unisosiesc') {
      setCurrentGroup('Univille');
    } else {
      setCurrentGroup('Unisosiesc');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Auditoria de Pagamentos de Transporte</Text>
      {/* Formata o mês no padrão brasileiro */}
      <Text style={styles.subtitle}>
        Mês: {moment(currentMonth, 'YYYY-MM').format('MMMM [de] YYYY')}
      </Text>
      <Text style={styles.subtitle}>Grupo Atual: {currentGroup}</Text>

      {/* Botão para trocar de grupo */}
      <TouchableOpacity style={styles.changeButton} onPress={switchGroup}>
        <Text style={styles.monthButtonText}>Trocar</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Adicionar pessoa"
        placeholderTextColor="#B0B0B0"
        value={newPerson}
        onChangeText={setNewPerson}
      />
      <TouchableOpacity style={styles.addButton} onPress={addPerson}>
        <Text style={styles.addButtonText}>Adicionar</Text>
      </TouchableOpacity>

      <ScrollView style={styles.list}>
        {people.map((person, index) => (
          <View key={index} style={styles.personItem}>
            <Text style={styles.personName}>{person.name}</Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[
                  styles.paymentButton,
                  person.paid ? styles.paidButton : styles.pendingButton
                ]}
                onPress={() => togglePayment(index)}
              >
                <Text style={styles.paymentButtonText}>
                  {person.paid ? 'Pago' : 'Pendente'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deletePerson(index)}
              >
                <Text style={styles.deleteButtonText}>Deletar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.monthSelector}>
        <TouchableOpacity
          style={styles.monthButton}
          onPress={() =>
            setCurrentMonth(
              moment(currentMonth, 'YYYY-MM')
                .subtract(1, 'month')
                .format('YYYY-MM')
            )
          }
        >
          <Text style={styles.monthButtonText}>Mês Anterior</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.monthButton}
          onPress={() =>
            setCurrentMonth(
              moment(currentMonth, 'YYYY-MM')
                .add(1, 'month')
                .format('YYYY-MM')
            )
          }
        >
          <Text style={styles.monthButtonText}>Próximo Mês</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;
