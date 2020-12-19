import React, { useEffect, useState } from "react";
import Posts from "./componenets/Posts/Posts";
import Pagination from "./componenets/Pagination/Pagination";
import Spinner from "./componenets/Spinner/Spinner";

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(20);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const localData = localStorage.getItem("EmployeesRG");
    if (localData === null) {
      fetch("https://reward-gateway-92f9c.firebaseio.com/test123.json")
        .then((response) => response.json())
        .then((resData) => {
          setData(resData);
          setLoading(true);
        })
        .catch((err) => console.log(err));
    } else {
      setData(JSON.parse(localData));
      setLoading(true);
    }
  }, []);

  useEffect(() => {
    for (const insert of data) {
      if (insert.label === undefined) {
        insert.label = "";
        insert.color = "";
      }
      if (insert.avatar === "0" || insert.avatar === "http://httpstat.us/503") {
        insert.avatar =
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png";
      }
      if (insert.bio === "0" || insert.bio === "") {
        insert.bio = "Unfortunately there is no details about this employee.";
      }
    }
  }, [data]);

  let newData = [...data];
  const allDataLabel = (e, id, label) => {
    for (const person of newData) {
      if (person.uuid === id) {
        person.label = label;
      }
    }
    localStorage.setItem("EmployeesRG", JSON.stringify(newData));
  };

  const allDataColor = (color, id) => {
    for (const person of newData) {
      if (person.uuid === id) {
        person.color = color;
      }
    }
    localStorage.setItem("EmployeesRG", JSON.stringify(newData));
  };

  const delLabel = (id) => {
    for (const person of newData) {
      if (person.uuid === id) {
        person.label = "";
      }
    }
    localStorage.setItem("EmployeesRG", JSON.stringify(newData));
  };

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = newData.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (e, pageNumber) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
    window.scroll(0, 0);
  };

  return (
    <div className="App">
      {!loading ? (
        <Spinner />
      ) : (
        <Posts
          allDataLabel={allDataLabel}
          allDataColor={allDataColor}
          data={currentPosts}
          allData={newData}
          delLabel={delLabel}
        />
      )}
      <Pagination
        postsPerPage={postPerPage}
        totalPosts={data.length}
        paginate={paginate}
      />
    </div>
  );
}

export default App;
