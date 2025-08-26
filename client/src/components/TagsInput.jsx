import React, { useState } from 'react';

const TagsInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
        setInputValue('');
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, index) => (
          <div key={index} className="flex items-center bg-[#FF7EB6] text-black text-sm px-2 py-1 rounded-full">
            <span>{tag}</span>
            <button
              type="button"
              className="ml-2 text-white"
              onClick={() => removeTag(tag)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder="Add a tag and press Enter"
        className="w-full p-3 rounded-lg bg-black/70 text-white focus:outline-none focus:ring-2 focus:ring-[#FF7EB6] transition"
      />
    </div>
  );
};

export default TagsInput;
