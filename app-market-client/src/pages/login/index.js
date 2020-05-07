import React, {Component} from 'react';
import {Button, Card, Col, Container, Row} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";
import axios from "axios";
import {STORAGE_NAME} from "../../utils/constant";
import {toast} from "react-toastify";
import router from "umi/router";
import {connect} from "dva";

@connect(({app}) => ({app}))
class Login extends Component {
  render() {

    const login = (e, v) => {
      axios.post("http://localhost/api/auth/login", v).then(res => {
        if (res.status === 200) {
            localStorage.setItem(STORAGE_NAME, 'Bearer ' + res.data);
            toast.success("Tizimga kiridingiz");
            this.props.dispatch({
              type: 'app/userMe'
            });
            router.push("/")
          } else {
            toast.error("Parol yoki login xato")
          }
        }
      ).catch(bolta => {
        toast.error("Parol yoki login xato")
      })
    };

    return (
      <div className="login-page registration">
        <Container>
          <Row>
            <Col md={4} className="offset-4 mt-5">
              <Card className="border-0">
                <div className="card-body">
                  <h3 className="font-weight-bold enter-login text-center">Tizimga kirish</h3>
                  <AvForm onValidSubmit={login}>
                    <Row>
                      <Col md={10} className="offset-1">
                        <div className="form-group">
                          <AvField label="Telefon raqamingizni kiriting" type="text" id="phoneNumber"
                                   className=""
                                   name="phoneNumber" placeholder="Telefon raqam" required errorMessage="Bunday raqam sistemada mavjud emas."/>
                          <AvField type="password"
                                   id="password"
                                   className=""
                                   label="Parolingizni kiriting"
                                   name="password" placeholder="****" required errorMessage="Parolni qaytadan kiriting."/>
                          <Row>
                            <Col md={6} className="offset-3">
                              <Button className="btn mt-3 enter-button btn-block ">Kirish</Button>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </AvForm>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Login.propTypes = {};

export default Login;
