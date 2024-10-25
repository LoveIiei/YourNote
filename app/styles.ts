import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { flexDirection: 'column', marginBottom: 24 },
  headerLeft: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', marginRight: 12 },
  darkModeButton: { padding: 8, borderRadius: 8 },
  viewModeButtons: { flexDirection: 'row', gap: 8 },
  viewModeButton: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, backgroundColor: '#374151' },
  viewModeButtonActive: { backgroundColor: '#3B82F6' },
  viewModeButtonText: { color: '#D1D5DB' },
  viewModeButtonTextActive: { color: '#FFFFFF' },
  addTodoContainer: { flexDirection: 'row', marginBottom: 24, gap: 8 },
  input: { flex: 1, padding: 12, borderRadius: 8 },
  dateButton: { padding: 12, borderRadius: 8, backgroundColor: '#374151' },
  addButton: { padding: 12, borderRadius: 8, backgroundColor: '#374151' },
  sectionTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  todoList: { flex: 1 },
  dateGroup: { marginBottom: 24 },
  dateHeader: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  todoItem: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 8, marginBottom: 8 },
  todoText: { flex: 1 },
  todoTextDone: { textDecorationLine: 'line-through', opacity: 0.5 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, marginHorizontal: 8 },
  statusText: { fontSize: 12, fontWeight: '500' },
  iconButton: { padding: 4 },
});

export default styles;
