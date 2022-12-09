import React, { useEffect, useContext, useState } from 'react';
import '../datatable/datatable.scss';

import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
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
import { db } from '../../firebase';
import { AuthContext } from '../../context/AuthContext';

const Acctable = ({ title }) => {
  const [accounts, setAccounts] = useState([]);
  const { currentUser } = useContext(AuthContext);



  // FETCH ACCOUNTS DATA
  useEffect(() => {
    // REALTIME FETCHING OF DATA
    const acctRef = collection(db, "users", currentUser.uid, "accounts");
    // ORDER DATE BY TIMESTAMP
    const q = query(acctRef, orderBy('timeStamp'))
    const unsub = onSnapshot(
      q,
      snapshot => {
        let list = [];
        snapshot.docs.forEach(doc => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setAccounts(list);
      },
      error => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, [currentUser.uid]);

  // DELETE ACCOUNT
  const handleDelete = async id => {
    try {
      await deleteDoc(doc(db, 'accounts', id));

      // await deleteDoc(doc(db, 'users', /*localUid,*/ 'accounts', id));
      setAccounts(accounts.filter(account => account.id !== id));
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
          href="/accounts/new"
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
                    setAccounts(
                      accounts.map(account => {
                        account.select = checked;
                        return account;
                      })
                    );
                  }}
                />
              </Th>
              <Th>Date</Th>
              <Th>Bank Name</Th>
              <Th>Account Name</Th>
              <Th>Account Number</Th>
              <Th>Opening Balance</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {accounts.map(account => (
              <Tr key={account.id}>
                <Td>
                  <input
                    onChange={event => {
                      let checked = event.target.checked;
                      setAccounts(
                        accounts.map(data => {
                          if (account.id === data.id) {
                            data.select = checked;
                          }
                          return data;
                        })
                      );
                    }}
                    type="checkbox"
                    checked={account.select}
                  />
                </Td>


                <Td>{new Date(account.timeStamp.seconds * 1000).toLocaleDateString()}</Td>
                <Td>{account.bankname}</Td>
                <Td>{account.accountname}</Td>
                <Td>{`${account.accountnumber}`}</Td>
                <Td>${account.openingbalance}</Td>
                <Td>
                  <Link _hover={{ textDecoration: 'none' }} href="/accounts/editacct">
                    <span className="view">edit</span>
                  </Link>
                </Td>
                <Td onClick={() => handleDelete(account.id)}>
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

export default Acctable;
