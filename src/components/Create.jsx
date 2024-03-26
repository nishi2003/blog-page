// // import React, { useState } from "react";
// // import { addUser } from "./UserReducer";
// // import { useDispatch, useSelector } from "react-redux";
// // import { useNavigate } from 'react-router-dom';

// // function Create() {
// //     const [title,setTitle] = useState('')
// //     const [description,setDescription] = useState('')
// //     const users= useSelector((state) => state.users);
// //     const dispatch = useDispatch();
// //     const navigate = useNavigate()

// //     const handleSubmit = (event) =>{
// //         event.preventDefault();
// //         dispatch(addUser({id: users[users.length-1].id+1,title,description}))
// //         navigate('/')
// //     }

// //   return (
// //     <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
// //       <div className="w-50 border bg-secondary text-white p-5">
// //       <h3> Add new user</h3>
// //         <form onSubmit={handleSubmit}>
// //           <div>
// //             <label htmlFor="title">Title:</label>
// //             <input type="text" name="title" className="form-control" placeholder="Enter Title" onChange={e => setTitle(e.target.value)}/>
// //           </div>
// //           <div>
// //             <label htmlFor="description">Description:</label>
// //             <input
// //               type="text"
// //               name="description"
// //               className="form-control" placeholder="Enter description" onChange={e => setDescription(e.target.value)}
// //             />
// //           </div>
// //           <div className="form-group d-grid" >
// //             <label htmlFor="exampleFormControlFile1">Upload Image</label>
// //             <input
// //               type="file"
// //               className="form-control-file"
// //               id="exampleFormControlFile1" 
// //             />
// //           </div><br/>
// //           <button className="btn btn-dark">Submit</button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }
// // export default Create;


// import React, { useState } from "react";
// import { addUser } from "./UserReducer";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from 'react-router-dom';
// import { FormProvider, useForm } from "react-hook-form";
// import { Input } from "./Input";


// function Create() {
//     const [title,setTitle] = useState('')
//     const [description,setDescription] = useState('')
//     const users= useSelector((state) => state.users);
//     const dispatch = useDispatch();
//     const navigate = useNavigate()

//     const handleSubmit = (event) =>{
//         event.preventDefault();
//         dispatch(addUser({id: users[users.length-1].id+1,title,description}))
//         navigate('/')
//     }
    
//     const title_validation = {
//         name: 'title',
//         label: 'Title',
//         type: 'text',
//         id: 'name',
//         placeholder: 'write title',
//         validation: {
//           required: {
//             value: true,
//             message: 'required',
//           },
//           maxLength: {
//             value: 30,
//             message: '30 characters max',
//           },
//         },
//       }
//       const description_validation = {
//         name: 'description',
//         label: 'Description',
//         type: 'text',
//         id: 'name',
//         placeholder: 'write title',
//         validation: {
//           required: {
//             value: true,
//             message: 'required',
//           },
//           maxLength: {
//             value: 30,
//             message: '30 characters max',
//           },
//         },
//       }
//       const methods = useForm()
      
//   const onSubmit = methods.handleSubmit(data => {
//     console.log(data)
//   })
//   return (
//     <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
//       <div className="w-50 border bg-secondary text-white p-5">
//       <h3> Add new user</h3>
//       <FormProvider {...methods}>
//         <form  onSubmit={e => e.preventDefault()}
//         noValidate
//         autoComplete="off"
//         className="container">
//           <div>
//             {/* <label htmlFor="title">Title:</label> */}
//             {/* <input type="text" name="title" className="form-control" placeholder="Enter Title" onChange={e => setTitle(e.target.value)}  
//            /> */}
//             <Input className="form-control" {...title_validation}/>
//           </div>
//           <div>
//             {/*<label htmlFor="description">Description:</label>
//              <input
//               type="text"
//               name="description"
//               className="form-control" placeholder="Enter description" onChange={e => setDescription(e.target.value)}
//             /> */}
//             <Input className="form-control" {...description_validation}/>
//           </div>
//           <div className="form-group d-grid" >
//             <label htmlFor="exampleFormControlFile1">Upload Image</label>
//             <input
//               type="file"
//               className="form-control-file"
//               id="exampleFormControlFile1" 
//             />
//           </div><br/>
//           <button onClick={onSubmit} className="btn btn-dark">Submit</button>
//         </form>
//         </FormProvider>
//       </div>
//     </div>
//   );
// }

// export default Create;

import React, { useState } from "react";
import { addUser } from "./UserReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "./Input";

function Create() {
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const users= useSelector((state) => state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const methods = useForm()

    const handleSubmit = (data) => {
        dispatch(addUser({ id: users[users.length-1].id + 1, title: data.title, description: data.description }))
        navigate('/')
    }

    const title_validation = {
        name: 'title',
        label: 'Title',
        type: 'text',
        id: 'title',
        placeholder: 'Write title',
        validation: {
            required: {
                value: true,
                message: 'Title is required',
            },
            maxLength: {
                value: 30,
                message: '30 characters max',
            },
        },
    }

    const description_validation = {
        name: 'description',
        label: 'Description',
        type: 'text',
        id: 'description',
        placeholder: 'Write description',
        validation: {
            required: {
                value: true,
                message: 'Description is required',
            },
            maxLength: {
                value: 30,
                message: '30 characters max',
            },
        },
    }

    return (
        <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
            <div className="w-50 border bg-secondary text-white p-5">
                <h3>Add new user</h3>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(handleSubmit)}>
                        <div>
                            <Input className="form-control" {...title_validation}/>
                        </div>
                        <div>
                            <Input className="form-control" {...description_validation}/>
                        </div>
                        <div className="form-group d-grid" >
                            <label htmlFor="exampleFormControlFile1">Upload Image</label>
                            <input
                                type="file"
                                className="form-control-file"
                                id="exampleFormControlFile1" 
                            />
                        </div>
                        <br/>
                        <button type="submit" className="btn btn-dark">Submit</button>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
}

export default Create;
