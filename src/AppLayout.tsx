import React, { useEffect, useState } from "react";
import AppHeader from "./AppHeader";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Textarea,
} from "@nextui-org/react";
import EmailsTable from "./EmailsTable";
import useEmailStore from "./EmailStore";

const UploadFile = (props: layout_interface) => {
  const { setTableOpen } = props;

  return (
    <div className="w-full max-h-[50vh] h-full  flex items-center justify-center">
      <Card className="max-w-[400px] max-h-[200px] h-full" shadow="md">
        <CardBody className="flex items-center justify-center  h-full">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <Input
              type="file"
              placeholder="fileInput"
              className="hidden"
              //   ref={inputRef}

              accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
            />

            <span className="text-center text-md font-semibold flex flex-col gap-2">
              <i className="fa-solid fa-file-arrow-up text-4xl align-center w-full text-default-400 my-2"></i>
              <p>Drag and Drop files to upload</p>
              <p>or</p>
              <p>
                <Button
                  color="primary"
                  className="text-md font-bold"
                  onPress={() => setTableOpen(true)}
                >
                  Select File
                </Button>
              </p>
            </span>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

// a component to display the email list and word structure
const Email_list = (props: layout_interface) => {
  const { setTableOpen } = props;

  const [word_email, set_word_email] = useState("");

  // const emails = [
  //   {
  //     email: "jaxson.albert@outlook.com",
  //   },
  //   {
  //     email: "zzpbdc9pgv2xwf7cb9o@gmail.com",
  //   },
  //   {
  //     email: "z6jb1uxxjymy6m6@ymail.com",
  //   },
  //   {
  //     email: "jonah.vasquez@googlemail.com",
  //   },
  //   {
  //     email: "wu9awcuvowgxc@outlook.com",
  //   },
  //   {
  //     email: "jedidiah.bass@ymail.com",
  //   },
  //   {
  //     email: "oef0u0twtj3ma2moup@hotmail.com",
  //   },
  //   {
  //     email: " moore.drake@gmail.com",
  //   },
  //   {
  //     email: "f8h985yx4re7dnmj75x@yahoo.com",
  //   },
  //   {
  //     email: " daimhin.wright@gmail.com",
  //   },
  // ];

  const { word_emails } = useEmailStore();
  const set_email = () => {
    // const format_emails = word_emails.map((email) => {
    //   return email.email;
    // });
    const formatted_email = word_emails.join("; ");
    set_word_email(formatted_email);
  };

  useEffect(() => {
    set_email();
  }, [word_emails]);
  return (
    <>
      <Card className="max-w-[100%] w-full max-h-[80%] h-auto ">
        <CardHeader className="font-bold text-xl">
          <Button
            color="secondary"
            startContent={<i className="fa-solid fa-rotate-left"></i>}
            onPress={() => setTableOpen(false)}
            className="my-4"
          >
            Reset
          </Button>
        </CardHeader>

        <CardBody className="flex align-start justify-between flex-row">
          <>
            <EmailsTable />
          </>
          <>
            <Textarea
              label="Emailing List :: Copy the emails to your file"
              variant="flat"
              placeholder="Emails will be listed here..."
              disableAnimation
              disableAutosize
              value={word_email}
              classNames={{
                base: "max-w-screen-md ",
                input: "resize-y min-h-[200px]  w-full text-md",
              }}
            />
          </>
        </CardBody>
        <CardFooter className="flex align-end justify-end gap-8 ">
          <Button
            color="success"
            endContent={<i className="fa-solid fa-file-excel"></i>}
            className="font-semibold my-8"
          >
            Download Excel
          </Button>
          <Button
            color="primary"
            endContent={<i className="fa-solid fa-file-word"></i>}
            className="font-semibold my-8"
          >
            Download Word
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

interface layout_interface {
  setTableOpen: (bool_val: boolean) => void;
}
const AppLayout = () => {
  const [tableOpen, setTableOpen] = useState(false);

  return (
    <div className="max-w-[90%] w-full m-auto h-screen max-h-[100vh] flex flex-col gap-4 justify-start items-start">
      <AppHeader />
      {tableOpen ? (
        <Email_list setTableOpen={setTableOpen} />
      ) : (
        <UploadFile setTableOpen={setTableOpen} />
      )}
    </div>
  );
};

export default AppLayout;
