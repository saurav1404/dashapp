import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Col, Progress, Row } from 'antd';
import { GaugeEndpoint, TextEndPoint, StateEndPoint} from '../../helpers';
import socketIOClient from "socket.io-client";
import './Dashboard.css';

/* eslint eqeqeq: 0 */
export class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      response: false,
      textList: [],
      stateTextList: [],
      gaugeEndpoint: GaugeEndpoint,
      textEndPoint: TextEndPoint,
      stateEndPoint: StateEndPoint
    };
  }

  componentDidMount() {
    const { gaugeEndpoint, stateEndPoint, textEndPoint } = this.state;
    let { stateTextList, textList } = this.state;

    const energySocket = socketIOClient(gaugeEndpoint);
    const speechSocket = socketIOClient(textEndPoint);
    const stateSocket = socketIOClient(stateEndPoint);

    energySocket.on("update", data => this.setState({ response: data }));
    speechSocket.on("update", data => {
      textList.push(data);
      this.setState({textList});
      this.scrollToBottom();
    });
    stateSocket.on("update", data => {
      stateTextList.push(data);
      this.setState({stateTextList});
      this.scrollStateToBottom();
    });
  }

  scrollToBottom = () => {
    var element = document.getElementById("bottom");
    element.scrollIntoView({ behavior: "smooth" });
  }

  scrollStateToBottom = () => {
    var element = document.getElementById("bottom1");
    element.scrollIntoView({ behavior: "smooth" });
  }

  render() {
    const { response, textList, stateTextList } = this.state;
    return (
      <div className="container-fluid app-body dashboard">
        <Row>
          <Col className="column" xs={24} sm={24} md={12} lg={12} xl={12}>
            <Card title="Meeting Energy Level">
              <div className="card-content">
                {response ? (
                  <Progress className="vertically-centered" type="circle" percent={response} />
                ) : (
                  <Progress className="vertically-centered" type="circle" percent={0} />
                )}
              </div>
            </Card>
          </Col>
          <Col className="column" xs={24} sm={24} md={12} lg={12} xl={12}>
            <Card title="Meeting updates">
              <div className="card-content card-list-content">
                {
                  textList.map((text, key) => (
                    <p className="speech-text" key = {key}>{text}</p>
                  ))
                }
                <div id="bottom" />
              </div>
            </Card>
          </Col>
        </Row>
        <Row align="bottom">
          <Col className="column" xs={24} sm={24} md={12} lg={12} xl={12}>
            <Card title="Guidance">
              <div className="card-content">
                {stateTextList.length > 0 &&
                  stateTextList.map((text, key) => (
                    <p className="speech-text alert-text" key = {key}>{text}</p>
                  ))
                }
                {stateTextList.length === 0 &&
                  <p className="vertically-centered alert-text">...</p>
                }
                <div id="bottom1" />
              </div>
            </Card>
          </Col>
          <Col className="column" xs={24} sm={24} md={12} lg={12} xl={12}>
            <Card title="Summary">
              <div className="card-content">
                
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    
  };
}

export default connect(mapStateToProps)(Dashboard);