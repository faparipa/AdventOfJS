'use client';
import React, { useState } from 'react';
import Form from 'next/form';
import styles from './movies.module.css';

export default function SearchInput({ search, setSearch }) {
  //console.log(search);

  return (
    <Form action='./' className={styles.container}>
      <input
        type='text'
        name='query'
        placeholder='Search your fav movie'
        className={styles.input_text}
        defaultValue={search}
        onChange={(event) => setSearch(event.target.value)}
      />
    </Form>
  );
}
