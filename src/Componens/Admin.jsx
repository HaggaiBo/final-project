import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase"; // Import your Firestore instance
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
export default function Admin() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedMoney, setEditedMoney] = useState("10000");
  const [editedFirstName, setEditedFirstName] = useState("");
  const [editedLastName, setEditedLastName] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userCollection = collection(db, "Users");
        const userSnapshot = await getDocs(userCollection);
        const userData = userSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(userData);
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setEditedMoney(user.name);
  };

  const handleNameChange = (e) => {
    setEditedMoney(e.target.value);
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const userRef = doc(db, "Users", selectedUser.id);
      await updateDoc(userRef, { money: editedMoney });
      // Update the user's name in the local state
      const updatedUsers = users.map((user) =>
        user.id === selectedUser.id ? { ...user, money: editedMoney,firstname:editedFirstName,lastName:editedLastName } : user
      );
      setUsers(updatedUsers);
      setSelectedUser(null);
    } catch (error) {
      console.error("Error updating user: ", error);
    }
  };

  return (
    <div className="text-light d-flex col-12" style={{ height: "85vh" }}>
    
        <div className="m-5"style={{fontStyle:"italic",textDecoration:"underLine"}}>
        <h1 className="m-4">User List</h1>
          <ul>
            {users.map((user, index) => (
              <li key={index} onClick={() => handleUserClick(user)} className="li_css_admin">
                <h5>
                  {user.firstname} {user.lastName} {user.money} coins
                </h5>
                <p></p>
              </li>
            ))}
          </ul>
        </div>
        {selectedUser && (
            <div>
            <div className="col-6 mt-5 m-4">

              <h5 className="text-danger">{selectedUser.id}</h5>
              <Form>
                <Form.Group
                  className="mb-1"
                  controlId="firsName"
                  onChange={(e) => {setEditedFirstName(e.target.value) ;console.log(editedFirstName)}}
                >
                  <Form.Label>first Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="first"
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
              </Form>
              <Form>
                <Form.Group
                  className="mb-1"
                  controlId="lastName"
                  onChange={(e) => setEditedLastName(e.target.value)}
                >
                  <Form.Label>last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="last"
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
              </Form>
              <Form>
                <Form.Group
                  className="mb-1"
                  controlId="money"
                  onChange={(e) => setEditedMoney(e.target.value)}
                >
                  <Form.Label>money</Form.Label>
                  <Form.Control
                    type="number"
                    
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                <Button
              variant="primary"
              className="m-4"
              size="lg"
              type="submit"
              onClick={handleSaveChanges}
            >
              update
            </Button>
              </Form>
            </div>

          </div>
        )}
      </div>
    
  );
}
