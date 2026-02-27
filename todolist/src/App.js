import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

export default function App() {
  const [enteredGoal, setEnteredGoal] = useState('');
  const [goals, setGoals] = useState([]);
  const [editId, setEditId] = useState(null);

  const addOrEditGoalHandler = () => {
    if (enteredGoal.trim().length === 0) {
      Alert.alert('Oops!', 'Please enter something first');
      return;
    }

    if (editId) {
      setGoals((currentGoals) =>
        currentGoals.map((g) =>
          g.id === editId ? { ...g, text: enteredGoal } : g
        )
      );
      setEditId(null);
    } else {
      setGoals((currentGoals) => [
        {
          id: Math.random().toString(),
          text: enteredGoal,
          completed: false,
        },
        ...currentGoals,
      ]);
    }
    setEnteredGoal('');
  };

  const deleteGoalHandler = (id) => {
    setGoals((currentGoals) =>
      currentGoals.filter((goal) => goal.id !== id)
    );
  };

  const toggleCompleteHandler = (id) => {
    setGoals((currentGoals) =>
      currentGoals.map((goal) =>
        goal.id === id
          ? { ...goal, completed: !goal.completed }
          : goal
      )
    );
  };

  const startEditHandler = (item) => {
    setEnteredGoal(item.text);
    setEditId(item.id);
  };

  const GoalItem = ({ item }) => (
    <View style={styles.goalCard}>
      <TouchableOpacity
        style={[
          styles.checkbox,
          item.completed && styles.checkedBox,
        ]}
        onPress={() => toggleCompleteHandler(item.id)}
      >
        {item.completed && <Text style={styles.checkMark}>✓</Text>}
      </TouchableOpacity>

      <Text
        style={[
          styles.goalText,
          item.completed && styles.completedText,
        ]}
      >
        {item.text}
      </Text>

      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => startEditHandler(item)}
          style={styles.editBtn}
        >
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => deleteGoalHandler(item.id)}
        >
          <Text style={styles.deleteText}>Del</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MY TASKS</Text>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputSection}
      >
        <View style={styles.inputRow}>
          <TextInput
            placeholder="Add new task..."
            placeholderTextColor="#94A3B8"
            style={styles.input}
            value={enteredGoal}
            onChangeText={setEnteredGoal}
          />

          <TouchableOpacity
            style={styles.addButton}
            onPress={addOrEditGoalHandler}
          >
            <Text style={styles.addButtonText}>
              {editId ? 'Update' : 'Add'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <FlatList
        data={goals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <GoalItem item={item} />}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F1A', // Deep Black-Blue
    paddingTop: 70,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: '900',
    color: '#00E5FF', // Electric Blue
    marginBottom: 25,
    letterSpacing: 2,
  },

  inputSection: {
    marginBottom: 20,
  },

  inputRow: {
    flexDirection: 'row',
  },

  input: {
    flex: 1,
    backgroundColor: '#1A1F2E',
    padding: 15,
    borderRadius: 14,
    marginRight: 10,
    fontSize: 16,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#00E5FF',
  },

  addButton: {
    backgroundColor: '#FF0080', // Hot Pink
    paddingHorizontal: 18,
    justifyContent: 'center',
    borderRadius: 14,
  },

  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  goalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#141927',
    padding: 18,
    borderRadius: 18,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#00E5FF',
  },

  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FF0080',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkedBox: {
    backgroundColor: '#FF0080',
  },

  checkMark: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  goalText: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
  },

  completedText: {
    textDecorationLine: 'line-through',
    color: '#6B7280',
  },

  actions: {
    flexDirection: 'row',
  },

  editBtn: {
    marginRight: 10,
  },

  editText: {
    color: '#00E5FF',
    fontWeight: 'bold',
  },

  deleteText: {
    color: '#FF4D4D',
    fontWeight: 'bold',
  },
});