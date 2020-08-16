import React, { useEffect, useState } from "react";
import Posts from "./componenets/Posts/Posts";
import Pagination from "./componenets/Pagination/Pagination";

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(20);

  useEffect(() => {
    fetch("https://reward-gateway-82f9c.firebaseio.com/list.json")
      .then((response) => response.json())
      .then((resData) => {
        setData(resData);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (e, pageNumber) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
    window.scroll(0, 0);
  };

  return (
    <div className="App">
      <Posts data={currentPosts} />
      <Pagination
        postsPerPage={postPerPage}
        totalPosts={data.length}
        paginate={paginate}
      />
    </div>
  );
}

export default App;
