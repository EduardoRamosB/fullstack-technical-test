import axios from 'axios';
import { User } from "../types.ts";

const usersApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const logIn = async (email: string, password: string) => {
  try {
    return await usersApi.post("login/", { email, password });
  } catch (error) {
    console.error("Login API error:", error);
    throw error;
  }
};

export const signUp = async (user: User) => {
  //console.log('user:', user)
  try {
    return await usersApi.post("register/", user);
  } catch (error) {
    console.error("SignUp API error:", error);
    throw error;
  }
};

export const LogOut = async (jwt: string, refresh: string) => {
  if (jwt && refresh) {
    const config = {
      headers: {
        "Authorization": `Bearer ${jwt}`
      }
    };

    return await usersApi.post("logout/", { "refresh": refresh }, config);
  }
};

export const getUserInfo = async (jwt: string): Promise<{ data: User }> => {
  const config = {
    headers: {
      "Authorization": `Bearer ${jwt}`,
    },
  };
  return await usersApi.get(`user_info/`, config);
};

/**** Users *****/
export const getVolunteers = async (jwt: string, role: string): Promise<User[]> => {
  const config = {
    headers: {
      'Authorization': `Bearer ${jwt}`
    }
  };
  const response = await usersApi.get(`users/${role}/`, config);
  //console.log('response.data:', response.data)
  return response.data;
};

export const createVolunteer = async (volunteer: User, jwt: string, role: string): Promise<User> => {
  const config = {
    headers: {
      'Authorization': `Bearer ${jwt}`
    }
  };
  console.log('volunteer:', volunteer)
  const response = await usersApi.post(`users/${role}/`, volunteer, config);
  return response.data;
};

export const updateVolunteer = async (id: number, volunteer: User, jwt: string, role: string): Promise<User> => {
  const config = {
    headers: {
      'Authorization': `Bearer ${jwt}`
    }
  };
  const response = await usersApi.put(`users/${role}/${id}/`, volunteer, config);
  return response.data;
};

export const deleteVolunteer = async (id: number, jwt: string, role: string): Promise<void> => {
  const config = {
    headers: {
      'Authorization': `Bearer ${jwt}`
    }
  };
  await usersApi.delete(`users/${role}/${id}/`, config);
};
