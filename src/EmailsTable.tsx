import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import useEmailStore from "./EmailStore";
import { useMemo } from "react";

const EmailsTable = () => {
  const { word_emails, emails } = useEmailStore();

  const columns = [
    {
      key: "email",
      label: "Emails",
    },
  ];

  const top_content = useMemo(() => {
    return (
      <span className="text-default-400 text-small">
        Total emails found:{" "}
        <b className="text-default-700">{word_emails.length}</b>
      </span>
    );
  }, [word_emails.length]);

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
