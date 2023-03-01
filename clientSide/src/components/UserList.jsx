import React, { useState, useEffect } from "react";
import { Avatar, useChatContext } from "stream-chat-react";
import { InviteIcon } from "../assets";

// * a component to style some layouts
const ListContainer = ({ children }) => {
  return (
    <div className="user-list__container">
      <div className="user-list__header">
        <p>User</p>
        <p>Invite</p>
      </div>
      {children}
    </div>
  );
};
const UserItem = ({ user, setSelectedUsers }) => {
  const [selected, setSelected] = useState(false); //* keeps the check mark but since we cannot get all selected items lets create an array that keeps selected users in create channel
  const handleSelected = () => {
    // * we check if it was selected user and we remove him from the list by filtering the list and returning the list excluding our user but if he was not selected before we handle it in the else block by adding his id to the list

    if (selected) {
      setSelectedUsers((prevUsers) =>
        prevUsers.filter((prevUser) => prevUser !== user.id)
      );
    } else {
      setSelectedUsers((prevUsers) => [...prevUsers, user.id]);
    }

    setSelected((prevSelected) => !prevSelected);//* invitation toggle
  };
  return (
    <div
      className="user-item__wrapper"
      style={{ marginTop: "10px" }}
      onClick={handleSelected}
    >
      <div className="user-item__name-wrapper">
        <Avatar image={user.image} name={user.fullName || user.id} size={36} />
        <p className="user-item__name">{user.fullName || user.id}</p>
      </div>
      {selected ? <InviteIcon /> : <div className="user-item__invite-empty" />}
    </div>
  );
};

// * a component

const UserList = ({ setSelectedUsers }) => {
  const { client } = useChatContext(); //* we get the user itself here
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false); //* to show it while querying users
  const [error, setError] = useState(false);

  const [isListEmpty, setIsListEmpty] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      //* we set the loading false and once we start querying users we set it true
      if (loading) return;
      setLoading(true);
      try {
        //* we query the users except the client him self
        const response = await client.queryUsers(
          {
            id: { $ne: client.userID },
          },
          {
            id: 1, //* this is sorting order
          },
          {
            // limit: 8,
          }
        );

        //   * now check for responses
        if (response.users.length) {
          setUsers(response.users);
        } else {
          setIsListEmpty(true);
        }
      } catch (error) {
        console.log("*--* There is error in Querying users List");
        console.log(error);
        setError(true);
      }
      setLoading(false); //* get back to non loading state
    };

    if (client) getUsers();
  },[]);

  // * if we get the error for querying let us show this
  if (error)
    return (
      <ListContainer>
        <div className="user-list__message">
          Error Loading . . . , Try agin Later !
        </div>
      </ListContainer>
    );
  // * if we get the no user for querying let us show this
  if (isListEmpty)
    return (
      <ListContainer>
        <div className="user-list__message">No users Found !!</div>
      </ListContainer>
    );


  return (
    <ListContainer>
      {loading ? (
        <div className="user-list__message">Loading users . . . </div>
      ) : (
        users?.map((user, i) => {
          return (
            <UserItem
              index={i}
              key={user.id}
              user={user}
              setSelectedUsers={setSelectedUsers}
            />
          );
        })
      )}
    </ListContainer>
  );
};

export default UserList;
