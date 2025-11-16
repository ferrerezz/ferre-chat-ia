import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Switch,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Markdown from 'react-native-markdown-display';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Configuración de la API de Gemini
const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export default function App() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [messageCount, setMessageCount] = useState(0);
  const scrollViewRef = useRef();
  const pulseAnim = useRef(new Animated.Value(0)).current;

  // Animación de pulso para el avatar de Ferre
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  // Sugerencias personalizadas de Ferre
  const suggestions = [
    '🔥 Cuéntame algo alucinante',
    '💻 Ayúdame con código',
    '🎯 Dame consejos de productividad',
    '🚀 Hablemos del futuro',
  ];

  // Mensajes de bienvenida aleatorios de Ferre
  const welcomeMessages = [
    '¡Ey! Soy Ferre, tu asistente IA. ¿Qué necesitas hoy?',
    '¡Hola! Soy Ferre. Estoy listo para ayudarte con lo que sea.',
    '¡Bienvenido! Yo soy Ferre, tu compañero digital. ¿En qué te puedo ayudar?',
    '¡Qué onda! Soy Ferre. Pregúntame lo que quieras.',
  ];

  // Función para enviar mensajes
  const sendMessage = async (text = inputText) => {
    if (!text.trim()) return;

    const userMessage = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    setMessageCount((prev) => prev + 1);

    try {
      // Usar el modelo gemini-2.5-flash (el actual y compatible)
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

      // Crear el prompt con historial de conversación
      const chat = model.startChat({
        history: messages.map((msg) => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }],
        })),
      });

      // Enviar mensaje y obtener respuesta en streaming
      const result = await chat.sendMessageStream(text);

      let fullResponse = '';
      const assistantMessage = { role: 'assistant', content: '' };
      setMessages((prev) => [...prev, assistantMessage]);

      // Procesar el stream de respuestas
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        fullResponse += chunkText;

        // Actualizar el último mensaje con el texto acumulado
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = {
            role: 'assistant',
            content: fullResponse,
          };
          return newMessages;
        });
      }
    } catch (error) {
      console.error('Error al comunicarse con Ferre:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: '❌ Oops, algo salió mal. Ferre está teniendo problemas para conectar. ¡Intenta de nuevo!',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Función para usar sugerencias
  const useSuggestion = (suggestion) => {
    const cleanText = suggestion.replace(/^[^\s]+\s/, ''); // Remover emoji
    sendMessage(cleanText);
  };

  // Colores según el tema con paleta personalizada de Ferre
  const colors = isDarkMode
    ? {
        background: ['#0a0e27', '#1a1f3a', '#16213e'],
        cardBg: 'rgba(255, 255, 255, 0.08)',
        text: '#ffffff',
        textSecondary: '#a0a0a0',
        inputBg: 'rgba(255, 255, 255, 0.12)',
        userBubble: '#ff6b35',
        assistantBubble: 'rgba(100, 200, 255, 0.15)',
        border: 'rgba(255, 255, 255, 0.15)',
        accent: '#ff6b35',
        ferreGradient: ['#ff6b35', '#ff8c42'],
      }
    : {
        background: ['#ffeaa7', '#fab1a0', '#ff7675'],
        cardBg: 'rgba(255, 255, 255, 0.95)',
        text: '#1a1a1a',
        textSecondary: '#555555',
        inputBg: 'rgba(255, 255, 255, 0.98)',
        userBubble: '#ff6b35',
        assistantBubble: 'rgba(255, 107, 53, 0.1)',
        border: 'rgba(0, 0, 0, 0.1)',
        accent: '#ff6b35',
        ferreGradient: ['#ff6b35', '#ff8c42'],
      };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <LinearGradient colors={colors.background} style={styles.gradient}>
        {/* Header personalizado de Ferre */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <LinearGradient
              colors={colors.ferreGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.ferreAvatarGradient}
            >
              <Animated.View
                style={{
                  opacity: pulseAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.6, 1],
                  }),
                }}
              >
                <MaterialCommunityIcons name="lightning-bolt" size={24} color="#ffffff" />
              </Animated.View>
            </LinearGradient>
            <View style={styles.headerTitleContainer}>
              <Text style={[styles.headerTitle, { color: colors.text }]}>
                Ferre
              </Text>
              <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
                Tu asistente IA
              </Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.messageCountBadge}>
              <Text style={styles.messageCountText}>{messageCount}</Text>
            </View>
            <Ionicons
              name={isDarkMode ? 'moon' : 'sunny'}
              size={20}
              color={colors.text}
              style={{ marginRight: 8 }}
            />
            <Switch
              value={isDarkMode}
              onValueChange={setIsDarkMode}
              trackColor={{ false: '#767577', true: '#ff6b35' }}
              thumbColor={isDarkMode ? '#ffd700' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Área de mensajes */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
        >
          {messages.length === 0 ? (
            <View style={styles.emptyState}>
              <LinearGradient
                colors={colors.ferreGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.ferreAvatarLarge}
              >
                <MaterialCommunityIcons name="lightning-bolt" size={60} color="#ffffff" />
              </LinearGradient>
              <Text style={[styles.emptyText, { color: colors.text }]}>
                ¡Hola! Soy Ferre 🔥
              </Text>
              <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>
                {welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)]}
              </Text>

              {/* Sugerencias personalizadas */}
              <View style={styles.suggestionsContainer}>
                {suggestions.map((suggestion, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.suggestionButton,
                      { backgroundColor: colors.cardBg, borderColor: colors.border },
                    ]}
                    onPress={() => useSuggestion(suggestion)}
                  >
                    <Text style={[styles.suggestionText, { color: colors.text }]}>
                      {suggestion}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Footer con info de Ferre */}
              <View style={styles.ferreInfoContainer}>
                <MaterialCommunityIcons name="information" size={16} color={colors.textSecondary} />
                <Text style={[styles.ferreInfoText, { color: colors.textSecondary }]}>
                  Ferre usa Gemini 2.5 Flash - Respuestas rápidas y precisas
                </Text>
              </View>
            </View>
          ) : (
            messages.map((message, index) => (
              <View
                key={index}
                style={[
                  styles.messageBubbleContainer,
                  message.role === 'user' ? styles.userContainer : styles.assistantContainer,
                ]}
              >
                {message.role === 'assistant' && (
                  <LinearGradient
                    colors={colors.ferreGradient}
                    style={styles.ferreAvatarSmall}
                  >
                    <MaterialCommunityIcons name="lightning-bolt" size={14} color="#ffffff" />
                  </LinearGradient>
                )}
                <View
                  style={[
                    styles.messageBubble,
                    message.role === 'user' ? styles.userBubble : styles.assistantBubble,
                    {
                      backgroundColor:
                        message.role === 'user'
                          ? colors.userBubble
                          : colors.assistantBubble,
                    },
                  ]}
                >
                  {message.role === 'assistant' ? (
                    <Markdown
                      style={{
                        body: {
                          color: isDarkMode ? colors.text : colors.text,
                          fontSize: 16,
                        },
                        heading1: {
                          color: colors.accent,
                          fontSize: 24,
                          fontWeight: 'bold',
                        },
                        heading2: {
                          color: colors.accent,
                          fontSize: 20,
                          fontWeight: 'bold',
                        },
                        code_inline: {
                          backgroundColor: isDarkMode
                            ? 'rgba(255, 107, 53, 0.2)'
                            : 'rgba(255, 107, 53, 0.1)',
                          color: colors.accent,
                          padding: 4,
                          borderRadius: 4,
                          fontWeight: 'bold',
                        },
                        code_block: {
                          backgroundColor: isDarkMode
                            ? 'rgba(255, 107, 53, 0.15)'
                            : 'rgba(255, 107, 53, 0.1)',
                          color: colors.text,
                          padding: 10,
                          borderRadius: 8,
                        },
                        fence: {
                          backgroundColor: isDarkMode
                            ? 'rgba(255, 107, 53, 0.15)'
                            : 'rgba(255, 107, 53, 0.1)',
                          color: colors.text,
                          padding: 10,
                          borderRadius: 8,
                        },
                        link: { color: colors.accent },
                        list_item: { color: colors.text },
                      }}
                    >
                      {message.content}
                    </Markdown>
                  ) : (
                    <Text style={[styles.messageText, { color: '#ffffff' }]}>
                      {message.content}
                    </Text>
                  )}
                </View>
              </View>
            ))
          )}

          {isLoading && (
            <View style={styles.loadingContainer}>
              <LinearGradient
                colors={colors.ferreGradient}
                style={styles.ferreAvatarSmall}
              >
                <MaterialCommunityIcons name="lightning-bolt" size={14} color="#ffffff" />
              </LinearGradient>
              <View style={[styles.loadingBubble, { backgroundColor: colors.assistantBubble }]}>
                <ActivityIndicator size="small" color={colors.accent} />
                <Text style={[styles.loadingText, { color: colors.text }]}>
                  Ferre está pensando...
                </Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input de texto */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          <View
            style={[
              styles.inputContainer,
              { backgroundColor: colors.inputBg, borderColor: colors.border },
            ]}
          >
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholder="Pregúntale a Ferre..."
              placeholderTextColor={colors.textSecondary}
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={2000}
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                !inputText.trim() && styles.sendButtonDisabled,
              ]}
              onPress={() => sendMessage()}
              disabled={!inputText.trim() || isLoading}
            >
              <LinearGradient
                colors={
                  inputText.trim()
                    ? colors.ferreGradient
                    : ['rgba(255, 107, 53, 0.3)', 'rgba(255, 140, 66, 0.3)']
                }
                style={styles.sendButtonGradient}
              >
                <Ionicons
                  name="send"
                  size={20}
                  color={inputText.trim() ? '#ffffff' : colors.textSecondary}
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  ferreAvatarGradient: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    shadowColor: '#ff6b35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageCountBadge: {
    backgroundColor: '#ff6b35',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 12,
  },
  messageCountText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 15,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  ferreAvatarLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#ff6b35',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  emptyText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  suggestionsContainer: {
    marginTop: 30,
    width: '100%',
    paddingHorizontal: 20,
  },
  suggestionButton: {
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    borderWidth: 1,
  },
  suggestionText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  ferreInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  ferreInfoText: {
    fontSize: 12,
    marginLeft: 8,
    fontStyle: 'italic',
  },
  messageBubbleContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-end',
  },
  userContainer: {
    justifyContent: 'flex-end',
  },
  assistantContainer: {
    justifyContent: 'flex-start',
  },
  ferreAvatarSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 15,
    borderRadius: 20,
  },
  userBubble: {
    borderBottomRightRadius: 5,
    alignSelf: 'flex-end',
  },
  assistantBubble: {
    borderBottomLeftRadius: 5,
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  loadingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 20,
    borderBottomLeftRadius: 5,
    maxWidth: '80%',
  },
  loadingText: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 25,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100,
    paddingVertical: 8,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  sendButtonGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});
