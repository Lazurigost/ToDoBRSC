import React, { useState, useEffect } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import Moment from "moment";
import "moment/locale/ru";
import { Card, Checkbox, Button, Tooltip, Flex, Space, Progress } from "antd";
import "../Todo/static/css/Todo.css";
import Meta from "antd/es/card/Meta";
import UpdateTaskModal from "./Modals/UpdateTaskModal";
import { getColorTask } from "./Helpers/OptionsPriority";
import DeleteModal from "./Modals/DeleteTaskModal";
import { getTasks } from "./FetchData/GetTasks";

const TaskItem = ({ task, deleteAction, updateAction }) => {
  const colorTask = getColorTask(task.priority);

  const [checked, setChecked] = useState(task.isDone);

  const taskCopy = { ...task };

  const labelCheckBox = checked ? "Выполнено" : "В работе";

  return (
    <Card
      vertical
      size="small"
      style={{
        backgroundColor: colorTask[0],
        margin: "10px",
        marginRight: "10px",
        borderColor: colorTask[2],
        borderWidth: "2px",
      }}
    >
      <Flex justify="space-between" align="center" vertical>
        <div></div>
        
            <Space wrap>
                <Meta
                    description={`До ${Moment(new Date(task.term)).format(
                        "D MMMM Y"
                    )}`}
                ></Meta>
            </Space>
        <h4 className="title-task" style={{ fontSize: "50px" }}>
          {task.name}
        </h4>
        <p className="description-task" style={{fontSize:"20px"}}>
            {task.description}
        </p>
        <Space wrap>
          
          <Card
            size="big"
            style={{ width: "150pt" }}
            title={
              <Checkbox
                onChange={(e) => {
                  task.isDone = e.target.checked;
                  setChecked(task.isDone);
                  updateAction(task.id, task);
                }}
                checked={task.isDone}
              >
                {labelCheckBox}
              </Checkbox>
            }
          >
            <Space wrap>
              <UpdateTaskModal
                updateTask={() => updateAction(task.id, task)}
                task={task}
                taskCopy={taskCopy}
              ></UpdateTaskModal>
            </Space>
            <DeleteModal
              deleteTask={() => deleteAction(task.id)}
              task={task}
            ></DeleteModal>
          </Card>
        </Space>
      </Flex>
    </Card>
  );
};

export default TaskItem;
