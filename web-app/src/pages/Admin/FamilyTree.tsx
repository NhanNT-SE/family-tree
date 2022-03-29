import React, { useEffect, useState } from "react";
import FT from "../../components/FT";
import { axiosClient } from "../../helpers/axios-client";

function FamilyTree() {
  const [nodes, setNodes] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showNote, setShowNote] = useState<boolean>(false);

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    try {
      setLoading(true);
      const data: any = await axiosClient.get("/family-tree");
      setNodes(data);
      setLoading(false);
      return;
    } catch (error: any) {
      setLoading(false);
      throw error;
    }
  };

  const onFileSelect = async (e: any) => {
    try {
      setLoading(true);
      const file = e.target.files[0];
      if (file) {
        let formData = new FormData();
        formData.append("json", file);
        const data: any = await axiosClient.post("/family-tree", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setNodes(data);
        e.target.value = null;
        setLoading(false);
      }
    } catch (error: any) {
      if (error.response?.data?.errors) {
        setError(JSON.stringify(error.response.data.errors));
      }
      setLoading(false);
    }
  };
  return (
    <div style={{ height: "100%" }}>
      {loading && <h4>Loading ...</h4>}
      <p>
        Please read the{" "}
        <span
          style={{ cursor: "pointer", color: "red" }}
          onClick={() => setShowNote(!showNote)}
        >
          note here
        </span>{" "}
        before you upload
      </p>
      <div>
        {showNote && (
          <>
            <p>
              Please follow the correct json format for Family Tree below.
              <a href="http://localhost:3000/example.json" target="_blank" rel="noreferrer">
                click here
              </a>{" "}
              for example.
            </p>
            <div style={{ display: "flex" }}>
              <ul>
                <li>
                  field <b>id</b>
                </li>
                <li>type: number</li>
                <li>require: true</li>
                <li>unique: true</li>
              </ul>
              <ul>
                <li>
                  field <b>pids</b>
                </li>
                <li>
                  pids are the partner ids, represents connection <br /> between
                  two partners (wife and husband)
                </li>
                <li>type: array number</li>
                <li>require: true</li>
              </ul>
              <ul>
                <li>
                  field <b>mid (mother id)</b>
                </li>
                <li>type: number</li>
                <li>require: false</li>
                <li>unique: false</li>
              </ul>
              <ul>
                <li>
                  field <b>fid (father id)</b>
                </li>
                <li>type: number</li>
                <li>require: false</li>
                <li>unique: false</li>
              </ul>
            </div>
            <div style={{ display: "flex" }}>
              <ul>
                <li>
                  field <b>name</b>
                </li>
                <li>type: string</li>
                <li>require: true</li>
                <li>unique: false</li>
              </ul>
              <ul>
                <li>
                  field <b>gender</b>
                </li>
                <li>type: string (male or female)</li>
                <li>require: true</li>
                <li>unique: false</li>
              </ul>
              <ul>
                <li>
                  field <b>email</b>
                </li>

                <li>type: string</li>
                <li>require: false</li>
                <li>unique: false</li>
              </ul>
              <ul>
                <li>
                  field <b>bod (birthday)</b>
                </li>
                <li>type: number (YYYY)</li>
                <li>require: false</li>
                <li>unique: false</li>
              </ul>
            </div>
          </>
        )}
      </div>
      <input type="file" accept=".json" onChange={onFileSelect} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {nodes.length > 0 && <FT admin nodes={nodes} />}
    </div>
  );
}

export default FamilyTree;
