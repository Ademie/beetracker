import React, { useEffect, useContext, useState } from 'react';
import '../datatable/datatable.scss';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
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
import { db } from '../../firebase';
import { AuthContext } from '../../context/AuthContext';

const Cardstable = ({ title }) => {
  const [cards, setCards] = useState([]);
  const { currentUser } = useContext(AuthContext)
  useEffect(() => {
    const cardRef = collection(db, "users", currentUser.uid, "cards");
    const q = query(cardRef, orderBy('timeStamp'))
    const unsub = onSnapshot(
      q,
      snapshot => {
        let list = [];
        snapshot.docs.forEach(doc => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setCards(list);
      },
      error => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  // DELETE ACCOUNT
  const handleDelete = async id => {
    try {
      await deleteDoc(doc(db, 'cards', id));

      // await deleteDoc(doc(db, 'users', /*localUid,*/ 'cards', id));
      setCards(cards.filter(account => account.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {title}
        <Link
          _hover={{ textDecoration: 'none' }}
          href="/cards/new"
          className="link"
        >
          Add New
        </Link>

      </div>
      <TableContainer>
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>
                <input
                  type="checkbox"
                  onChange={e => {
                    let checked = e.target.checked;
                    setCards(
                      cards.map(card => {
                        card.select = checked;
                        return card;
                      })
                    );
                  }}
                />
              </Th>
              <Th>Date</Th>
              {/* <Th>Bank Name</Th> */}
              <Th>Card Name</Th>
              <Th>Card Number</Th>
              <Th fontSize='sm'>APR</Th>
              <Th>Current Balance</Th>
              <Th>Card Type</Th>
              <Th>Currency</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {cards.map(card => (
              <Tr key={card.id}>
                <Td>
                  <input
                    onChange={event => {
                      let checked = event.target.checked;
                      setCards(
                        cards.map(data => {
                          if (card.id === data.id) {
                            data.select = checked;
                          }
                          return data;
                        })
                      );
                    }}
                    type="checkbox"
                    checked={card.select}
                  />
                </Td>

                
                <Td fontSize='sm'>{new Date(card.timeStamp.seconds * 1000).toLocaleDateString()}
                </Td>
                {/* <Td fontSize='sm'>{card.bankname}</Td> */}
                <Td fontSize='sm'>{card.cardname}</Td>
                <Td fontSize='sm'>{`*** *** ${card.cardnumber}`}</Td>
                <Td fontSize='sm'>{card.apr}</Td>
                <Td>${card.currentbalance}</Td>
                <Td fontSize='sm'>cardtype</Td>
                <Td fontSize='sm'>currency</Td>
                <Td fontSize='sm'>
                  <Link _hover={{ textDecoration: 'none' }} href="/cards/editcard">
                    <span className="view">edit</span>
                  </Link>
                </Td>
                <Td fontSize='sm' onClick={() => handleDelete(card.id)}>
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

export default Cardstable;
