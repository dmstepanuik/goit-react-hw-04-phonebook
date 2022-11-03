import { nanoid } from 'nanoid';
import { useEffect, useRef, useState } from 'react';
import Section from './Section/Section';
import Form from './Form/Form';
import SearchForm from './SearchForm/SearchForm';
import ContactList from './ContactList/ContactList';
import s from './App.module.css';

const LOCAL_KEY = 'Task04/contacts';

export function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const isFirst = useRef(true);

  useEffect(() => {
    const newContacts = isFirst.current
      ? JSON.parse(localStorage.getItem(LOCAL_KEY)) ?? contacts
      : contacts;

    if (isFirst.current) setContacts(() => [...newContacts]);

    isFirst.current = false;

    localStorage.setItem(LOCAL_KEY, JSON.stringify(newContacts));
  }, [contacts]);

  const onChangeFilter = value => {
    setFilter(value);
  };

  const getFilteredContacts = () => {
    return contacts.filter(it => it.name.toLowerCase().includes(filter));
  };

  const addContact = contact => {
    if (contacts.some(it => it.name === contact.name)) {
      alert(`${contact.name} is alredy in contacts`);

      return;
    }
    contact.id = nanoid(4);
    setContacts([...contacts, contact]);
  };

  const deleteContact = id => {
    setContacts(prev => prev.filter(it => it.id !== id));
  };

  const filteredContacts = getFilteredContacts();

  return (
    <div className={s.container}>
      <Section title="Phone Book">
        <Form getValue={addContact} />
      </Section>

      <Section title="Contacts">
        <SearchForm value={filter} onChangeValue={onChangeFilter} />
        <ContactList
          contacts={filteredContacts}
          deleteContact={deleteContact}
        />
      </Section>
    </div>
  );
}
