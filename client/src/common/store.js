import create from 'zustand';

export const useEmailStore = create((set) => ({
  emails: [],
  categories: {
    important: { name: 'Important', count: 0, color: '#EF4444' },
    promotions: { name: 'Promotions', count: 0, color: '#10B981' },
    social: { name: 'Social', count: 0, color: '#3B82F6' },
    other: { name: 'Other', count: 0, color: '#6B7280' },
  },
  status: 'initializing',
  
  // Placeholder functions - will be implemented later
  setStatus: (status) => set({ status }),
  addEmail: (email) => set((state) => ({ 
    emails: [...state.emails, email] 
  })),
}));