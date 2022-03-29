import React, { useEffect, useRef, useState } from "react";
import { axiosClient } from "../../helpers/axios-client";
import moment from "moment";

function Admin() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(Boolean);
  const [errors, setErrors] = useState<any[]>([]);

  const timeoutSearch = useRef<any>(null);
  const timeoutUpdateRecord = useRef<any>(null);
  const userListRef = useRef<any[]>([]);
  const listUpdate = useRef<any[]>([]);

  useEffect(() => {
    fetchUserList("");
  }, []);

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  const fetchUserList = async (filter: string) => {
    setLoading(true);
    const data: any = await axiosClient.get(`/users?filter=${filter}`);
    setUsers(data);
    userListRef.current = [...data];
    setLoading(false);
  };

  const handleOnChange = (e: any) => {
    const value = e.target.value || "";
    if (timeoutSearch.current) {
      clearTimeout(timeoutSearch.current);
    }
    timeoutSearch.current = setTimeout(() => {
      fetchUserList(value);
    }, 300);
  };

  const handleRecordChange = async (index: number, user: any) => {
    if (timeoutUpdateRecord.current) {
      clearTimeout(timeoutUpdateRecord.current);
    }
    user.bod = moment(user.bod).format("YYYY-MM-DD")
    timeoutUpdateRecord.current = setTimeout(() => {
      const tempList = [...users];
      tempList[index] = user;
      setUsers(tempList);
      listUpdate.current = tempList.filter(function (o1) {
        return !userListRef.current.some(function (o2) {
          return (
            o1.id === o2.id &&
            o1.email === o2.email &&
            o1.username === o2.username &&
            o1.bod === o2.bod
          );
        });
      });
    }, 500);
  };

  const updateRecords = async () => {
    setLoading(true);
    setErrors([]);
    if (listUpdate.current.length > 0) {
      try {
        await axiosClient.post("/users", { userList: listUpdate.current });
        await fetchUserList("");
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        if (error.response?.status === 400) {
          setErrors(error.response.data.errors);
        } else {
          throw error;
        }
      }
    }
  };

  return (
    <div className="user-list-wrapper">
      {loading ? (
        <h3>Loading data...</h3>
      ) : (
        <div>
          <h3>
            User List <button onClick={updateRecords}>Update Users</button>{" "}
          </h3>
        </div>
      )}
      {errors.length > 0 &&
        errors.map((e, index) => <p key={index}> {JSON.stringify(e)} </p>)}
      <div className="filter-controller" style={{ margin: "16px 0" }}>
        <input
          type="text"
          placeholder="input to search"
          style={{ width: "60%" }}
          onChange={handleOnChange}
        />
      </div>

      {users.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>BirthDate</th>
            </tr>
          </thead>
          <tbody>
            {users.map((e, index) => (
              <tr key={e.id}>
                <td>
                  <input
                    type="text"
                    defaultValue={e.username}
                    style={{ width: "80%" }}
                    onChange={(evt) =>
                      handleRecordChange(index, {
                        ...e,
                        username: evt.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    defaultValue={e.email}
                    style={{ width: "80%" }}
                    onChange={(evt) =>
                      handleRecordChange(index, {
                        ...e,
                        email: evt.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <input
                    type="date"
                    defaultValue={moment(e.bod).format("YYYY-MM-DD")}
                    style={{ width: "80%" }}
                    onChange={(evt) =>
                      handleRecordChange(index, {
                        ...e,
                        bod: evt.target.value,
                      })
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Admin;
