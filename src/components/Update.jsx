import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { updateUser } from "./UserReducer";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "./Input";

function Update() {
  const { id } = useParams();
  const users = useSelector((state) => state.users);
  const existingUser = users.filter((f) => f.id == id);
  const { title, description } = existingUser[0];
  const [utitle, setTitle] = useState(title);
  const [udescription, setDescription] = useState(description);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const methods = useForm();
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    console.log(e.target.value);
  };
  // const handleUpdate = (data) => {
  //   data.preventDefault();
  //   dispatch(
  //     updateUser({
  //       id: id,
  //       title: utitle,
  //       description: udescription,
  //     })
  //   );
  //   navigate("/");
  // };
  const handleSubmit = () => {
    // data.preventDefault();
    // dispatch(updateUser({ id: users[users.length-1].id + 1, utitle: data.utitle, udescription: data.udescription }))
    // e.preventDefault();
    dispatch(
      updateUser({
        id: id,
        title: utitle,
        description: udescription,
      })
    );
    navigate("/");
  };
  const title_validation = {
    name: "title",
    label: "Title",
    type: "text",
    id: "title",
    value: utitle,
    placeholder: "Write title",
    validation: {
      required: {
        value: true,
        message: "Title is required",
      },
      maxLength: {
        value: 30,
        message: "30 characters max",
      },
    },
  };

  const description_validation = {
    name: "description",
    label: "Description",
    type: "text",
    id: "description",
    value: udescription,
    placeholder: "Write description",
    validation: {
      required: {
        value: true,
        message: "Description is required",
      },
      // maxLength: {
      //   value: 30,
      //   message: "30 characters max",
      // },
    },
  };
  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-secondary text-white p-5">
        <h3>Update details</h3>
        {/* <form onSubmit={handleUpdate}> */}
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmit)}>
            <div>
              {/* <label htmlFor="title">Title:</label>
            <input type="text" name="title" className="form-control" placeholder="Enter Title" value= {utitle} onChange={e => setTitle(e.target.value)}/> */}
              <Input
                className="form-control"
                onChange={handleTitleChange}
                {...title_validation}
              />
            </div>
            <div>
              {/* <label htmlFor="description">Description:</label>
            <input
              type="text"
              name="description"
              className="form-control" placeholder="Enter description"
              value={udescription} onChange={methods => setDescription(e.target.value)}
            /> */}
              <Input
                className="form-control"
                onChange={handleDescriptionChange}
                {...description_validation}
              />
            </div>
            <div className="form-group d-grid">
              <label htmlFor="exampleFormControlFile1">Upload Image</label>
              <input
                type="file"
                className="form-control-file"
                id="exampleFormControlFile1"
              />
            </div>
            <br />
            <button type="submit" className="btn btn-info">
              Update
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default Update;
