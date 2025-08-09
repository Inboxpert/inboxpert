import React from 'react';
import { useEmailStore } from '../common/store';
import Sidebar from './components/Sidebar';

export default function App() {
  const { status } = useEmailStore();
  
  return (
    <div className="ai-email-sorter">
      <Sidebar />
      <div className="status-indicator">
        AI Status: {status}
      </div>
    </div>
  );
}