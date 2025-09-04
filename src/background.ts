chrome.runtime.onInstalled.addListener(() => {
  console.log('TextRemapper extension installed');
});

chrome.action.onClicked.addListener((tab) => {
  console.log('Extension icon clicked', tab);
});

// Handle messages from content script
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  console.log('Background script received message:', request);
  
  switch (request.action) {
    case 'saveNote':
      try {
        // Get existing notes
        const result = await chrome.storage.sync.get(['notes']);
        const existingNotes = result.notes || [];
        
        // Create new note
        const newNote = {
          id: Date.now().toString(),
          title: request.data.title,
          content: request.data.content,
          timestamp: request.data.timestamp,
          url: request.data.url
        };
        
        // Save updated notes
        const updatedNotes = [...existingNotes, newNote];
        await chrome.storage.sync.set({ notes: updatedNotes });
        
        sendResponse({ success: true, noteId: newNote.id });
        
        // Show notification
        chrome.notifications.create({
          type: 'basic',
          iconUrl: '../public/vite.svg',
          title: 'TextRemapper',
          message: 'Text saved as note!'
        });
        
      } catch (error) {
        console.error('Error saving note:', error);
        const errorMessage = (error instanceof Error) ? error.message : String(error);
        sendResponse({ success: false, error: errorMessage });
      }
      break;
      
    default:
      sendResponse({ error: 'Unknown action' });
  }
  
  return true; // Keep message channel open for async response
});