import { nanoid } from 'nanoid';
import { Component } from 'react';
import Section from './Section/Section';
import Form from './Form/Form';
import SearchForm from './SearchForm/SearchForm';
import ContactList from './ContactList/ContactList';
import s from './App.module.css';

const LOCAL_KEY = 'Task03/contacts ';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts =
      JSON.parse(localStorage.getItem(LOCAL_KEY)) ?? this.state.contacts;

    this.setState(() => ({ contacts }));
    localStorage.setItem(LOCAL_KEY, JSON.stringify(contacts));
  }
  componentDidUpdate(_, prevState) {
    if (this.state.contacts === prevState.contacts) return;

    localStorage.setItem(LOCAL_KEY, JSON.stringify(this.state.contacts));
  }

  onChangeFilter = value => {
    this.setState({
      filter: value,
    });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(it => it.name.toLowerCase().includes(filter));
  };

  addContact = contact => {
    if (this.state.contacts.some(it => it.name === contact.name)) {
      alert(`${contact.name} is alredy in contacts`);

      return;
    }
    contact.id = nanoid(4);
    this.setState({ contacts: [...this.state.contacts, contact] });
  };

  deleteContact = id => {
    this.setState({ contacts: this.state.contacts.filter(it => it.id !== id) });
  };

  render() {
    const { filter } = this.state;
    const { addContact, onChangeFilter, deleteContact } = this;
    const filteredContacts = this.getFilteredContacts();

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
}
