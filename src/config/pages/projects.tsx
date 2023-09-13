import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Box from '@mui/material/Box';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from '@mui/material/Button';

export default function Projects() {
  const [listData, setListData] = useState<any>([]);

  const deletePost = (id:any) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/comments/${id}`)
      .then(() => {
        console.log("Post Deleted Successfully");
      })
      .catch((err) => {
        console.log(err);
    });
  };

  let getData = () => {
      axios
      .get("https://jsonplaceholder.typicode.com/comments")
      .then((res) => {
          setListData([...res.data]);
        })
        .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getData();
}, []);

const navigate = useNavigate();
  return (
    <>
      <div>
        <h1>Add request</h1>
        <Button  onClick={() => {
            navigate ('/add');
          }} variant="contained">Add Data</Button>
        {listData &&
          Array.isArray(listData) &&
          listData.length > 0 &&
          listData.map((x: any, i: any) => (
            <div className="p-2 m-2 border border-dark rounded" key={i}>

              <div className="comments">


              <p>{x.userId}</p>
              <span className="head">Commet {i}</span>
              <h2>{x.title}</h2>
              <p>{x.body}</p>

              
              <IconButton
                onClick={() => deletePost(x.id)}
                color="error"
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  navigate(`/add/${x.id}`);
                }}
                color="primary"
                aria-label="delete"
              >
                <EditIcon />
              </IconButton>
            </div>
            </div>
          ))}
      </div>
    </>
  );
}