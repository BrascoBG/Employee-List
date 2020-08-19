import React, { useState, useEffect } from "react";
import styles from "./Posts.module.css";
import GitHub from "../../assets/github.png";

const Posts = ({ data, allDataLabel, allDataColor, allData, delLabel }) => {
  const [myLabel, setMyLabel] = useState("");
  const [myData, setMyData] = useState([]);
  const [search, setSearch] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    setMyData(data);
  }, [data]);

  const labelHandler = (e, id) => {
    e.preventDefault();
    const newData = [...myData];
    for (const person of newData) {
      if (person.uuid === id) {
        person.label = myLabel;
      }
    }
    allDataLabel(e, id, myLabel);
    setMyData(newData);
  };

  const backgroundHandler = (color, id) => {
    const newData = [...myData];
    for (const person of newData) {
      if (person.uuid === id) {
        person.color = color;
      }
    }
    allDataColor(color, id);
    setMyData(newData);
  };

  useEffect(() => {
    console.log(myData, "mydata");
    console.log(data, "data");
    console.log(allData, "allData");
  }, [myData, data, allData]);

  const imageView = (img) => {
    setImage(img);
  };

  const closeImage = () => {
    setImage("");
  };

  const deleteLabel = (id) => {
    const newData = [...myData];
    for (const person of newData) {
      if (person.uuid === id) {
        person.label = "";
      }
    }
    setMyData(newData);
    delLabel(id);
  };

  let imageFull =
    image !== "" ? (
      <div>
        <img className={styles.ImgFull} src={image} alt="avatar" />
        <p className={styles.Close} onClick={closeImage}>
          &times;
        </p>
      </div>
    ) : null;

  let filtered;
  if (search === "") {
    filtered = myData.filter((person) => {
      return person.label.toLowerCase().includes(search);
    });
  } else {
    filtered = allData.filter((person) => {
      return person.label.toLowerCase().includes(search);
    });
  }

  return (
    <div>
      <h1 className={styles.MainTitle}>Our Employees</h1>
      <a
        href="https://github.com/BrascoBG/Employee-List"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.Github}
      >
        <img src={GitHub} alt="GitHub" title="GitHub Code Here" />
      </a>

      <hr style={{ width: "90%" }} />
      {imageFull}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <input
          style={{ width: "200px", marginBottom: "25px" }}
          placeholder="Search by label"
          className="form-control"
          type="text"
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
      </div>
      <ul className={styles.Content}>
        {filtered.map((person) => (
          <li key={person.uuid} style={{ background: person.color }}>
            <p className={styles.Name}>{person.name}</p>
            <p className={styles.Title}>{person.title} at</p>
            <p className={styles.Company}>{person.company}</p>
            <img
              src={person.avatar}
              alt="avatar"
              className={styles.Img}
              onClick={() => imageView(person.avatar)}
            />
            <p className={styles.Bio}>
              {person.bio.replace(/<\/?[^>]+(>|$)/g, "")}
            </p>
            {person.label ? (
              <div className={styles.LabelDel}>
                <p className={styles.Label}>{person.label}</p>
                <svg
                  onClick={() => deleteLabel(person.uuid)}
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 16 16"
                  className="bi bi-trash-fill"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ cursor: "pointer", margin: "auto 0" }}
                >
                  <path
                    fillRule="evenodd"
                    d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"
                  />
                </svg>
              </div>
            ) : (
              ""
            )}

            <form
              className={styles.FormBtn}
              onSubmit={(e) => labelHandler(e, person.uuid)}
            >
              <div className="input-group input-group-sm mb-3">
                <input
                  required
                  type="text"
                  placeholder="Add label"
                  onChange={(e) => setMyLabel(e.target.value)}
                  className="form-control"
                  aria-describedby="inputGroup-sizing-sm"
                  aria-label="Sizing example input"
                />
              </div>
              <button className="btn btn-warning btn-sm " type="submit">
                Add Label
              </button>
            </form>
            <select
              className="form-control form-control-sm"
              onChange={(e) => backgroundHandler(e.target.value, person.uuid)}
            >
              <option defaultValue value="">
                --Background Color--
              </option>
              <option value="tomato">Red</option>
              <option value="#4fd04f">Green</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
