import { signOut } from "next-auth/react";
import classes from "./admin.module.css";
import { IoMdLogOut } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { MdDelete, MdKeyboardDoubleArrowDown } from "react-icons/md";
import { IoSave } from "react-icons/io5";
import { HiBell } from "react-icons/hi";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { RiFileExcel2Fill } from "react-icons/ri";
import { FiUpload } from "react-icons/fi";
import { ImBin } from "react-icons/im";
import { useRef, useState } from "react";
import * as XLSX from "xlsx";
import ThreeDot from "../loader/three_body";

export default function AdminComponent({ session }) {
  const [dataArray, setDataArray] = useState([]);
  const [filename, setFilename] = useState("Not selected file");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null); // Create a ref for the file input

  function getJsDateFromExcel(excelDate) {
    const SECONDS_IN_DAY = 24 * 60 * 60;
    const MISSING_LEAP_YEAR_DAY = SECONDS_IN_DAY * 1000;
    const MAGIC_NUMBER_OF_DAYS = 25567 + 2;

    if (!Number(excelDate)) {
      alert("wrong input format");
      return;
    }

    const delta = excelDate - MAGIC_NUMBER_OF_DAYS;
    const parsed = delta * MISSING_LEAP_YEAR_DAY;
    const date = new Date(parsed);

    // Format the date as 'DD-MMM-YYYY'
    const day = String(date.getDate()).padStart(2, "0"); // Add leading 0 if needed
    const month = date.toLocaleString("en-US", { month: "short" }); // Get month in short format
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  function deleteHandler(id) {
    const confirm = window.confirm(`Are you sure to delete: ${id}?`);
    if (confirm) {
      setDataArray(dataArray.filter((data) => data.id !== id));
    }
  }

  function handleFileUpload(event) {
    const file = event.target.files[0];

    if (file && file.name.endsWith(".xlsx")) {
      try {
        const reader = new FileReader();

        reader.onload = (e) => {
          const binaryStr = e.target.result;
          const workbook = XLSX.read(binaryStr, { type: "binary" });

          const sheetName = workbook.SheetNames[0];
          const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

          // Assuming the Excel has "Student ID" and "Marks" columns
          const extractedData = sheet.map((row) => ({
            id: row["Certificate ID"],
            name: row["Name"],
            internship_domain: row["Internship Domain"],
            start: getJsDateFromExcel(row["Starting Date"]),
            end: getJsDateFromExcel(row["Ending Date"]),
          }));

          setDataArray(extractedData);
          setFilename(file.name); // Store the file name

          // Reset the file input field to allow re-upload of the same file
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        };

        reader.readAsBinaryString(file);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please upload a valid Excel (.xlsx) file");
    }
  }

  async function submitHandler() {
    if (loading) {
      return;
    }
    if (dataArray.length === 0) {
      alert("Please upload a valid Excel (.xlsx) file");
      return;
    }

    if (!Array.isArray(dataArray)) {
      alert("Data must be an array.");
      return;
    }

    const trimmedData = [];

    dataArray.map((item, index) => {
      let studentID = item.id;
      if (
        !item.id ||
        !item.name ||
        !item.internship_domain ||
        !item.start ||
        !item.end
      ) {
        alert("Error: Invalid data on id " + item.id + ".");
        return;
      }
      if (isNaN(item.id)) {
        studentID = item.id?.trim();
        if (item.id.trim().length === 0) {
          alert("Error: Invalid data on id " + item.id + ".");
          return;
        }
      }
      trimmedData.push({
        student_id: studentID,
        name: item.name?.trim(),
        internship_domain: item.internship_domain?.trim(),
        start: item.start?.trim(),
        end: item.end?.trim(),
      });
    });

    setLoading(true);

    try {
      const res = await fetch("/api/upload/certificate", {
        method: "POST",
        body: JSON.stringify({
          data: trimmedData,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Something went wrong");
      } else {
        alert("File uploaded successfully");
        setDataArray([]);
        setFilename("Not selected file");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        window.scrollTo(0, 0);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <div className={classes.admin}>
      <div className={classes.adminMain}>
        <div className={classes.adminMainTop}>
          <div className={classes.adminMainText}>
            <div className={classes.adminMainTitle}>Certificate</div>
            <div className={classes.adminMainSubTitle}>
              Upload Certificate Details of students
            </div>
          </div>
          <div className={classes.adminMainUser}>
            <div className={classes.adminMainNotifications}>
              <div className={classes.adminMainNotification}>
                <HiBell color="#fff" />
              </div>
              <div className={classes.adminMainNotification}>
                <BiSolidMessageSquareDetail color="#fff" />
              </div>
            </div>
            <div className={classes.adminUserMain}>
              <div className={classes.adminUserImage}>
                <FaUser />
              </div>
              <div className={classes.adminUserText}>
                <div className={classes.adminUserTitle}>
                  {session?.user?.name ? session?.user?.name : "User"}
                </div>
                <div className={classes.adminUserTeam}>Team</div>
              </div>
              <div className={classes.adminUserOptions}>
                <MdKeyboardDoubleArrowDown />
              </div>
            </div>
            <div
              className={`${classes.adminMainNotification} ${classes.adminUserLogout}`}
              onClick={() => signOut()}
            >
              <IoMdLogOut />
            </div>
          </div>
        </div>
        <div className={classes.adminMainMain}>
          <div className={classes.adminMainUpload}>
            <div className={classes.container}>
              <label htmlFor="file" className={classes.header}>
                <FiUpload /> <p>Browse File to upload!</p>
              </label>
              <div className={classes.footer}>
                <RiFileExcel2Fill />
                <p>{filename}</p>
                <ImBin
                  onClick={() => {
                    setFilename("Not selected file");
                    setDataArray([]);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = ""; // Reset the file input value
                    }
                  }}
                />
              </div>
              <input
                id="file"
                type="file"
                accept=".xlsx"
                onChange={handleFileUpload}
                ref={fileInputRef} // Attach the ref to the input
              />
            </div>
          </div>
          {dataArray.length !== 0 && (
            <>
              <div className={classes.adminMainLabel}>
                <div className={classes.adminSubmitText}>
                  Check before submitting
                </div>
                <div
                  className={`${classes.adminSubmitButton} ${
                    loading ? classes.loaderCheck : ""
                  }`}
                  onClick={submitHandler}
                  style={loading ? { cursor: "not-allowed" } : {}}
                >
                  {loading ? (
                    <ThreeDot />
                  ) : (
                    <>
                      Submit
                      <IoSave />
                    </>
                  )}
                </div>
              </div>
              <div className={classes.adminMainEntry}>
                <div className={classes.tableMain}>
                  <div>Certificate ID</div>
                  <div>Name</div>
                  <div>Internship Domain</div>
                  <div>Starting Date</div>
                  <div>Ending Date</div>
                  <div style={{ justifySelf: "center" }}>Delete</div>
                </div>
                {dataArray.map((data, idx) => (
                  <div className={classes.tableMain} key={idx}>
                    <div className={classes.tableId}>{data.id}</div>
                    <div className={classes.tableId}>{data.name}</div>
                    <div className={classes.tableId}>
                      {data.internship_domain}
                    </div>
                    <div className={classes.tableId}>{data.start}</div>
                    <div className={classes.tableId}>{data.end}</div>
                    <div
                      className={classes.tableDelete}
                      onClick={() => deleteHandler(data.id)}
                    >
                      <MdDelete />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          <div className={classes.adminMainFooter}>
            <p>© 2024 Certificate Verification System</p>
          </div>
        </div>
      </div>
    </div>
  );
}
