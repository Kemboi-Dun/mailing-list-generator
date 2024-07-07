import  { useEffect, useState } from "react";
import AppHeader from "./AppHeader";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import EmailsTable from "./EmailsTable";
import useEmailStore from "./EmailStore";
import axios from "axios";

const UploadFile = (props: layout_interface) => {
  const { setTableOpen } = props;

  const { set_word_emails, set_emails } = useEmailStore();

  const [file, setFile] = useState<any>();
  

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8000/uploadfile/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const emails_response = response.data["Emails"];
      const email_length = response.data["Emails"].length;

      

      set_emails(emails_response);
      set_word_emails(emails_response);

      setTimeout(() => {
        setTableOpen(email_length > 0 ? true : false);
      }, 100);
    } catch (error) {
      console.error("There was an error uploading the file!", error);
    }
  };

  return (
    <div className="w-full max-h-[50vh] h-full  flex items-center justify-center">
      <Card className="max-w-[400px] max-h-[300px] h-full" shadow="md">
        <CardHeader className="text-lg font-bold">
          <p>Extract Emails from a word file</p>
          <i className="fa-solid fa-file-word ml-4 text-primary-500 text-2xl"></i>
        </CardHeader>
        <CardBody className="flex items-center justify-center  h-full ">
          <span className="text-center text-md font-semibold flex flex-col gap-2">
            <input
              type="file"
              onChange={handleFileChange}
              className="cursor-pointer"
            />
            <p>
              <Button
                color="primary"
                className="text-md font-bold mt-6"
                onClick={handleFileUpload}
                type="submit"
                endContent={<i className="fa-solid fa-upload"></i>}
                disabled={!file ? true : false}
              >
                Upload File
              </Button>
            </p>
          </span>
        </CardBody>
      </Card>
    </div>
  );
};

interface modal_interface {
  onOpenChange: () => void;
  isOpen: boolean;
  file_type: string;
  word_emails: string[];
}

const NameModals = (props: modal_interface) => {
  const [doc_file, set_doc_file] = useState("");

  const { onOpenChange, isOpen, file_type, word_emails } = props;

  const handleSaveWordFile = async () => {
    console.log(word_emails);
    try {
      const response = await axios.post(
        "http://localhost:8000/save_word/",
        word_emails,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${doc_file}.docx`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("There was an error saving the file!", error);
    }
  };

  const handleSaveExcelFile = async () => {
    console.log(word_emails);
    console.log(doc_file);
    try {
      const response = await axios.post(
        "http://localhost:8000/save_excel/",
        word_emails,
        {
          responseType: "blob",
        }
      );
// console.log(response);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${doc_file}.xlsx`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("There was an error downloading the file!", error);
    }
  };

  const saveFile = () => {
    if (file_type === "docx") {
      handleSaveWordFile();
    } else if (file_type === "xlsx") {
      handleSaveExcelFile();
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      isKeyboardDismissDisabled={false}
      backdrop="blur"
      size="xs"
      placement="center"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">File Name</ModalHeader>
            <ModalBody>
              <Input
                placeholder="Enter file name"
                onChange={(e) => set_doc_file(e.target.value)}
                endContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">
                      .{file_type}
                    </span>
                  </div>
                }
              />
            </ModalBody>
            <ModalFooter className="flex w-full justify-between">
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button
                color={file_type === "docx" ? "primary" : "success"}
                onPress={() => {
                  saveFile();
                  onClose();
                }}
                endContent={<i className="fa-solid fa-file-arrow-down"></i>}
              >
                Download
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

// a component to display the email list and word structure
const Email_list = (props: layout_interface) => {
  const { setTableOpen } = props;

  const [word_email, set_word_email] = useState("");

  const { word_emails } = useEmailStore();
  const [file_type, set_file_type] = useState("");

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const set_email = () => {
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
            onPress={() => {
              set_file_type("xlsx");
              onOpen();
            }}
          >
            Download Excel
          </Button>
          <Button
            color="primary"
            endContent={<i className="fa-solid fa-file-word"></i>}
            className="font-semibold my-8"
            onPress={() => {
              set_file_type("docx");
              onOpen();
            }}
          >
            Download Word
          </Button>
        </CardFooter>
      </Card>

      <NameModals
        onOpenChange={onOpenChange}
        isOpen={isOpen}
        file_type={file_type}
        word_emails={word_emails}
      />
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
