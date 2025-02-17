import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Card, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config.js";
import { useNavigate } from "react-router-dom";

function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const [published, setPublished] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        minHeight: "80vh",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card
          varint={"outlined"}
          style={{ width: 400, padding: 20, marginTop: 30, height: "100%" }}
        >
          <TextField
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            fullWidth={true}
            label="Title"
            variant="outlined"
          />

          <TextField
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            fullWidth={true}
            label="Description"
            variant="outlined"
          />

          <TextField
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setImage(e.target.value);
            }}
            fullWidth={true}
            label="Image link"
            variant="outlined"
          />

          <TextField
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            fullWidth={true}
            label="Price"
            variant="outlined"
          />
          <FormControl fullWidth style={{ marginBottom: 10 }}>
            <InputLabel>Publish</InputLabel>
            <Select
              label="Publish"
              value={published}
              onChange={(e) => setPublished(e.target.value)}
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>

          {/* adding course */}
          <Button
            size={"large"}
            variant="contained"
            onClick={async () => {
              try {
                const response = await axios.post(
                  `${BASE_URL}/api/v1/admin/courses`,
                  {
                    title: title,
                    description: description,
                    imageLink: image,
                    published: published,
                    price: parseFloat(price),
                  },
                  {
                    headers: {
                      Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                  }
                );
                console.log(response.data);
                alert(response.data.message);
                navigate("/admin/courses");
              } catch (error) {
                console.error("Failed to add course", error);
              }
            }}
          >
            Add course
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default AddCourse;
