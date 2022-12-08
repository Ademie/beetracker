import React, { useEffect, useState, useContext } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Link
} from '@chakra-ui/react';
import '../datatable/datatable.scss';
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

const Investstable = ({ title }) => {
  const [investments, setInvestments] = useState([]);
  const { currentUser } = useContext(AuthContext);


  useEffect(() => {
    const investRef = collection(db, "users", currentUser.uid, "investments");
    const q = query(investRef, orderBy('timeStamp'))
    const unsub = onSnapshot(
      q,
      snapshot => {
        let list = [];
        snapshot.docs.forEach(doc => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setInvestments(list);
      },
      error => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, [currentUser.uid]);


  const handleDelete = async id => {
    try {
      await deleteDoc(doc(db, 'investments', id));
      setInvestments(investments.filter(saving => saving.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {title}
        <Link _hover={{ textDecoration: 'none' }} href="/investments/new" className='link'>
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
                    setInvestments(
                      investments.map(investment => {
                        investment.select = checked;
                        return investment;
                      })
                    );
                  }}
                />
              </Th>
              <Th>Date</Th>
              <Th>Name</Th>
              <Th>Amount</Th>
              <Th>Debited Account</Th>
              <Th>Type</Th>
              <Th>Purpose</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {investments.map((investment, i) => (
              <Tr key={investment.id}>
                <Td>
                  <input
                    onChange={event => {
                      let checked = event.target.checked;
                      setInvestments(
                        investments.map(data => {
                          if (investment.id === data.id) {
                            data.select = checked;
                          }
                          return data;
                        })
                      );
                    }}
                    type="checkbox"
                    checked={investment.select}
                  />
                </Td>

                <Td>{new Date(investment.timeStamp.seconds * 1000).toLocaleDateString()}</Td>
                <Td>{investment.investname}</Td>
                <Td>{investment.amount}</Td>
                <Td fontSize='sm'>Debited Account</Td>
                <Td fontSize='sm'>Type</Td>
                <Td fontSize='sm'>Purpose</Td>
                <Td fontSize='sm'>
                  <Link _hover={{ textDecoration: 'none' }} >
                    <span className='view'>Edit</span>
                  </Link>
                </Td>
                <Td fontSize='sm' onClick={() => handleDelete(investment.id)}>
                  <span className="delete">Delete</span>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Investstable;
// checkbox in datatable
// https://www.youtube.com/watch?v=tB8k-X-_yBE
