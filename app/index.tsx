import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Calendar, Plus, Sun, Moon } from 'lucide-react-native';
import styles from './styles';
import TodoList from './TodoList';
import DatePickerModal from './DatePickerModal';
import type { Todo, ViewMode } from './TodoTypes';

const TodoApp: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [newTodo, setNewTodo] = useState<string>('');
  const [viewMode, setViewMode] = useState<ViewMode>('day');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const savedTodos = await AsyncStorage.getItem('todos');
        if (savedTodos) {
          setTodos(JSON.parse(savedTodos).map((todo: Todo) => ({
            ...todo,
            date: new Date(todo.date)
          })));
        }
      } catch (error) {
        console.error('Error loading todos:', error);
      }
    };
    loadTodos();
  }, []);

  useEffect(() => {
    const saveTodos = async () => {
      try {
        await AsyncStorage.setItem('todos', JSON.stringify(todos));
      } catch (error) {
        console.error('Error saving todos:', error);
      }
    };
    saveTodos();
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim()) {
      const newTodoItem: Todo = {
        id: Date.now(),
        text: newTodo,
        status: 'IN PROGRESS',
        date: new Date(selectedDate.getTime())
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
    }
  };

  const toggleStatus = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id 
        ? { ...todo, status: todo.status === 'DONE' ? 'IN PROGRESS' : 'DONE' }
        : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const onDateChange = (date: Date) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? '#111827' : '#F9FAFB' }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={[styles.headerTitle, { color: darkMode ? '#FFFFFF' : '#000000' }]}>
            {viewMode === 'day' ? "Daily" : viewMode === 'week' ? "Week" : "Month"} Tasks
          </Text>
          <TouchableOpacity 
            onPress={() => setDarkMode(!darkMode)}
            style={styles.darkModeButton}
          >
            {darkMode ? <Sun size={20} color="#D1D5DB" /> : <Moon size={20} color="#4B5563" />}
          </TouchableOpacity>
        </View>
        <View style={styles.viewModeButtons}>
          {['day', 'week', 'month'].map((mode) => (
            <TouchableOpacity
              key={mode}
              onPress={() => setViewMode(mode as ViewMode)}
              style={[
                styles.viewModeButton,
                viewMode === mode && styles.viewModeButtonActive
              ]}
            >
              <Text style={[
                styles.viewModeButtonText,
                viewMode === mode && styles.viewModeButtonTextActive
              ]}>
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.addTodoContainer}>
        <TextInput
          value={newTodo}
          onChangeText={setNewTodo}
          placeholder="New task"
          placeholderTextColor={darkMode ? '#9CA3AF' : '#4B5563'}
          style={[
            styles.input,
            { backgroundColor: darkMode ? '#1F2937' : '#F3F4F6', color: darkMode ? '#FFFFFF' : '#000000' }
          ]}
        />
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
          <Calendar size={20} color="#9CA3AF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={addTodo} style={styles.addButton}>
          <Plus size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.todoList}>
        <TodoList todos={todos} darkMode={darkMode} toggleStatus={toggleStatus} deleteTodo={deleteTodo} viewMode={viewMode}/>
      </ScrollView>

      <DatePickerModal 
        isVisible={showDatePicker} 
        onConfirm={onDateChange} 
        onCancel={() => setShowDatePicker(false)} 
        selectedDate={selectedDate}
      />
    </View>
  );
};

export default TodoApp;
