import React, {useState} from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {connect} from "react-redux";

function ModalDeleteCreateEdit(props) {
    const [modal, setModal] = useState(false);

    const [name, setName] = useState(props.modalTitle === "Create Task"
        ? ""
        : props.task.name)
    const [description, setDescription] = useState(props.modalTitle === "Create Task"
        ? ""
        : props.task.description)
    const [status, setStatus] = useState(props.modalTitle === "Create Task"
        ? props.statuses[0].title
        : props.task.status)
    const [priority, setPriority] = useState(props.modalTitle === "Create Task"
        ? props.priorities[0]
        : props.task.priority)

    console.log(props.task)

    const onSave = () => {
        if(props.modalTitle === "Create Task") {
            const newTask = {_id: Math.random().toString(), name, description, status, priority}
            props.createNewTask(newTask);
        }
        if(props.modalTitle === 'Edit Task') {
            const updateTask = {name, description, status, priority}
            props.editTask(props.task._id, updateTask)
        }
        if(props.modalTitle === 'Delete Task'){
            props.deleteTask(props.task._id)
        }
        toggle()
    }

    const toggle = () => setModal(!modal);

    return (
        <>
            <Button color={props.buttonStyle} onClick={toggle}>
                {props.buttonLabel}
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>{props.modalTitle}</ModalHeader>
                <ModalBody>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-default"> Name
                        </span>
                        <input
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            type="text" className="form-control" aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default"/>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-default"> Description
                        </span>
                        <input
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            type="text" className="form-control" aria-label="Sizing example input"
                            aria-describedby="inputGroup-sizing-default"/>
                    </div>
                    <div className="input-group mb-3">
                        <select
                            value={status}
                            onChange={(event) => setStatus(event.target.value)}
                            className="form-select" aria-label="Disabled select example">
                            {props.statuses.map(el=>
                                <option key={el._id} value={el.title}>{el.title}</option>
                            )}
                        </select>
                    </div>
                    <div className="input-group mb-3">
                        <select value={priority}
                                onChange={(event) => setPriority(event.target.value)}
                                className="form-select" aria-label="Disabled select example">
                            {props.priorities.map((el, ind)=>

                                <option  key={ind} value={el}>{el}</option>
                            )}
                        </select>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={onSave}>
                        {props.modalTitle === 'Delete Task' ? "Delete": "Save"}
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

const mapStateToProps = (state) => ({
    statuses: state.statuses,
    priorities: state.priorities
})
const mapDispatchToProps = (dispatch) => ({
    createNewTask:(newTask)=>dispatch({type:"CREATE_TASK", payload:newTask}),
    editTask:(id,updateTask)=> dispatch({type:"UPDATE_TASK", payload:{id, updateTask}}),
    deleteTask:(id)=> dispatch({type:"DELETE_TASK", payload: {id:id}})
})
export default connect(mapStateToProps, mapDispatchToProps)(ModalDeleteCreateEdit);
