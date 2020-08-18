import React, { useEffect, useState } from "react";
import Posts from "./componenets/Posts/Posts";
import Pagination from "./componenets/Pagination/Pagination";

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(20);

  useEffect(() => {
    const localData = localStorage.getItem("Data");
    if (localData === null) {
      fetch("https://reward-gateway-82f9c.firebaseio.com/list.json")
        .then((response) => response.json())
        .then((resData) => {
          setData(resData);
        })
        .catch((err) => console.log(err));
    } else {
      setData(JSON.parse(localData));
    }
  }, []);

  useEffect(() => {
    for (const insert of data) {
      if (insert.label === undefined) {
        insert.label = "";
        insert.color = "";
      }
    }
    console.log(data);
  }, [data]);

  let newData = [...data];
  const allDataLabel = (e, id, label) => {
    for (const person of newData) {
      if (person.uuid === id) {
        person.label = label;
      }
    }
    localStorage.setItem("Data", JSON.stringify(newData));
  };

  const allDataColor = (color, id) => {
    for (const person of newData) {
      if (person.uuid === id) {
        person.color = color;
      }
    }
    localStorage.setItem("Data", JSON.stringify(newData));
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
      <Posts
        allDataLabel={allDataLabel}
        allDataColor={allDataColor}
        data={currentPosts}
      />
      <Pagination
        postsPerPage={postPerPage}
        totalPosts={data.length}
        paginate={paginate}
      />
    </div>
  );
}

export default App;
