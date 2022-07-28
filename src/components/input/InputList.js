import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import styles from "./InputList.module.scss";

class InputList extends React.Component {
  state = {
    checkUpdate: false,
  };
  updateTodo(index, updateItem) {
    let newArr = this.props.state.todoList;
    newArr[index] = updateItem;
    this.setState({ todoList: newArr });
  }
  render() {
    return (
      <div className={styles.box}>
        <li className={styles.inputBox}>{this.props.item.name} </li>
        <div onClick={this.props.delete} className={styles.iconDelete}>
          <FontAwesomeIcon icon={faTrashCan} />{" "}
        </div>
      </div>
    );
  }
}

export default InputList;
