import React, { useState } from "react";
import { addUser } from "./UserReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "./Input";

function Create() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [isValidURL, setIsValidURL] = useState(false);

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const methods = useForm();

  const handleSubmit = (data) => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}${('0' + (currentDate.getMonth() + 1)).slice(-2)}${('0' + currentDate.getDate()).slice(-2)}`;
    // const newId = `${formattedDate}${('0000' + users.length > 0 ? users[users.length - 1].id + 1 : 1).slice(-4)}`;
    const newId = `${formattedDate}${('0000' + (users.length > 0 ? parseInt(users[users.length - 1].id.slice(-4)) + 1 : 1)).slice(-4)}`;
    const newUser = {
      id:  newId,
      title: data.title,
      description: data.description,
      imageURL: data.image
    };
    dispatch(addUser(newUser));
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    localStorage.setItem("users", JSON.stringify([...storedUsers, newUser]));

    // const url = data.target.value;
    // const regEx = /\.(jpe?g|png|gif|webp|bmp|svg|ico)$/i;
    // if (regEx.test(url)) {
    //   setIsValidURL(true);
    //   setImageURL(url);
    // } else {
    //   setIsValidURL(false);
    // }
    navigate("/");
  };
  // const [items, setItems] = useState([]);

  // useEffect(() => {
  //   localStorage.setItem('items', JSON.stringify(items));
  // }, [items]);

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
    validation: {
      required: {
        value: true,
        message: "Title is required",
      },
      minLength: {
        value: 3,
        message: "3 characters min",
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
    placeholder: "Write description",
    validation: {
      required: {
        value: true,
        message: "Description is required",
      },
      minLength: {
        value: 10,
        message: "10 characters min",
      },
      maxLength: {
        value: 50,
        message: "50 characters max",
      },
    },
  };

  // const image_validation = {
  //   name: "image",
  //   label: "Image",
  //   type: "url",
  //   id: "image",
  //   placeholder: "Write url",
  //   validation: {
  //     required: {
  //       value: true,
  //       message: "Image is required",
  //     },
  //   },
  // };

//   const image_validation = {
//   name: "image",
//   label: "Image",
//   type: "url",
//   id: "image",
//   placeholder: "Write url",
//   validation: {
//     required: {
//       value: true,
//       message: "Image is required",
//     },
//     validate: {
//       validImageType: (value) => {
//         const regEx = /\.(jpe?g|png|gif)$/i; 
//         if (regEx.test(value)) {
//           return true; 
//         }
//         return "Invalid image type. Only JPG, JPEG, PNG, and GIF are supported."; 
//       },
//     },
//   },
// };

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
        <h3>Add new user</h3>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmit)}>
            <div>
              <Input className="form-control" {...title_validation} />
            </div>
            <div>
              <Input className="form-control" {...description_validation} />
            </div>
            <div className="form-group d-grid">
              <Input className="form-control" {...image_validation} />
              {!isValidURL ? (
                <p>Please enter a valid image URL (JPG, JPEG, PNG, GIF)</p>
              ) : null}
            </div>
            <br />
            <button type="submit" className="btn btn-dark">
              Submit
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default Create;
