import profileImage from "../assets/development/defaultProfileImage.jpg";
import "../css/setting.css";
const Setting = () => {
  const hancldeFake = () => {};
  return (
    <>
      <div className="profile_details_container">
        <div className="border_bootm">
          <h5 className="quicksand-600-18">Profile Details</h5>
        </div>
        <form aria-autocomplete="both" style={{ padding: "0px 6px" }}>
          <div className="profile_details">
            <div className="name_group">
              <div className="form_group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value="Angela L. Callahan"
                  onChange={hancldeFake}
                />
              </div>
              <div className="form_group">
                <label htmlFor="email">Email Address:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  readOnly
                  value="Angela@gmail.com"
                  onChange={hancldeFake}
                />
              </div>
              <div className="form_group">
                <label htmlFor="phonenumber">Phone No:</label>
                <input
                  type="text"
                  id="phonenumber"
                  name="phonenumber"
                  value="939293944"
                  onChange={hancldeFake}
                />
              </div>
            </div>
            <div className="profilePicdv">
              <input
                type="file"
                name="profilePic"
                id="fileInput"
                className="hidden-input"
              />
              <label
                htmlFor="fileInput"
                className="edit_icon"
                style={{ cursor: "pointer" }}
              >
                <div style={{ position: "relative", width: "fit-content" }}>
                  <img
                    src={profileImage}
                    alt="profile"
                    className="profilepic"
                    style={{ width: "200px" }}
                  />
                  <span className="profile_picker">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M9.65 4.4625L7.525 2.3625L8.225 1.6625C8.41667 1.47083 8.65217 1.375 8.9315 1.375C9.21083 1.375 9.44617 1.47083 9.6375 1.6625L10.3375 2.3625C10.5292 2.55417 10.6292 2.7855 10.6375 3.0565C10.6458 3.3275 10.5542 3.55867 10.3625 3.75L9.65 4.4625ZM8.925 5.2L3.625 10.5H1.5V8.375L6.8 3.075L8.925 5.2Z"
                        fill="white"
                      ></path>
                    </svg>
                  </span>
                </div>
              </label>
            </div>
          </div>
          <div className="profile_password">
            <div className="border_bootm">
              <h5>Change Password</h5>
            </div>
            <div className="form_group">
              <label htmlFor="oldPassword">Enter Old Password:</label>
              <input
                type="password"
                name="oldPassword"
                value="oldPassword"
                id="oldPassword"
                onChange={hancldeFake}
              />
            </div>
            <div className="form_group">
              <label htmlFor="newPassword">Enter New Password:</label>
              <input
                type="password"
                name="newPassword"
                value="newPassword"
                id="newPassword"
                onChange={hancldeFake}
              />
            </div>
          </div>
          <button className="saveButton quicksand-500-18 parrot_background">
            Save Updates
          </button>
        </form>
      </div>
    </>
  );
};

export default Setting;
