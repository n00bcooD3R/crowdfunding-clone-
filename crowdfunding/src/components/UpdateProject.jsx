import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { updateProject } from "../service/blockchain";
import { setGlobalState, useGlobalState } from "../store";

const UpdateProject = ({ project }) => {
    const [updateModal] = useGlobalState('updateModal')
    const [title, setTitle] = useState(project?.title)
    const [description, setDescription] = useState(project?.description)
    const [date, setDate] = useState(project?.date)
    const [imageURL, setImageURL] = useState(project?.imageURL)

    const toTimestamp = (dateStr) => {
      const dateObj = Date.parse(dateStr)
      return dateObj / 1000
    }

    const handleSubmit = async (e) => {
      e.preventDefault()
      if(!title || !description || !date || !imageURL) return

      const params = {
        id: project?.id,
        title, 
        description,
        expiresAt: toTimestamp(date),
        imageURL,
      }

      await updateProject(params)
      toast.success('Project updated successfully, will reflect in 30sec.')
      onClose()
    }
  
  const onClose = () => {
    setGlobalState('updateModal', 'scale-0')
    reset()
  }

  const reset = () => {
    setTitle('')
    setDescription('')
    setImageURL('')
    setDate('')
  }

    return (
        <div className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transform duration-300 ${updateModal}`}>
            <div className="bg-white shadow-xl shadow-black rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold">#Project Title</p>
                        <button
                          onClick={onClose}
                          className="border-0 bg-transparent focus:outline-none"
                          type="button"
                        >
                            <FaTimes />
                        </button>
                    </div>

                    <div className="flex justify-center items-center mt-5">
                        <div className="rounded-xl overflow-hidden h-20 w-20">
                            <img 
                              src={imageURL || 'https://hashtagmagazine.in/wp-content/uploads/2022/10/EMO-The-New-A.I.-Robot-Companion-Hashtag-Magazine.png'} 
                              alt="project title"
                              className="h-full w-full object-cover cursor-pointer" 
                            />
                        </div>
                    </div>

                    <div className="flex justify-between items-center bg-gray-300 rounded-xl mt-5">
                        <input 
                          type="text"
                          name="title"
                          onChange={(e) => setTitle(e.target.value)}
                          value={title}
                          placeholder="Title"
                          required
                          className="block w-full bg-transparent border-0 text-sm text-slate-500 focus:outline-none focus:ring-0" 
                        />
                    </div>

                    <div className="flex justify-between items-center bg-gray-300 rounded-xl mt-5">
                        <input 
                          type="date"
                          name="date"
                          onChange={(e) => setDate(e.target.value)}
                          value={date}
                          placeholder="Expires"
                          required
                          className="block w-full bg-transparent border-0 text-sm text-slate-500 focus:outline-none focus:ring-0" 
                        />
                    </div>

                    <div className="flex justify-between items-center bg-gray-300 rounded-xl mt-5">
                        <input 
                          type="url"
                          name="imageURL"
                          onChange={(e) => setImageURL(e.target.value)}
                          value={imageURL}
                          placeholder="Image URL"
                          required
                          className="block w-full bg-transparent border-0 text-sm text-slate-500 focus:outline-none focus:ring-0" 
                        />
                    </div>

                    <div className="flex justify-between items-center bg-gray-300 rounded-xl mt-5">
                        <textarea 
                          type="text"
                          name="description"
                          onChange={(e) => setDescription(e.target.value)}
                          value={description}
                          placeholder="Description"
                          required
                          className="block w-full bg-transparent border-0 text-sm text-slate-500 focus:outline-none focus:ring-0" 
                        ></textarea>
                    </div>

                    <button
                      className='inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-md leading-tight uppercase rounded-full shadow-md hover:bg-green-700 mt-5' 
                      type='submit'
                    >
                      Update project
                    </button>

                </form>
            </div>
        </div>
    )
}

export default UpdateProject