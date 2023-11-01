import React, { useState } from 'react';
import TableHead from './TableHead';
import TableBody from './TableBody';

const Table = ({ data }) => {
  const [tableData, setTableData] = useState(data);
  const columns = [
    { label: 'Symbol', accessor: 'symbol' },
    { label: 'Token Balance', accessor: 'total_coins' },
    { label: 'Total Cost', accessor: 'total_cost' },
    { label: 'Average price', accessor: 'price_per_coin' },
    { label: 'Percentage change', accessor: 'profit_loss_percentage' },
    { label: 'Current value', accessor: 'current_value' },
  ];

  return (
    <>
      <table className="table">
        <TableHead columns={columns} />
        <TableBody
          columns={columns}
          tableData={tableData}
        />
      </table>
    </>
  );
};

export default Table;
