import logo from "./logo.svg";
import "./App.css";
import web3 from "./web3";
import { useState,useEffect } from "react";
import { Web3Storage, getFilesFromPath } from "web3.storage";
import { VscJson, VscFilePdf } from "react-icons/vsc";
import { FiImage } from "react-icons/fi";
// import "./dataTable_custom.scss"
// import patient from "./patient";
import {
  Input,
  Card,
  CardBody,
  FormGroup,
  Label,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import DataTable from "react-data-table-component";

const abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DOCTOR_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PATIENT_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "addAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "addDoctor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "addPatient",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getHash",
    outputs: [
      {
        internalType: "string",
        name: "x",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "isAdmin",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "isDoctor",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "isPatient",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "removeDoctor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "x",
        type: "string",
      },
    ],
    name: "setHash",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const COLUMNS = [
  {
    name: "Icon",
    selector: "ICON",
    sortable: false,
    minWidth: "150px",
    cell: (row) => {
      row.type === "son" ? (
        <p>
          <VscJson size={30} color="black" />
        </p>
      ) : row.type === "pdf" ? (
        <p>
          <VscFilePdf size={30} color="black" />
        </p>
      ) : (
        <p>
          <FiImage size={30} color="black" />
        </p>
      );
    },
  },
  {
    name: "File name",
    selector: "FileName",
    sortable: true,
    minWidth: "250px",
    cell: (row) => <p className="text-bold-500 mb-0">{row.file}</p>,
  },
  {
    name: "Date of creation",
    selector: "DateCreation",
    sortable: true,
    minWidth: "250px",
    cell: (row) => (
      <p className="text-bold-500 mb-0">
        {new Date(row.lastModified).toISOString()}
      </p>
    ),
  },
];
function App() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDJFOGEyREY3MTJGMzdCNTk1NzYwNzQ0YmZCQzlFRTI1NDZhYTBCMjgiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTM0MjA2ODc2MDAsIm5hbWUiOiJUZXN0X0FwaSJ9.CyrPRZBq4Dj0WvrNBOCCn7hBZUAblnKN13ILSz--ipw";

  const storage = new Web3Storage({ token });
  const [file, setfile] = useState("");
  const [fileReturn, setfileReturn] = useState("file before upload");
  const [cid, setCid] = useState("");
  const [patientId, setPatientId] = useState("");
  const [isDoctor, setIsDoctor] = useState();
  const [isPatient, setIsPatient] = useState();
  const [dataCollected, setDataCollected] = useState(false);
  const [data, setData] = useState();
  const [rowData, setRowData] = useState({ lien: "" });
  const [modal, setModal] = useState(false);
  useEffect(() => {

    const interval = setInterval(() => {
      onGetFile()

    }, 2000);
    return () => clearInterval(interval);
  }, []);
  const OnChangePatientId = (e) => {
    setPatientId(e.target.value);
  };

  const toggleModal = () => {
    setModal((prev) => !prev);
  };
  const onLoadFile = async (event) => {
    event.stopPropagation();
    event.preventDefault();

    console.log("in assign file  ");
    const file = event.target.files;
    console.log("on set file ");
    setfile(file);
  };
  // const onSubmit = async (event) => {
  //   event.preventDefault();
  //   console.log("On essaye d'envoyer les données au web3 ");
  //   const cid = await storage.put(file);
  //   console.log(cid);
  //   setCid(cid);
  //   let accounts = [];
  //   try {
  //     accounts = await web3.eth.getAccounts();
  //     console.log("The accounts are", accounts);
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   const cid_hash = cid + " ";
  //   console.log("lec cid a envoyer au contract est " + cid);

  //   console.log(accounts[0]);
  //   patient.methods.setHash(cid_hash).send({
  //     from: accounts[0],
  //   });
  // };
  const onGetFile = async () => {
    const accounts = await web3.eth.getAccounts();
    const patient = new web3.eth.Contract(abi, patientId);
    const cid_res = await patient.methods.getHash().call({
      from: accounts[0],
    });
    // console.log("le hash from contract est " + cid_res);
    const isDoctor = await patient.methods.isDoctor(accounts[0]).call({
      from: accounts[0],
    });
    setIsDoctor(isDoctor);
    console.log("you are a doctor " + isDoctor);
    const isPatient = await patient.methods.isPatient(accounts[0]).call({
      from: accounts[0],
    });
    setIsPatient(isPatient);
    console.log("you are a Patient " + isPatient);
    if (!isDoctor && !isPatient) {
      console.log("Your are not doctor or patient ");
    }
    setDataCollected(true);

    const cid_final = cid_res.split(" ");
    // console.log("le tableau des hash est "+cid_final);
    const data = [];
    for (let i = 0; i < cid_final.length - 1; i++) {
      console.log(cid_final[i]);
      const res = await storage.get(cid_final[i]);
      const files = await res.files();
      const lien = cid_final[i] + ".ipfs.dweb.link/" + files[0].name;
      // console.log(lien);
      data.push({
        file: files[0].name,
        type: files[0].name.substring(files[0].name.length - 3),
        lastModified: files[0].lastModified,
        lien: lien,
      });
    }
    setData(data);
    // console.log(res)
    // setfileReturn(lien)
    //   console.log(files[0])
    //   console.log(`${files.cid} -- ${files.path} -- ${files.size}`)

    // setfileReturn(files[0])
    // const json=JSON.parse(files[0])
  };

  return (
    // <div className="App">

    //   <form onSubmit={onSubmit}>
    //     <input type="file" onChange={onLoadFile} />
    //     <button type="submit"> sendIt</button>
    //   </form>
    //   <hr />
    //   <button onClick={onGetFile}> get the file from web3 storage </button>
    //   <h1> {fileReturn}</h1>
    // </div>
    <Container
      style={{
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      {!dataCollected ? (
        <FormGroup style={{ width: "50%" }}>
          <Label>Patient Id</Label>
          <Input
            type="text"
            name="idPatient"
            placeholder="Enter the patient Id"
            onChange={OnChangePatientId}
          ></Input>
          <Button className="mt-3" color="primary" onClick={onGetFile}>
            Submit{" "}
          </Button>
        </FormGroup>
      ) : isDoctor || isPatient ? (
        <Card>
          <DataTable
            data={data}
            columns={COLUMNS}
            noHeader
            pagination
            subHeader
            paginationPerPage={10}
            onRowClicked={(row) => {
              setRowData(row);
              toggleModal();
            }}
            highlightOnHover
          />
          <Modal isOpen={modal} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>File</ModalHeader>
            <ModalBody>
              {rowData.type === "pdf" || rowData.type==="son" ? (
                <iframe
                  height="450px"
                  width="450px"
                  src={"https://" + rowData.lien}
                />
              ) : (
                <img
                  height="70%"
                  width="100%"
                  src={"https://" + rowData.lien}
                />
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggleModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </Card>
      ) : (
        <div></div>
      )}
    </Container>
  );
}

export default App;
