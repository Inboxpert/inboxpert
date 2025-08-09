import React from 'react';

export default function Sidebar() {
  return (
    <div className="ai-sidebar">
      <div className="sidebar-header">
        <h3 className="text-lg font-semibold">AI Email Sorter</h3>
      </div>
      
      <div className="categories">
        <div className="category important">Important</div>
        <div className="category promotions">Promotions</div>
        <div className="category social">Social</div>
        <div className="category other">Other</div>
      </div>
      
      <div className="ai-status">
        <div className="status-light"></div>
        <span>Initializing AI...</span>
      </div>
    </div>
  );
}