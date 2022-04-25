import axios from "axios";

// Admin
export const listPost = async (authtoken) => {
  return await axios.get("http://localhost:5000/posts/all", {
    // get all post
    headers: {
      Authorization: `Bearer ${authtoken}`,
    },
  });
};

export const getmyPosts = async (authtoken) => {
  return await axios.get("http://localhost:5000/posts", {
    // get all post
    headers: {
      Authorization: `Bearer ${authtoken}`,
    },
  });
};

export const changeStatus = async (authtoken, value) => {
  return await axios.post("http://localhost:5000/posts/change-status", value, {
    headers: {
      Authorization: `Bearer ${authtoken}`,
    },
  });
};

// User

export const currentPost = async (id) => {
  return await axios.get("http://localhost:5000/posts/"+id)
}


export const updatePost = async (authtoken, value, id) => {
  return await axios.put("http://localhost:5000/posts/edit-post/" + id,
    value,
    {
      headers: {
        Authorization: `Bearer ${authtoken}`,
      },
    }
  );
};

export const removePost = async (authtoken, id) => {
  return await axios.delete("http://localhost:5000/posts/" + id, {
    headers: {
      Authorization: `Bearer ${authtoken}`,
    },
  });
};
