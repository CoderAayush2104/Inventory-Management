import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

import logo from "../assets/favicon.png";

import InvoiceTitle from "./Invoice/InvoiceTitle";
import BillTo from "./Invoice/BillTo";
import { InvoiceNo } from "./Invoice/InvoiceNo";
import InvoiceItemsTable from "./Invoice/InvoiceItemsTable";
import InvoiceThankYouMsg from "./Invoice/InvoiceThankYouMsg";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  logo: {
    width: 74,
    height: 66,
    marginLeft: "auto",
    marginRight: "auto",
  },
});

const Invoice = ({ invoice }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image style={styles.logo} src={logo} />
      <InvoiceTitle title="Invoice" />
      <InvoiceNo invoice={invoice} />
      <BillTo invoice={invoice} />
      <InvoiceItemsTable invoice={invoice} />
      <InvoiceThankYouMsg />
    </Page>
  </Document>
);

export default Invoice;
