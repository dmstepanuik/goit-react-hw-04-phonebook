import { nanoid } from 'nanoid';
import { useEffect, useRef, useState } from 'react';
import Section from './Section/Section';
import Form from './Form/Form';
import SearchForm from './SearchForm/SearchForm';
import ContactList from './ContactList/ContactList';
import s from './App.module.css';

const LOCAL_KEY = 'Task03/contacts ';

export function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const isFirst = useRef(true);

  useEffect(() => {
    const newContacts = isFirst.current
      ? JSON.parse(localStorage.getItem(LOCAL_KEY)) ?? contacts
      : contacts;

    if (isFirst.current) setContacts({ newContacts });

    isFirst.current = false;

    localStorage.setItem(LOCAL_KEY, JSON.stringify(newContacts));
  }, [contacts]);

  // componentDidMount() {
  //   const contacts =
  //     JSON.parse(localStorage.getItem(LOCAL_KEY)) ?? this.state.contacts;

  //   this.setState(() => ({ contacts }));
  //   localStorage.setItem(LOCAL_KEY, JSON.stringify(contacts));
  // }
  // componentDidUpdate(_, prevState) {
  //   if (this.state.contacts === prevState.contacts) return;

  //   localStorage.setItem(LOCAL_KEY, JSON.stringify(this.state.contacts));
  // }

  const onChangeFilter = value => {
    setFilter({
      filter: value,
    });
  };

   const getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(it => it.name.toLowerCase().includes(filter));
  };

   const addContact = contact => {
    if (this.state.contacts.some(it => it.name === contact.name)) {
      alert(`${contact.name} is alredy in contacts`);

      return;
    }
    contact.id = nanoid(4);
    this.setState({ contacts: [...this.state.contacts, contact] });
  };

   const deleteContact = id => {
    this.setState({ contacts: this.state.contacts.filter(it => it.id !== id) });
  };

  // render() {
  //   const { filter } = this.state;
  //   const { addContact, onChangeFilter, deleteContact } = this;
  //   const filteredContacts = this.getFilteredContacts();

  //   return (
  //     <div className={s.container}>
  //       <Section title="Phone Book">
  //         <Form getValue={addContact} />
  //       </Section>

  //       <Section title="Contacts">
  //         <SearchForm value={filter} onChangeValue={onChangeFilter} />
  //         <ContactList
  //           contacts={filteredContacts}
  //           deleteContact={deleteContact}
  //         />
  //       </Section>
  //     </div>
  //   );
  // }
}
