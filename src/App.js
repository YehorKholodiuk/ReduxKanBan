import Column from "./Column";
import "bootstrap/dist/css/bootstrap.min.css";
import {connect} from "react-redux";
import ModalDeleteCreateEdit from "./ModalDeleteCreateEdit";
import './App.css';

function App(props) {
  return (
      <div className="App">
        <h1>{props.appName}</h1>


        <ModalDeleteCreateEdit buttonLabel='Create Task' buttonStyle="btn btn-outline-info"
                               modalTitle="Create Task"

        />
        <div className="container">
          <div className="row align-items-start">
            {props.statuses.map(status=>
                <Column
                    key={status._id}
                    status={status}
                />)}
          </div>
        </div>
      </div>
  );
}

const mapStateToProps = (state) => ({
  appName:state.appName,
  statuses:state.statuses
})
export default connect(mapStateToProps)(App);
