import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import Home from './Home';
import Users from './Users';
import Courses from './Courses';
import Reports from './Reports';
import Settings from './Settings';

const Tab = createBottomTabNavigator();

const AdminDashboard = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Users':
              iconName = focused ? 'people' : 'people-outline';
              break;
            case 'Courses':
              iconName = focused ? 'book' : 'book-outline';
              break;
            case 'Reports':
              iconName = focused ? 'bar-chart' : 'bar-chart-outline';
              break;
            case 'Settings':
              iconName = focused ? 'settings' : 'settings-outline';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: styles.tabBar,
        headerShown: false,
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={Home}
        // options={{ title: 'Dashboard' }}
      />
      <Tab.Screen 
        name="Users" 
        component={Users}
        // options={{ title: 'Users Management' }}
      />
      <Tab.Screen 
        name="Courses" 
        component={Courses}
        // options={{ title: 'Courses Management' }}
      />
      <Tab.Screen 
        name="Reports" 
        component={Reports}
        // options={{ title: 'Reports' }}
      />
      <Tab.Screen 
        name="Settings" 
        component={Settings}
        // options={{ title: 'Settings' }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    paddingBottom: 5,
    paddingTop: 5,
  },
  header: {
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
});

export default AdminDashboard;