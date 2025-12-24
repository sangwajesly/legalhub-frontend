import {
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  deleteDoc,
  updateDoc
} from 'firebase/firestore';
import { db, auth } from './firebase';
import {
  Message,
  Session,
  SessionSummary,
  SendMessageResponse
} from '@/types';

export interface GetSessionsResponse {
  sessions: SessionSummary[];
}

export interface GetMessagesResponse {
  messages: Message[];
}

export const chatApi = {
  createSession: async (
    sessionData: Partial<Session>
  ): Promise<Session> => {
    if (!auth.currentUser) {
      throw new Error('User not authenticated');
    }
    const sessionRef = await addDoc(collection(db, 'sessions'), {
      ...sessionData,
      userId: auth.currentUser.uid,
      createdAt: serverTimestamp()
    });
    return {
      id: sessionRef.id,
      ...sessionData,
      userId: auth.currentUser.uid,
      createdAt: new Date().toISOString()
    } as Session;
  },

  getSessions: async (): Promise<GetSessionsResponse> => {
    if (!auth.currentUser) {
      throw new Error('User not authenticated');
    }
    const q = query(
      collection(db, 'sessions'),
      where('userId', '==', auth.currentUser.uid),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const sessions: SessionSummary[] = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data()
        } as SessionSummary)
    );
    return { sessions };
  },

  deleteChatSession: async (sessionId: string): Promise<{ ok: boolean }> => {
    // This will be a bit more complex with subcollections.
    // For now, we'll just delete the session document.
    // A more complete solution would require a Cloud Function to delete the subcollection.
    await deleteDoc(doc(db, 'sessions', sessionId));
    return { ok: true };
  },

  sendMessage: async (
    sessionId: string,
    message: string,
    attachments: string[] = []
  ): Promise<SendMessageResponse> => {
    if (!auth.currentUser) {
      throw new Error('User not authenticated');
    }
    const messagesRef = collection(db, 'sessions', sessionId, 'messages');
    const newMessage: any = {
      sessionId,
      content: message,
      role: 'user',
      sender: {
        // Assuming the current user is always the sender when using this function
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName || 'User',
        avatar: auth.currentUser.photoURL || undefined
      },
      timestamp: new Date().toISOString(), // Or use serverTimestamp()
      attachments: attachments.map((url) => ({
        type: url.endsWith('.pdf') ? 'pdf' : 'image',
        url
      }))
    };
    await addDoc(messagesRef, {
      ...newMessage,
      createdAt: serverTimestamp()
    });

    // We need to return a SendMessageResponse, which includes the bot's reply.
    // Since we are now directly writing to Firestore, we don't have a bot reply.
    // We will have to change the logic in the component to listen for new messages.
    // For now, we will return a mock response.

    return {
      reply: 'This is a placeholder response. You should implement a listener for real-time updates.',
      sessionId
    };
  },

  getChatHistory: async (sessionId: string): Promise<GetMessagesResponse> => {
    const messagesRef = collection(db, 'sessions', sessionId, 'messages');
    const q = query(messagesRef, orderBy('createdAt'));
    const querySnapshot = await getDocs(q);
    const messages: Message[] = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data()
        } as Message)
    );
    return { messages };
  },

  submitFeedback: async (
    sessionId: string,
    messageId: string,
    rating: number,
    feedback?: string
  ): Promise<{ ok: boolean }> => {
    const feedbackRef = doc(
      db,
      'sessions',
      sessionId,
      'messages',
      messageId
    );
    await updateDoc(feedbackRef, {
      feedback: {
        rating,
        text: feedback
      }
    });
    return { ok: true };
  },

  uploadFile: async (file: File): Promise<{ url: string }> => {
    // This would require setting up Firebase Storage
    // For now, we'll return a placeholder
    console.warn('File upload is not implemented for Firebase yet.');
    return { url: `https://placehold.co/600x400?text=${file.name}` };
  }
};
