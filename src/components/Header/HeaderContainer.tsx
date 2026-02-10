import React, {Component} from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { HeaderPropsTypes } from "../../types/Types";

class HeaderContainer extends Component<HeaderPropsTypes> {
  render() {
  return (
    <>
    <Header />
    </>
  )}
};

export default HeaderContainer;
