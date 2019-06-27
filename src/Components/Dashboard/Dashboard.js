import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Col, Progress, Row } from 'antd';
import socketIOClient from "socket.io-client";
import './Dashboard.css';

/* eslint eqeqeq: 0 */
export class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      response: false,
      textList: [],
      endpoint: "http://8e9f2298.ngrok.io",
      textEndPoint: "http://2c53a468.ngrok.io"
    };
  }

  componentDidMount() {
    const { textEndPoint } = this.state;
    let { textList } = this.state;
    // const socket = socketIOClient(endpoint);
    // socket.on("update", data => this.setState({ response: data }));
    const socket = socketIOClient(textEndPoint);
    socket.on("update", data => {
      textList.push(data);
      this.setState({textList})
    });
  }

  render() {
    const { response, textList } = this.state;
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
                    <p key = {key}>{text}</p>
                  ))
                }
              </div>
            </Card>
          </Col>
        </Row>
        <Row align="bottom">
          <Col className="column" xs={24} sm={24} md={12} lg={12} xl={12}>
            <Card title="Card title">
              <div className="card-content">
                <p className="alert-text">Ok</p>
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