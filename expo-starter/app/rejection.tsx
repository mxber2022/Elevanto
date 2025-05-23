import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, FlatList } from 'react-native';
import { usePrivy } from '@privy-io/expo';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

interface Challenge {
  id: number;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  completed: boolean;
}

export default function Rejection() {
  const { user } = usePrivy();
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 1,
      title: "Ask for a Discount",
      description: "Ask for a discount at a store where it's not typically offered",
      difficulty: "Easy",
      completed: false
    },
    {
      id: 2,
      title: "Request a Free Upgrade",
      description: "Ask for a free upgrade on your next flight or hotel stay",
      difficulty: "Medium",
      completed: false
    },
    {
      id: 3,
      title: "Ask a Stranger for Directions",
      description: "Ask someone for directions to a place you already know how to get to",
      difficulty: "Easy",
      completed: false
    },
    {
      id: 4,
      title: "Request a Job Interview",
      description: "Ask for a job interview at a company you're interested in, even if they're not hiring",
      difficulty: "Hard",
      completed: false
    },
    {
      id: 5,
      title: "Ask for a Free Sample",
      description: "Request a free sample at a store where it's not typically offered",
      difficulty: "Easy",
      completed: false
    },
    {
      id: 6,
      title: "Request a Meeting with CEO",
      description: "Ask to meet with the CEO of a company you're interested in",
      difficulty: "Hard",
      completed: false
    },
    {
      id: 7,
      title: "Ask for a Better Table",
      description: "Request a better table at a restaurant when you're seated",
      difficulty: "Medium",
      completed: false
    },
    {
      id: 8,
      title: "Request a Price Match",
      description: "Ask a store to match a competitor's price",
      difficulty: "Medium",
      completed: false
    },
    {
      id: 9,
      title: "Ask for a Refund",
      description: "Request a refund for a product you've used",
      difficulty: "Hard",
      completed: false
    },
    {
      id: 10,
      title: "Ask for a Recommendation",
      description: "Ask someone you barely know for a professional recommendation",
      difficulty: "Medium",
      completed: false
    }
  ]);

  const toggleChallenge = (id: number) => {
    setChallenges(challenges.map(challenge => 
      challenge.id === id ? { ...challenge, completed: !challenge.completed } : challenge
    ));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return '#34C759';
      case 'Medium':
        return '#FF9500';
      case 'Hard':
        return '#FF3B30';
      default:
        return '#666';
    }
  };

  const renderChallenge = ({ item }: { item: Challenge }) => (
    <TouchableOpacity 
      style={[styles.challengeCard, item.completed && styles.completedCard]}
      onPress={() => toggleChallenge(item.id)}
    >
      <View style={styles.challengeHeader}>
        <View style={styles.titleContainer}>
          <Text style={[styles.challengeTitle, item.completed && styles.completedText]}>
            {item.title}
          </Text>
          <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(item.difficulty) }]}>
            <Text style={styles.difficultyText}>{item.difficulty}</Text>
          </View>
        </View>
        <Ionicons 
          name={item.completed ? "checkmark-circle" : "checkmark-circle-outline"} 
          size={24} 
          color={item.completed ? "#34C759" : "#666"} 
        />
      </View>
      <Text style={[styles.challengeDescription, item.completed && styles.completedText]}>
        {item.description}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Rejection Therapy</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {challenges.filter(c => c.completed).length}/{challenges.length}
          </Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {Math.round((challenges.filter(c => c.completed).length / challenges.length) * 100)}%
          </Text>
          <Text style={styles.statLabel}>Progress</Text>
        </View>
      </View>

      <FlatList
        data={challenges}
        renderItem={renderChallenge}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
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
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  listContainer: {
    padding: 20,
    paddingTop: 0,
  },
  challengeCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  completedCard: {
    backgroundColor: '#f8f9fa',
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    flex: 1,
  },
  challengeDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  completedText: {
    color: '#999',
    textDecorationLine: 'line-through',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
}); 