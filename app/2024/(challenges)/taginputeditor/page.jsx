'use client';
import { useRef, useState } from 'react';
import styles from './taginputeditor.module.css';
import Tag from '@/components/taginputeditor/Tag';

export default function TagInputEditorPage() {
  const [tags, setTags] = useState([]);
  const inputValue = useRef(null);

  console.log(tags);

  function handleKeyUp(e) {
    const newTag = inputValue.current.value.replace(',', ' ');
    if (e.key === ',' && newTag.trim().length > 0) {
      setTags([...tags, newTag]);
      inputValue.current.value = '';
    }

    if (e.key === 'Backspace' && newTag === '' && tags.length > 0) {
      setTags(tags.slice(0, tags.length - 1));
    }
  }

  function handleTagDelete(tagToRemove) {
    setTags(tags.filter((tag) => tag != tagToRemove));
  }
  //TODO: megoldani hogy a tagContainer minden eleme látszódjon flex wrap nem az igazi
  return (
    <div>
      <h2>Tag Input Editor</h2>
      <h3>Type and press ',' to add a tag</h3>
      <div className={styles.wrapper}>
        <span className={styles.title}> Tags</span>
        {tags.map((tag, i) => (
          <Tag
            key={i}
            text={tag}
            handleTagDelete={() => handleTagDelete(tag)}
          />
        ))}
        <input
          type='text'
          id='inputeritor'
          className={styles.inputField}
          ref={inputValue}
          onKeyUp={handleKeyUp}
        />
      </div>
    </div>
  );
}
