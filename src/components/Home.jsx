import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Person from "./Person";

import "./Home.css";

function Home(props) {
  const [peopleList, setPeopleList] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(3);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    number: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  let url = `http://localhost:8080/api/v1/people?page=${page}&size=${size}`;
  if (
    filters.firstName ||
    filters.lastName ||
    filters.number ||
    filters.street ||
    filters.city ||
    filters.state ||
    filters.zip
  ) {
    url = `http://localhost:8080/api/v1/people`;
  }

  const toggleHelper = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    async function getData() {
      const res = await axios.get(url);
      const { content, totalPages } = res.data;
      setPeopleList(content);
      setTotalPages(totalPages);
    }
    getData();
  }, [url, toggle, filters]);

  function getPageNumbers(totalPages) {
    let pages = [];
    for (let i = 0; i < totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  return (
    <Fragment>
      {totalPages && (
        <Fragment>
          <select
            value={filters.firstName}
            onChange={(e) =>
              setFilters({ ...filters, firstName: e.target.value })
            }
          >
            <option value="">--Select a first name--</option>
            {Array.from(
              new Set(
                peopleList.map(
                  (person) => person.personalName.givenNames[0].value
                )
              )
            ).map((firstName) => (
              <option key={firstName} value={firstName}>
                {firstName}
              </option>
            ))}
          </select>
          <select
            value={filters.lastName}
            onChange={(e) =>
              setFilters({ ...filters, lastName: e.target.value })
            }
          >
            <option value="">--Select a last name--</option>
            {Array.from(
              new Set(
                peopleList.map((person) => person.personalName.surname.value)
              )
            ).map((lastName) => (
              <option key={lastName} value={lastName}>
                {lastName}
              </option>
            ))}
          </select>
          <select
            value={filters.addressNumber}
            onChange={(e) =>
              setFilters({ ...filters, addressNumber: e.target.value })
            }
          >
            <option value="">--Select a number--</option>
            {Array.from(
              new Set(peopleList.map((person) => person.address.number))
            ).map((number) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </select>
          <select
            value={filters.addressStreet}
            onChange={(e) =>
              setFilters({ ...filters, addressStreet: e.target.value })
            }
          >
            <option value="">--Select a street--</option>
            {Array.from(
              new Set(peopleList.map((person) => person.address.street))
            ).map((street) => (
              <option key={street} value={street}>
                {street}
              </option>
            ))}
          </select>
          <select
            value={filters.addressCity}
            onChange={(e) =>
              setFilters({ ...filters, addressCity: e.target.value })
            }
          >
            <option value="">--Select a city--</option>
            {Array.from(
              new Set(peopleList.map((person) => person.address.city))
            ).map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <select
            value={filters.addressState}
            onChange={(e) =>
              setFilters({ ...filters, addressState: e.target.value })
            }
          >
            <option value="">--Select a state--</option>
            {Array.from(
              new Set(peopleList.map((person) => person.address.state))
            ).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          <select
            value={filters.addressZip}
            onChange={(e) =>
              setFilters({ ...filters, addressZip: e.target.value })
            }
          >
            <option value="">--Select a zip code--</option>
            {Array.from(
              new Set(peopleList.map((person) => person.address.zip))
            ).map((zip) => (
              <option key={zip} value={zip}>
                {zip}
              </option>
            ))}
          </select>
          <br />
          <span className="size-span">
            Select{" "}
            <select value={size} onChange={(e) => setSize(e.target.value)}>
              <option value={3}>3</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>{" "}
            People
          </span>
        </Fragment>
      )}

      {peopleList
        .filter(
          (person) =>
            (!filters.firstName ||
              person.personalName.givenNames[0].value === filters.firstName) &&
            (!filters.lastName ||
              person.personalName.surname.value === filters.lastName) &&
            (!filters.addressNumber ||
              person.address.number === filters.addressNumber) &&
            (!filters.addressStreet ||
              person.address.street === filters.addressStreet) &&
            (!filters.addressCity ||
              person.address.city === filters.addressCity) &&
            (!filters.addressState ||
              person.address.state === filters.addressState) &&
            (!filters.addressZip || person.address.zip === filters.addressZip)
        )
        .map((person) => {
          return (
            <Person
              key={person.id}
              id={person.id}
              firstName={person.personalName.givenNames[0].value}
              lastName={person.personalName.surname.value}
              address={person.address}
              toggleHelper={toggleHelper}
            />
          );
        })}

      {totalPages > 1 ? (
        <div className="pagination">
          <button disabled={page === 0} onClick={() => setPage(page - 1)}>
            Prev
          </button>
          {getPageNumbers(totalPages).map((pageNumber) => (
            <button
              key={pageNumber}
              className={page === pageNumber ? "active" : ""}
              onClick={() => setPage(pageNumber)}
            >
              {pageNumber + 1}
            </button>
          ))}
          <button
            disabled={page === totalPages - 1}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      ) : (
        <div>Page 1 of 1</div>
      )}
    </Fragment>
  );
}

export default Home;
