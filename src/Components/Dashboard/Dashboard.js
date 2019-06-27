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
      stateText: '',
      gaugeEndpoint: GaugeEndpoint,
      textEndPoint: TextEndPoint,
      stateEndPoint: StateEndPoint
    };
  }

  componentDidMount() {
    const { gaugeEndpoint, stateEndPoint, textEndPoint } = this.state;
    let { stateText, textList } = this.state;

    const socket = socketIOClient(gaugeEndpoint);
    const speechSocket = socketIOClient(textEndPoint);
    const stateSocket = socketIOClient(stateEndPoint);

    socket.on("update", data => this.setState({ response: data }));
    speechSocket.on("update", data => {
      textList.push(data);
      this.setState({textList});
      this.scrollToBottom();
    });
    stateSocket.on("update", data => {
      stateText = data;
      this.setState({stateText});
    });
  }

  scrollToBottom = () => {
    this.textEndRef.scrollIntoView({ behavior: "smooth" });
  }

  render() {
    const { response, textList, stateText } = this.state;
    return (
      <div className="container-fluid app-body dashboard">
        <Row>
          <Col className="column" xs={24} sm={24} md={12} lg={12} xl={12}>
            <Card title="Card title">
              <div className="card-content">
                {response ? (
                  <Progress type="circle" percent={response} />
                ) : (
                  <Progress type="circle" percent={0} />
                )}
              </div>
            </Card>
          </Col>
          <Col className="column" xs={24} sm={24} md={12} lg={12} xl={12}>
            <Card title="Card title">
              <div className="card-content card-list-content">
                {
                  textList.map((text, key) => (
                    <p className="speech-text" key = {key}>{text}</p>
                  ))
                }
                <div ref={this.textEndRef} />
              </div>
            </Card>
          </Col>
        </Row>
        <Row align="bottom">
          <Col className="column" xs={24} sm={24} md={12} lg={12} xl={12}>
            <Card title="Card title">
              <div className="card-content">
                <p className="alert-text">{stateText || 'Ok'}</p>
              </div>
            </Card>
          </Col>
          <Col className="column" xs={24} sm={24} md={12} lg={12} xl={12}>
            <Card title="Card title">
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