import React from 'react';
import {View, StyleSheet } from '@react-pdf/renderer';
import InvoiceTableHeader from './InvoiceTableHeader'
import InvoiceTableRow from './InvoiceTableRow'
import InvoiceTableBlankSpace from './InvoiceTableBlankSpace'
import InvoiceTableFooter from './InvoiceTableFooter'

const tableRowsCount = 11;

const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 24,
        borderWidth: 1,
        borderColor: '#bff0fd',
    },
});

  const InvoiceItemsTable = ({invoice}) => (
    <View style={styles.tableContainer}>
        <InvoiceTableHeader />
        <InvoiceTableRow items={invoice.billItems} />
        <InvoiceTableBlankSpace rowsCount={ invoice.hasOwnProperty("items") ? (tableRowsCount - invoice?.items?.length) : (tableRowsCount)} />
        <InvoiceTableFooter amount={invoice.TOTAL_AMOUNT} />
    </View>
  );
  
  export default InvoiceItemsTable