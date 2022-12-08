import React from 'react';
import './transactions.scss';
import {
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import { FaDownload } from 'react-icons/fa';
import { ImPrinter } from 'react-icons/im';

const Transactions = () => {
  const rows = [
    {
      id: 715,
      transaction: 'Investment in Crypto',
      date: '06/06/2022',
      status: 'Approved',
    },
    {
      id: 815,
      transaction: 'Investment in Crypto',
      date: '06/06/2022',
      status: 'Pending',
    },
    {
      id: 915,
      transaction: 'Investment in Crypto',
      date: '06/06/2022',
      status: 'Approved',
    },
    {
      id: 1015,
      transaction: 'Investment in Crypto',
      date: '06/06/2022',
      status: 'Approved',
    },
    {
      id: 1115,
      transaction: 'Investment in Crypto',
      date: '06/06/2022',
      status: 'Declined',
    },
  ];

  return (
    <div className="transactions">
      <div className="top">
        <Heading size="sm">Transactions</Heading>
        <div className="right">
          <div className="content">
            <ImPrinter />

            <Text>Print</Text>
          </div>
          <div className="content">
            <FaDownload />
            <Text>Download</Text>
          </div>
        </div>
      </div>
      {/* MAIN TABLE */}

      <TableContainer>
        <Table variant="striped" colorScheme="gray">
          <TableCaption>Latest Transactions Will Show Here</TableCaption>
          <Thead>
            <Tr>
              <Th>id</Th>
              <Th>Transaction</Th>
              <Th isNumeric>Date</Th>
              <Th isNumeric>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {rows.map(row => (
              <Tr key={row.id}>
                <Td>{`#${row.id}`}</Td>
                <Td>{row.transaction}</Td>
                <Td isNumeric>{row.date}</Td>
                <Td isNumeric>
                  <span className={`status ${row.status}`}>{row.status}</span>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Transactions;
