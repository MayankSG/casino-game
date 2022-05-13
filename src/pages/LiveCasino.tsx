/* eslint-disable jsx-a11y/img-redundant-alt */
import axios from "axios";
import React, { useEffect, useState } from "react";

const LiveCasino = () => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    const apicall = () => {
      axios
        .get(
          "https://dev-gateway.7mojos.com/api/lobby/games?&operatorToken=654be709f71140f7aa65dcd8cede80d4&currency=USD&type=any"
        )
        .then((res: any) => setdata(res.data))
        .catch((err) => console.log(err));
    };
    apicall();
  }, []);
  const livedata =
    data &&
    data?.filter(
      (featuredata: any) =>
        featuredata.isFeatured === false &&
        featuredata.name === "Andar Bahar Dev"
    );
  const BlackjackDev =
    data &&
    data?.filter(
      (featuredata: any) =>
        featuredata.isFeatured === false && featuredata.name === "Blackjack Dev"
    );
  const dragontiger =
    data &&
    data?.filter(
      (featuredata: any) =>
        featuredata.isFeatured === false &&
        featuredata.name === "Dragon Tiger Dev"
    );
  const handleclick = (client: any, host: any, token: any) => {
    window.open(
      `${host}?gameToken=${token}&operatorToken=654be709f71140f7aa65dcd8cede80d4&playerToken=Player777&host=${client}`
    );
  };
  return (
    <div>
      {livedata.length === 0 &&
      dragontiger.length === 0 &&
      BlackjackDev.length === 0 ? (
        <div className="spinner-logo position-relative">
          <img
            className="position-absolute start-50 top-50 translate-middle"
            src="../logo.png"
            alt="Logo"
          />
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="tab-content text-white">
          <div id="casino" className="tab-pane active">
            <div className="row mx-0">
              <div className="col-md-10 mx-auto">
                <h5 className="text-start text-white fw-normal mt-3">
                  Andar Bahar
                </h5>
              </div>
              <div className="col-md-12 mx-auto p-0">
                <div className="row mx-0 bg-blue py-4">
                  <div className="col-md-10 mx-auto p-0">
                    <div className="row mx-0">
                      {livedata.map((val: any,index:number) => (
                        <div key={index}
                          onClick={(event: React.MouseEvent<HTMLElement>) => {
                            handleclick(val.hostUrl, val.clientUrl, val.token);
                          }}
                          className="col-md-3"
                        >
                          <div className="info-box">
                            <div className="info-bg">
                              <img
                                className="img-fluid rounded-3"
                                src={val.thumbnails[0].imageUrl}
                                alt="image"
                              />
                              <div className="d-flex align-items-center justify-content-between p-2">
                                <h6 className="fw-light mb-0">
                                  Andar Bahar Dev
                                </h6>
                                <div className="player-txt">
                                  /{" "}
                                  <img
                                    className="mx-1"
                                    src="../players.svg"
                                    alt="Players"
                                  />
                                  0
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* dragon Tiger Here */}
            <div className="row mx-0">
              <div className="col-md-10 mx-auto">
                <h5 className="text-start text-white fw-normal mt-3">
                  Dragon Tiger
                </h5>
              </div>
              <div className="col-md-12 mx-auto p-0">
                <div className="row mx-0 bg-blue py-4">
                  <div className="col-md-10 mx-auto p-0">
                    <div className="row mx-0">
                      {dragontiger.map((val: any,index:number) => (
                        <div key={index}
                          onClick={(event: React.MouseEvent<HTMLElement>) => {
                            handleclick(val.hostUrl, val.clientUrl, val.token);
                          }}
                          className="col-md-3"
                        >
                          <div className="info-box">
                            <div className="info-bg">
                              <img
                                className="img-fluid rounded-3"
                                src={val.thumbnails[0].imageUrl}
                                alt="image"
                              />
                              <div className="d-flex align-items-center justify-content-between p-2">
                                <h6 className="fw-light mb-0">Dragon Tiger</h6>
                                <div className="player-txt">
                                  /{" "}
                                  <img
                                    className="mx-1"
                                    src="../players.svg"
                                    alt="Players"
                                  />
                                  0
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* BlackJack */}
            <div className="row mx-0">
              <div className="col-md-10 mx-auto">
                <h5 className="text-start text-white fw-normal mt-3">
                  Black Jack
                </h5>
              </div>
              <div className="col-md-12 mx-auto p-0">
                <div className="row mx-0 bg-blue py-4">
                  <div className="col-md-10 mx-auto p-0">
                    <div className="row mx-0">
                      {BlackjackDev.map((val: any,index:number) => (
                        <div key={index}
                          onClick={(event: React.MouseEvent<HTMLElement>) => {
                            handleclick(val.hostUrl, val.clientUrl, val.token);
                          }}
                          className="col-md-3"
                        >
                          <div className="info-box">
                            <div className="info-bg">
                              <img
                                className="img-fluid rounded-3"
                                src={val.thumbnails[0].imageUrl}
                                alt="image"
                              />
                              <div className="d-flex align-items-center justify-content-between p-2">
                                <h6 className="fw-light mb-0">Black Jack</h6>
                                <div className="player-txt">
                                  /{" "}
                                  <img
                                    className="mx-1"
                                    src="../players.svg"
                                    alt="Players"
                                  />
                                  0
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveCasino;
