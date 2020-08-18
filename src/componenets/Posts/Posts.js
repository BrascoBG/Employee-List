import React, { useState, useEffect } from "react";
import styles from "./Posts.module.css";

const Posts = ({ data, allDataLabel, allDataColor }) => {
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
    for (const person of myData) {
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
  }, [myData, data]);

  const imageView = (img) => {
    setImage(img);
  };

  const closeImage = () => {
    setImage("");
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

  const filtered = myData.filter((person) => {
    return person.label.toLowerCase().includes(search);
  });

  return (
    <div>
      <h1 className={styles.MainTitle}>Our Employees</h1>
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
            <hr />
            <p className={styles.Title}>{person.title} at</p>
            <p className={styles.Company}>{person.company}</p>
            <img
              src={person.avatar}
              alt="avatar"
              className={styles.Img}
              onClick={() => imageView(person.avatar)}
            />
            <p>{person.bio}</p>
            <p className={styles.Label}>{person.label}</p>
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
