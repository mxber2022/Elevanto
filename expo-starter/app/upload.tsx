import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, TextInput } from 'react-native';
import { usePrivy } from '@privy-io/expo';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import RejectionList from './components/RejectionList';

interface RejectionUpload {
  title: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface Rejection extends RejectionUpload {
  id: string;
  timestamp: number;
}

export default function Upload() {
  const { user } = usePrivy();
  const [upload, setUpload] = useState<RejectionUpload>({
    title: '',
    description: '',
    category: '',
    difficulty: 'Medium',
  });
  const [rejections, setRejections] = useState<Rejection[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(true);

  const categories = [
    'Work',
    'Personal',
    'Social',
    'Business',
    'Education',
    'Other'
  ];

  const difficulties = ['Easy', 'Medium', 'Hard'];

  const handleSubmit = () => {
    const newRejection: Rejection = {
      ...upload,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };
    
    setRejections([newRejection, ...rejections]);
    setUpload({
      title: '',
      description: '',
      category: '',
      difficulty: 'Medium',
    });
    setIsFormVisible(false);
  };

  const handleDelete = (id: string) => {
    setRejections(rejections.filter(rejection => rejection.id !== id));
  };

  const renderForm = () => (
    <View style={styles.formContainer}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Give your rejection a title"
          value={upload.title}
          onChangeText={(text) => setUpload({ ...upload, title: text })}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe your rejection experience..."
          multiline
          numberOfLines={4}
          value={upload.description}
          onChangeText={(text) => setUpload({ ...upload, description: text })}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Category</Text>
        <View style={styles.categoryContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                upload.category === category && styles.categoryButtonActive,
              ]}
              onPress={() => setUpload({ ...upload, category })}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  upload.category === category && styles.categoryButtonTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Difficulty</Text>
        <View style={styles.difficultyContainer}>
          {difficulties.map((difficulty) => (
            <TouchableOpacity
              key={difficulty}
              style={[
                styles.difficultyButton,
                upload.difficulty === difficulty && styles.difficultyButtonActive,
              ]}
              onPress={() => setUpload({ ...upload, difficulty: difficulty as 'Easy' | 'Medium' | 'Hard' })}
            >
              <Text
                style={[
                  styles.difficultyButtonText,
                  upload.difficulty === difficulty && styles.difficultyButtonTextActive,
                ]}
              >
                {difficulty}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.submitButton, (!upload.title || !upload.description || !upload.category) && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={!upload.title || !upload.description || !upload.category}
        >
          <Ionicons name="cloud-upload-outline" size={20} color="#fff" style={styles.submitButtonIcon} />
          <Text style={styles.submitButtonText}>Share Experience</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Share Your Rejection</Text>
          <Text style={styles.subtitle}>Help others learn from your experience</Text>
        </View>

        {isFormVisible ? (
          renderForm()
        ) : (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.newButton}
              onPress={() => setIsFormVisible(true)}
            >
              <Ionicons name="add-circle-outline" size={20} color="#fff" style={styles.submitButtonIcon} />
              <Text style={styles.submitButtonText}>Share New Rejection</Text>
            </TouchableOpacity>
          </View>
        )}

        <RejectionList rejections={rejections} onDelete={handleDelete} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  formContainer: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  categoryButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#666',
  },
  categoryButtonTextActive: {
    color: '#fff',
  },
  difficultyContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  difficultyButton: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
  },
  difficultyButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  difficultyButtonText: {
    fontSize: 14,
    color: '#666',
  },
  difficultyButtonTextActive: {
    color: '#fff',
  },
  buttonContainer: {
    padding: 20,
    paddingTop: 0,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  newButton: {
    backgroundColor: '#34C759',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonIcon: {
    marginRight: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 