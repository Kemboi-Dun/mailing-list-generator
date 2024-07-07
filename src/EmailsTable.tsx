import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Selection,
} from "@nextui-org/react";
import useEmailStore from "./EmailStore";
import { useEffect, useMemo, useState } from "react";

const EmailsTable = () => {
  const { emails, get_emails } = useEmailStore();

  const columns = [
    {
      key: "email",
      label: "Emails",
    },
  ];

  //   console.log(emails)
  const test_data = [
    "linden.copeland@gmail.com",
    "x98nzphw9q3eb79z7z@hotmail.com",
    "mika.benjamin@aol.com",
    "z6utvq19x0b8zanhfhby@comcast.net",
    "zach.bradley@ymail.com",
    "5eitfw1krybv76kc5h@rediffmail.com",
    "lloyde.boyle@msn.com",
    "bp5nkuftgqw0d6@aol.com",
    "darryn.sellers@googlemail.com",
  ];

  const top_content = useMemo(() => {
    return (
      <span className="text-default-400 text-small">
        Total <b className="text-default-700">{emails.length}</b> emails
        found
      </span>
    );
  }, [emails.length]);

  useEffect(() => { 
    get_emails();
    // set_word_emails(test_data);
  }, []);

  return (
    <div>
      <Table
        aria-label="Emails list"
        topContent={top_content}
        topContentPlacement="outside"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={emails} emptyContent={"No emails to display."}>
          {(item) => (
            <TableRow key={item.email}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default EmailsTable;
