import React from "react";
import styles from "./Input.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import InputList from "./InputList";
import clsx from "clsx";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional

class Input extends React.Component {
  state = {
    todoList: [],
    todoValue: { name: "", status: false },
    keyUpdate: -1,
  };
  setUpdateValue(e) {
    this.setState({ todoValue: { name: e.target.value, state: false } });
  }
  setValue(e) {
    this.setState({ todoValue: { name: e.target.value, status: false } });
  }
  handleDelete(e, index) {
    let newArr = this.state.todoList;
    newArr.splice(index, 1);
    this.setState({ todoList: newArr });
  }

  addTodo() {
    let newArr = this.state.todoList;
    newArr.push(this.state.todoValue);
    this.setState({
      todoList: newArr,
    });
    this.setState({ todoValue: { name: "" } });
  }
  handleUpdate(e, item, index) {
    this.setState({
      todoValue: { name: item.name },
      keyUpdate: index,
    });
    console.log(this.state.keyUpdate);
  }
  updateTodo(index) {
    let newArr = this.state.todoList;
    newArr[this.state.keyUpdate].name = this.state.todoValue.name;
    this.setState({ todoValue: { name: "" }, todoList: newArr, keyUpdate: -1 });
  }
  handleDone(index) {
    let newArr = this.state.todoList;
    newArr[index].status = !newArr[index].status;
    this.setState({ todoList: newArr });
  }

  render() {
    return (
      <div className={styles.box}>
        <div className={styles.inputBox}>
          <input
            type="text"
            placeholder="type something..."
            value={this.state.todoValue.name}
            onChange={(e) => {
              this.setValue(e);
            }}
          />
          <div className={styles.iconAdd}>
            {this.state.keyUpdate === -1 ? (
              <FontAwesomeIcon
                onClick={() => {
                  this.addTodo();
                }}
                icon={faPlus}
              />
            ) : (
              <button
                onClick={(e) => {
                  this.updateTodo();
                }}
              >
                Update
              </button>
            )}
          </div>
        </div>
        <div className={styles.inputList}>
          <ul>
            <h1>Your List</h1>
            {this.state.todoList.map((item, index) => {
              return (
                <div
                  className={clsx(styles.boxFlex, {
                    [styles.done]: this.state.todoList[index].status,
                  })}
                >
                  {this.state.todoList[index].status === true ? (
                    <div className={styles.iconDone}>
                      <FontAwesomeIcon
                        style={{ width: "30px", height: "50px" }}
                        icon={faCircleCheck}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  <input
                    type="checkbox"
                    onClick={() => {
                      this.handleDone(index);
                    }}
                  />
                  <button
                    onClick={(e) => {
                      this.handleUpdate(e, item, index);
                    }}
                  >
                    update
                  </button>
                  <InputList
                    key={index}
                    item={item}
                    index={index}
                    delete={(e) => {
                      this.handleDelete(e, index);
                    }}
                    state={this.state}
                    updateTodo={() => {
                      this.updateTodo(this.state.keyUpdate);
                    }}
                    setState={this.setState}
                    setUpdateValue={this.setUpdateValue}
                    updateValue={() => {
                      this.updateTodo(index);
                    }}
                  />
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Input;
