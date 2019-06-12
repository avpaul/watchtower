import React from "react";
import logoutIcon from "../../static/Logout.svg"

const CadreLogout = () => (
    <a
      data-toggle="modal"
      data-target="#logout-modal"
      href="/"
    >
      <img
        className="notification__icon"
        src={logoutIcon}
        alt="logoutIcon"
      />
    </a>
)

export default CadreLogout;