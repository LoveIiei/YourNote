import React from 'react';
import { Platform, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

interface DatePickerModalProps {
  isVisible: boolean;
  onConfirm: (date: Date) => void;
  onCancel: () => void;
  selectedDate: Date;
}

const DatePickerModal: React.FC<DatePickerModalProps> = ({
  isVisible,
  onConfirm,
  onCancel,
  selectedDate
}) => {
  if (Platform.OS === 'web') {
    return isVisible ? (
      <View style={styles.webPickerContainer}>
        <input
          type="date"
          style={styles.webDateInput}
          value={selectedDate.toISOString().split('T')[0]}
          onChange={(e) => {
            // Create date at noon to avoid timezone issues
            const date = new Date(e.target.value + 'T12:00:00');
            onConfirm(date);
          }}
        />
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={onCancel}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    ) : null;
  }

  return (
    <DateTimePickerModal
      isVisible={isVisible}
      mode="date"
      date={selectedDate || new Date()}
      onConfirm={(date) => {
        // Ensure consistent time of day
        date.setHours(12, 0, 0, 0);
        onConfirm(date);
      }}
      onCancel={onCancel}
      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
    />
  );
};

const styles = StyleSheet.create({
  webPickerContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -150 }, { translateY: -100 }],
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 300,
    zIndex: 1000,
  },
  webDateInput: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 4,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  cancelButton: {
    backgroundColor: '#374151',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default DatePickerModal;
