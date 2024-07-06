import React, { useState } from "react";
import AppHeader from "./AppHeader";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Textarea,
} from "@nextui-org/react";

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
  return (
    <>
      <Button
        color="secondary"
        startContent={<i className="fa-solid fa-arrow-left-long"></i>}
        onPress={() => setTableOpen(false)}
      >
        Reset
      </Button>
      <Card className="max-w-[100%] w-full max-h-[90%] h-auto ">
        <CardHeader className="font-bold text-xl">Emails</CardHeader>

        <CardBody className="flex align-start justify-between flex-row">
          <>
            <h2>Email list</h2>
          </>
          <>
            <Textarea
              label="Emailing List"
              variant="faded"
              placeholder="Emails will be listed here..."
              disableAnimation
              disableAutosize
              classNames={{
                base: "max-w-screen-md ",
                input: "resize-y min-h-[200px]  w-full text-md",
              }}
            />
          </>
        </CardBody>
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
