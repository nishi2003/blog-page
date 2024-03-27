import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { updateUser } from "./UserReducer";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "./Input";

function Update() {
  const { id } = useParams();
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const existingUser = users.filter((f) => f.id == id);
  const { title, description } = existingUser[0];
  const [utitle, setTitle] = useState(title);
  const [udescription, setDescription] = useState(description);
  const [imageURL, setImageURL] = useState("");
  const [isValidURL, setIsValidURL] = useState(false);
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
  // const handleSubmit = () => {
  //   dispatch(
  //     updateUser({
  //       id: id,
  //       title: utitle,
  //       description: udescription,
  //     })
  //   );
  //   navigate("/");
  // };
  const handleSubmit = (data) => {
    const newUser = {
      id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
      title: data.title,
      description: data.description,
      imageURL: data.image
    };
    dispatch(updateUser(newUser));
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    localStorage.setItem("users", JSON.stringify([...storedUsers, newUser]));

    navigate("/");
  }
  const handleOnChange = (e) => {
    const url = e.target.value;
    const regEx = /\.(jpe?g|png|gif|webp|bmp|svg|ico)$/i;
    if (regEx.test(url)) {
      setIsValidURL(true);
      setImageURL(url);
    } else {
      setIsValidURL(false);
    }
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
      minLength: {
        value: 3,
        message: '3 characters max',
    },
        maxLength: {
          value: 15,
          message: '15 characters max',
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
      minLength: {
        value: 10,
        message: '10 characters max',
    },
      maxLength: {
          value: 50,
          message: '50 characters max',
      },
    },
  };
  const image_validation = {
    name: "image",
    label: "Image",
    type: "url",
    id: "image",
    placeholder: "Write url",
    validation: {
      required: {
        value: true,
        message: "Image is required",
      },
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
              {/* <label htmlFor="exampleFormControlFile1">Upload Image</label>
              <input
                type="file"
                className="form-control-file"
                id="exampleFormControlFile1"
              /> */}
               <Input className="form-control" {...image_validation} />
              {!isValidURL ? (
                <p>Please enter a valid image URL (JPG, JPEG, PNG, GIF)</p>
              ) : null}
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
