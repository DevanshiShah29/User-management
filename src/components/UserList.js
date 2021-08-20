import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactTable from "react-table";
import "react-table/react-table.css";
import UserInfo from "./UserInfo";

const UserList = () => {
  const [allData, setAllData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [search, setSearch] = useState("");
  const [popup, setPopup] = useState(false);
  const [popupData, setPopupData] = useState({});

  const columns = [
    {
      Header: "Profile Image",
      accessor: "picture.large",
      Cell: (row) => {
        return (
          <div>
            <img height={34} src={row.original.picture.thumbnail} />
          </div>
        );
      },
    },
    {
      Header: "Name",
      accessor: "name.first",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "City",
      accessor: "location.city",
    },
    {
      Header: "State",
      accessor: "location.state",
    },
  ];

  useEffect(() => {
    axios
      .get("https://randomuser.me/api/?results=50")
      .then((response) => {
        if (response.data) {
          setAllData(response.data.results);
          setSearchData(response.data.results);
        }
        console.log(response, "response");
      })
      .catch((error) => console.log(error));
  }, []);

  const onRowClick = (state, rowInfo, column, instance) => {
    return {
      onClick: (e) => {
        console.log("it produced this event:", e);
        console.log("It was in this row:", rowInfo);

        setPopup(true);
        setPopupData(rowInfo.original);
      },
    };
  };

  const handlePopup = () => {
    setPopup(false);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setSearchData(
      allData.filter((row) => row.name.first.toLowerCase().includes(e.target.value.toLowerCase()))
    );
  };

  return (
    <div className="userlist-wrapper">
      {popup ? (
        <UserInfo handlePopup={handlePopup} popupData={popupData} />
      ) : null}
      {allData.length > 0 ? (
        <div className="container">
         <lable>Search:</lable> <input
            type="text"
            placeholder="Search"
            onChange={(e) => handleSearch(e)}
            className="search"
          />
          <ReactTable
            data={searchData}
            columns={columns}
            getTrProps={onRowClick}
            defaultPageSize={10}
          />
        </div>
      ) : null}
    </div>
  );
};

export default UserList;
