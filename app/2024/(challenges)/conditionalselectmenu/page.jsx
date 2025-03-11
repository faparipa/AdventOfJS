'use client';
import { useState } from 'react';
import styles from './selectmenu.module.css';
import data from '@/menu.json';

function SelectMenuPage() {
  // Állapotok a legördülő menük kiválasztásához
  const [selectedPeople, setSelectedPeople] = useState('default');
  const [selectedCategory, setSelectedCategory] = useState('default');
  const [selectedSubcategory, setSelectedSubcategory] = useState('default');

  // Kiválasztott személyekhez tartozó adat
  const selectedPeopleData = data.find(
    (entry) => entry.people === selectedPeople
  );

  // Kiválasztott kategória alapú szűrés
  const selectedCategoryData = selectedPeopleData
    ? selectedPeopleData.items.find(
        (item) => item.category === selectedCategory
      )
    : null;

  // Kiválasztott személy változása
  const handlePeopleChange = (event) => {
    setSelectedPeople(event.target.value);
    setSelectedCategory('default'); // Kategória visszaállítása, ha a személy választás változik
    setSelectedSubcategory('default'); // Alkategoriák visszaállítása
  };

  // Kiválasztott kategória változása
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedSubcategory('default'); // Alkategoriák visszaállítása, ha kategória változik
  };

  // Kiválasztott alkategoriák változása
  const handleSubcategoryChange = (event) => {
    setSelectedSubcategory(event.target.value);
  };

  return (
    <div className={styles.container}>
      {/* Első legördülő menü: Személyek */}
      <select
        className={styles.select}
        value={selectedPeople}
        onChange={handlePeopleChange}
      >
        <option value='default'>Choose One</option>
        {data.map((entry, i) => (
          <option key={i} value={entry.people}>
            {entry.people}
          </option>
        ))}
      </select>

      {/* Második legördülő menü: Kategóriák */}
      {selectedPeople !== 'default' && (
        <select
          className={styles.select}
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value='default'>Choose Category</option>
          {selectedPeopleData.items.map((item, i) => (
            <option key={i} value={item.category}>
              {item.category}
            </option>
          ))}
        </select>
      )}

      {/* Harmadik legördülő menü: Alkategoriák */}
      {selectedCategory !== 'default' &&
        selectedPeople !== 'default' &&
        selectedCategoryData &&
        selectedCategoryData.options.length > 0 && (
          <select
            className={styles.select}
            value={selectedSubcategory}
            onChange={handleSubcategoryChange}
          >
            <option value='default'>Choose Subcategory</option>
            {selectedCategoryData.options.map((option, i) => (
              <option key={i} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
    </div>
  );
}

export default SelectMenuPage;
