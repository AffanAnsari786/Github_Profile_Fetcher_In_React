import React, { useState } from 'react';

function UserDetail() {

  const [user, setUser] = useState('');
  const [userData, setUserData] = useState('');
  const [userExist, setUserExist] = useState(false);

  const getUser = async (username) => {
    const APIURL = "https://api.github.com/users/";
    const response = await fetch(APIURL + username);
    if (response.ok) {
      const data = await response.json();
      setUserData(data);
      setUserExist(true);
      console.log(data);
    } else {
        alert("User Does not Exist");
        setUserExist(false);
    }
  };


  const { name, followers, following, bio, avatar_url, public_repos, html_url } = userData;

  return (
    <>
      <div className='searchBar'>
        <div className="title">
          <h1>Search Github Profile</h1>
        </div>
        <div className="search">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Enter Github Username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <button id="searchbtn" onClick={() => getUser(user)}>
            Search
          </button>
        </div>
      </div>

      {userData? (
        <div className="card">
          <div className="imgBox">
            <img src={avatar_url} alt="UserImage" />
          </div>
          <div className="content">
            <div className="detail">
              <h2>{name}<br /><span>{bio}</span></h2>

              <div className="data">
                <h3>{public_repos}<br /><span>Repository</span></h3>
                <h3>{followers}<br /><span>Follower</span></h3>
                <h3>{following}<br /><span>Following</span></h3>
              </div>

              <div className="actionBtn">
                <a href={html_url} target="_blank" rel="noopener noreferrer">More Info</a>
                <a href={html_url} target="_blank" rel="noopener noreferrer">Follow</a>
              </div>
            </div>
          </div>
        </div>
      ) : 
      userExist?(
        <h1>User Doesn't Exist</h1>
      ): "" }
    </>
  );
}

export default UserDetail;
