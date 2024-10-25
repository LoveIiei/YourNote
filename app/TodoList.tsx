import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Todo, ViewMode } from './TodoTypes';
import { Check, Trash2 } from 'lucide-react-native';
import { isToday, isThisWeek, isThisMonth, groupTodosByDate } from '../utils/dateUtils';

interface TodoListProps {
  todos: Todo[];
  darkMode: boolean;
  toggleStatus: (id: number) => void;
  deleteTodo: (id: number) => void;
  viewMode: ViewMode;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  darkMode,
  toggleStatus,
  deleteTodo,
  viewMode
}) => {
  const filterTodosByDate = (todos: Todo[]) => {
    return todos.filter(todo => {
      const todoDate = new Date(todo.date);
      switch (viewMode) {
        case 'day':
          return isToday(todoDate);
        case 'week':
          return isThisWeek(todoDate);
        case 'month':
          return isThisMonth(todoDate);
        default:
          return true;
      }
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const formatTime = (date: Date | string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone // Ensure correct timezone is used
    });
  };

  const formatDateHeader = (dateString: string) => {
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      console.error('Invalid date:', dateString);
      return 'Invalid Date';
    }

    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    });
  };

  const filteredTodos = filterTodosByDate(todos);
  const groupedTodos = groupTodosByDate(filteredTodos);

  if (filteredTodos.length === 0) {
    return (
      <View style={[styles.todoItem, { backgroundColor: darkMode ? '#1F2937' : '#F3F4F6' }]}>
        <Text style={[styles.todoText, { color: darkMode ? '#9CA3AF' : '#6B7280' }]}>
          No tasks for this {viewMode}
        </Text>
      </View>
    );
  }

  return (
    <>
      {Object.entries(groupedTodos).map(([dateKey, todosForDate]) => (
        <View key={dateKey} style={styles.dateGroup}>
          <Text style={[
            styles.dateHeader,
            { color: darkMode ? '#FFFFFF' : '#000000' }
          ]}>
            {formatDateHeader(dateKey)}
          </Text>
          
          {todosForDate.map(todo => (
            <View
              key={todo.id}
              style={[
                styles.todoItem,
                { backgroundColor: darkMode ? '#1F2937' : '#F3F4F6' }
              ]}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.todoText,
                    { color: darkMode ? '#FFFFFF' : '#000000' },
                    todo.status === 'DONE' && styles.todoTextDone
                  ]}
                >
                  {todo.text}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: darkMode ? '#9CA3AF' : '#6B7280',
                    marginTop: 4
                  }}
                >
                  {formatTime(todo.date)}
                </Text>
              </View>
              
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: todo.status === 'DONE' ? '#065F46' : '#92400E' }
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    { color: todo.status === 'DONE' ? '#6EE7B7' : '#FCD34D' }
                  ]}
                >
                  {todo.status}
                </Text>
              </View>
              
              <TouchableOpacity
                onPress={() => toggleStatus(todo.id)}
                style={styles.iconButton}
              >
                <Check size={20} color={darkMode ? '#9CA3AF' : '#4B5563'} />
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => deleteTodo(todo.id)}
                style={styles.iconButton}
              >
                <Trash2 size={20} color={darkMode ? '#9CA3AF' : '#4B5563'} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ))}
    </>
  );
};

export default TodoList;
