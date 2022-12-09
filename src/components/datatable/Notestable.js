import React, { useContext, useState, useEffect } from 'react';
import './notestable.scss';
import {
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Link,
} from '@chakra-ui/react';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { FaBookReader, FaDownload } from 'react-icons/fa';
import { ImPrinter, ImQuill } from 'react-icons/im';
import { db } from '../../firebase';
import { AuthContext } from '../../context/AuthContext';


const Notestable = () => {
  const [notes, setNotes] = useState([]);
  const { currentUser } = useContext(AuthContext);


  // FETCH noteS DATA
  useEffect(() => {
    const notesRef = collection(db, "users", currentUser.uid, "notes");
    const q = query(notesRef, orderBy('timeStamp'))
    const unsub = onSnapshot(
      q,
      snapshot => {
        let list = [];
        snapshot.docs.forEach(doc => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setNotes(list);
      },
      error => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, [currentUser.uid]);

  // DELETE note
  const handleDelete = async id => {
    try {
      await deleteDoc(doc(db, 'notes', id));
      setNotes(notes.filter(note => note.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="notestable">
      <div className="top">
        <Heading size="sm">Notes</Heading>
        <div className="right">
          <div className="content">
            <ImPrinter />
            <Text>Print</Text>
          </div>

          <div className="content">
            <FaBookReader />
            <Link
              _hover={{ textDecoration: 'none' }}
              href="/notes/new"
              className="link"
            >
              Add New
            </Link>
          </div>
        </div>
      </div>
      {/* MAIN TABLE */}

      <TableContainer>
        <Table variant="striped" colorScheme="gray">
          <TableCaption>Keep short financial notes</TableCaption>
          <Thead>
            <Tr>
              <Th>
                <input
                  type="checkbox"
                  onChange={e => {
                    let checked = e.target.checked;
                    setNotes(
                      notes.map(note => {
                        note.select = checked;
                        return note;
                      })
                    );
                  }}
                />
              </Th>
              <Th>Date</Th>
              <Th>Title</Th>
              <Th>Text</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {notes.map(note => (
              <Tr key={note.id}>
                <Td>
                  <input
                    onChange={event => {
                      let checked = event.target.checked;
                      setNotes(
                        notes.map(data => {
                          if (note.id === data.id) {
                            data.select = checked;
                          }
                          return data;
                        })
                      );
                    }}
                    type="checkbox"
                    checked={note.select}
                  />
                </Td>
                <Td>{new Date(note.timeStamp.seconds * 1000).toLocaleDateString()}</Td>
                <Td>{note.title}</Td>
                <Td>{note.text}</Td>
                <Td>
                  <Link _hover={{ textDecoration: 'none' }} href="/notes/new">
                    <span className="view">edit</span>
                  </Link>
                </Td>
                <Td onClick={() => handleDelete(note.id)}>
                  <span className="delete">delete</span>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Notestable;
