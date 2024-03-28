import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "./UserReducer";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "./Input";

function Update() {
  const { id } = useParams();
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const existingUser = users.find((f) => f.id == id);
  const [utitle, setTitle] = useState(existingUser.title);
  const [udescription, setDescription] = useState(existingUser.description);
  const [imageURL, setImageURL] = useState(existingUser.imageURL);
  const [isValidURL, setIsValidURL] = useState(true); // Initially consider URL as valid
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const methods = useForm();

  // useEffect(() => {
  //   setTitle(existingUser.title);
  //   setDescription(existingUser.description);
  //   setImageURL(existingUser.imageURL);
  // }, [existingUser]);

  const handleTitleChange = (e) => {
    existingUser.title = e.target.value;
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageURLChange = (e) => {
    setImageURL(e.target.value);
    // validImageType(e.target.value);
  };

  // const validateURL = (url) => {
  //   const regEx = /\.(jpe?g|png|gif|webp|bmp|svg|ico)$/i;
  //   setIsValidURL(regEx.test(url));
  // };

  const handleSubmit = (data) => {
    const updatedUser = {
      ...existingUser,
      title: data?.title,
      description: data?.description,
      imageURL: data?.imageURL,
    };
    console.log(data, updateUser);
    // dispatch(updateUser(updatedUser));

    const updatedUsers = users.map((user) =>
      user.id === existingUser.id ? updatedUser : user
    );
    console.log(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    navigate("/");
  };
  // const handleOnChange = (e) => {
  //   const url = e.target.value;
  //   const regEx = /\.(jpe?g|png|gif|webp|bmp|svg|ico)$/i;
  //   if (regEx.test(url)) {
  //     setIsValidURL(true);
  //     setImageURL(url);
  //   } else {
  //     setIsValidURL(false);
  //   }
  // };
  const title_validation = {
    name: "title",
    label: "Title",
    type: "text",
    id: "title",
    placeholder: "Write title",
    value: utitle,
    onChange: (e) => {
      setTitle(e.target.value);
    },
    validation: {
      required: {
        value: true,
        message: "Title is required",
      },
      minLength: {
        value: 3,
        message: "3 characters max",
      },
      maxLength: {
        value: 15,
        message: "15 characters max",
      },
    },
  };

  const description_validation = {
    name: "description",
    label: "Description",
    type: "text",
    id: "description",
    // value: existingUser?.description,
    value: udescription,
    onChange: (e) => {
      setDescription(e.target.value);
    },
    placeholder: "Write description",
    validation: {
      required: {
        value: true,
        message: "Description is required",
      },
      minLength: {
        value: 10,
        message: "10 characters max",
      },
      maxLength: {
        value: 50,
        message: "50 characters max",
      },
    },
  };

  // const image_validation = {
  //   name: "imageURL",
  //   label: "Image",
  //   type: "url",
  //   id: "image",
  //   // value: existingUser?.imageURL,
  //   value: imageURL,
  //   onChange: (e) => {
  //     setImageURL(e.target.value);
  //   },
  //   placeholder: "Write url",
  //   validation: {
  //     required: {
  //       value: true,
  //       message: "Image is required",
  //     },
  //   },
  // };

  const image_validation = {
    name: "imageURL",
    label: "Image",
    type: "url",
    id: "image",
    placeholder: "Write url",
    value:imageURL,
    validation: {
      required: {
        value:true ,
        message: "Image is required",
      },
      validate: {
        validImageType: (value) => {
          const regEx = /\.(jpe?g|png|gif)$/i; 
          if (regEx.test(value)) {
            return true; 
          }
          return "Invalid image type. Only JPG, JPEG, PNG, and GIF are supported."; 
        },
      },
    },
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-secondary text-white p-5">
        <h3>Update details</h3>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmit)}>
            <div>
              <Input className="form-control" {...title_validation} />
            </div>
            <div>
              <Input
                className="form-control"
                // onChange={handleDescriptionChange}
                {...description_validation}
              />
            </div>
            <div className="form-group d-grid">
              <Input
                className="form-control"
                onChange={handleImageURLChange}
                {...image_validation}
              />
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
