import React from 'react';
import Card from '../Common/Card';

const Suggestions = ({ suggestions }) => {
  // Check if we have valid suggestions
  if (!suggestions || !Array.isArray(suggestions) || suggestions.length === 0) {
    return (
      <Card>
        <div className="text-center py-6">
          <p className="text-gray-500">No suggestions available yet.</p>
        </div>
      </Card>
    );
  }

  // Group suggestions by section
  const groupedSuggestions = suggestions.reduce((acc, suggestion) => {
    const { section } = suggestion;
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(suggestion);
    return acc;
  }, {});

  return (
    <Card>
      <h2 className="text-2xl font-bold mb-6">Improvement Suggestions</h2>
      
      <div className="space-y-8">
        {Object.entries(groupedSuggestions).map(([section, sectionSuggestions]) => (
          <div key={section} className="border-b pb-6 last:border-b-0 last:pb-0">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">{section}</h3>
            
            <ul className="space-y-4">
              {sectionSuggestions.map((suggestion, index) => (
                <li key={index} className="bg-blue-50 p-4 rounded-md">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-0.5">
                      <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-md font-medium text-gray-800">{suggestion.title}</h4>
                      <p className="mt-1 text-gray-600">{suggestion.description}</p>
                      
                      {suggestion.examples && suggestion.examples.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm font-medium text-gray-700">Examples:</p>
                          <ul className="list-disc list-inside mt-1 pl-2 text-sm text-gray-600">
                            {suggestion.examples.map((example, idx) => (
                              <li key={idx}>{example}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {suggestion.priority && (
                        <span className={`inline-flex items-center mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          suggestion.priority === 'high' ? 'bg-red-100 text-red-800' :
                          suggestion.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {suggestion.priority.charAt(0).toUpperCase() + suggestion.priority.slice(1)} Priority
                        </span>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Suggestions;