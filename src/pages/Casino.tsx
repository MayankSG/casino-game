/* eslint-disable jsx-a11y/img-redundant-alt */
import axios from "axios";
import React, { useEffect, useState } from "react";

const Casino = () => {
  const [filteropen, SetFilterOpen] = useState(false);
  const [filterline, setFilterLine] = useState<any>([]);
  const [filterfeature, setFilterFeature] = useState<any>([]);
  const LinesFilterData = [
    { value: "5", name: "5-10" },
    { value: "30", name: "10-30" },
    { value: "50", name: "30-50" },
    { value: "50", name: "+50" },
  ];
  const handleclickopen = () => {
    SetFilterOpen(!filteropen);
  };
  const [data, setdata] = useState([]);
  useEffect(() => {
    const apicall = () => {
      axios
        .get(
          "https://dev-gateway.7mojos.com/api/lobby/games?&operatorToken=654be709f71140f7aa65dcd8cede80d4&currency=USD&type=any"
        )
        .then((res: any) => setdata(res.data));
    };
    apicall();
  }, []);

  const handleclick = (client: any, host: any, token: any) => {
    window.open(
      `${host}?gameToken=${token}&operatorToken=654be709f71140f7aa65dcd8cede80d4&playerToken=Player777&host=${client}`
    );
  };
  const feature: any =
    data && data?.filter((featuredata: any) => featuredata.isFeatured === true);
  const slots: any =
    data &&
    data?.filter(
      (featuredata: any) =>
        featuredata.isFeatured === false &&
        featuredata.name !== "Andar Bahar Dev"
    );
  const FeatureFilterData = [
    { value: 0, name: "Free Spins" },
    { value: 1, name: "Bonus Game" },
    { value: 2, name: "Scatter Pays" },
    { value: 3, name: "Gamble" },
    { value: 4, name: "Mysteries" },
    { value: 5, name: "Wild" },
    { value: 6, name: "Fruits" },
  ];
  const handleChange = (e: any, tag: string) => {
    if (e.target.checked && tag === "line") {
      setFilterLine([...filterline, e.target.value]);
    } else {
      setFilterLine(filterline.filter((id: any) => id !== e.target.value));
    }
    if (e.target.checked && tag === "feature") {
      setFilterFeature([...filterfeature, e.target.value]);
    } else {
      setFilterFeature(
        filterfeature.filter((id: any) => id !== e.target.value)
      );
    }
  };
  var casino: any;
  filterfeature.forEach((element: any, index: number) => {
    casino = slots.filter((item: any) =>
      item?.slotData?.tags?.includes(Number(filterfeature[index]))
    );
    filterline.forEach((element: any, index: number) => {
      casino = casino.filter(
        (item: any) => item?.slotData?.linesCount <= filterline[index]
      );
      return casino;
    });
    return casino;
  });
  filterline.forEach((element: any, index: number) => {
    casino = slots.filter(
      (item: any) => item?.slotData?.linesCount <= filterline[index]
    );
    filterfeature.forEach((element: any, index: number) => {
      casino = slots.filter((item: any) =>
        item?.slotData?.tags?.includes(Number(filterfeature[index]))
      );
    return casino;
  });
    return casino;
  });
  return (
    <div>
      {feature.length === 0 && slots.length === 0 ? (
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
                  Featured Games
                </h5>
              </div>
              <div className="col-md-12 mx-auto p-0">
                <div className="row mx-0 bg-blue py-4">
                  <div className="col-md-10 mx-auto p-0">
                    <div className="home-imgs">
                      {feature.map((featureval: any, index: number) => (
                        <div
                        key={index}
                        onClick={(
                          event: React.MouseEvent<HTMLElement>
                        ) => {
                          handleclick(
                            featureval.hostUrl,
                            featureval.clientUrl,
                            featureval.token
                          );
                        }}
                        className="home-inner"
                      >
                        <div className="img-box img-box2">
                          <img
                            className="img-fluid rounded-3"
                            src={featureval.thumbnails[0].imageUrl}
                            alt="image"
                          />
                        </div>
                        <div className="badge position-absolute">
                          <div className="badges">
                            <p className="pink mb-0">
                              <span className="me-1 yellow">
                                {featureval?.slotData?.linesCount}
                              </span>
                              Lines
                            </p>
                          </div>
                          {featureval?.slotData?.tags
                            .map(
                              (tag: any) => FeatureFilterData[tag].name
                            )
                            .map((item: any, index: number) => (
                              <div key={index} className="badges">
                                <p className="pink mb-0">
                                  <span className="me-1 green">
                                    {item.split(" ")[0]}
                                  </span>
                                  <span className="me-1 pink">
                                    {item.split(" ")[1]}
                                  </span>
                                </p>
                              </div>
                            ))}
                        </div>
                      </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* start the slot section  */}
            <div className="row mx-0">
              <div className="col-md-10 mx-auto d-flex align-items-center">
                <h5 className="text-start text-white fw-normal mt-3 mr-auto p-2">
                  SLOTS
                </h5>
                <button
                  className={`filter-btn ${
                    filteropen ? "filter-open" : "blue"
                  }`}
                  onClick={(event: React.MouseEvent<HTMLElement>) => {
                    handleclickopen();
                  }}
                >
                  Filter <img src="../down-arrow.svg" />
                </button>
              </div>
              {filteropen ? (
                <>
                  <div className="row mx-0 p-0 bg-blue">
                    <div className="col-md-12 p-0 mx-auto">
                      <div className="filter-sec">
                        <div className="row mx-0">
                          <div className="col-md-10 p-0 mx-auto">
                            <div className="row mx-0">
                              <div className="col-md-3">
                                <div className="text-start">
                                  <h5 className="pb-2 border-bottom">Lines</h5>
                                  {LinesFilterData.map(
                                    (linefilterData: any, index: number) => (
                                      <div
                                        key={index}
                                        className="custom-checkbox"
                                      >
                                        <input
                                          type="checkbox"
                                          value={linefilterData.value}
                                          checked={linefilterData[index]}
                                          onClick={(
                                            event: React.MouseEvent<HTMLElement>
                                          ) => handleChange(event, "line")}
                                        />
                                        <span className="checkmark"></span>
                                        <label className="ms-2 mb-1">
                                          {linefilterData.name}
                                        </label>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div className="text-start">
                                  <h5 className="pb-2 border-bottom">
                                    Game Feature
                                  </h5>
                                  {FeatureFilterData.map(
                                    (featurefilterdata: any, index: number) => (
                                      <div
                                        className="custom-checkbox"
                                        key={index}
                                      >
                                        <input
                                          type="checkbox"
                                          checked={featurefilterdata[index]}
                                          value={featurefilterdata.value}
                                          onClick={(
                                            event: React.MouseEvent<HTMLElement>
                                          ) => handleChange(event, "feature")}
                                        />
                                        <span className="checkmark"></span>
                                        <label className="ms-2 mb-1">
                                          {featurefilterdata.name}
                                        </label>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
              <div className="col-md-12 mx-auto p-0">
                <div className="row mx-0 bg-blue py-4">
                  <div className="col-md-10 mx-auto p-0">
                    <div className="row mx-0">
                      {casino
                        ? casino.map((slot: any, index: number) => (
                            <div
                              key={index}
                              onClick={(
                                event: React.MouseEvent<HTMLElement>
                              ) => {
                                handleclick(
                                  slot.hostUrl,
                                  slot.clientUrl,
                                  slot.token
                                );
                              }}
                              className="col-md-3"
                            >
                              <div className="img-box">
                                <img
                                  className="img-fluid rounded-3"
                                  src={slot.thumbnails[0].imageUrl}
                                  alt="image"
                                  title={slots[index].name}
                                />
                              </div>
                              <div className="badge position-absolute">
                                <div className="badges">
                                  <p className="pink mb-0">
                                    <span className="me-1 yellow">
                                      {slot?.slotData?.linesCount}
                                    </span>
                                    Lines
                                  </p>
                                </div>
                                {slot?.slotData?.tags
                                  .map(
                                    (tag: any) => FeatureFilterData[tag].name
                                  )
                                  .map((item: any, index: number) => (
                                    <div key={index} className="badges">
                                      <p className="pink mb-0">
                                        <span className="me-1 green">
                                          {item}
                                        </span>
                                      </p>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          ))
                        : slots.map((slot: any, index: number) => (
                            <div
                              key={index}
                              onClick={(
                                event: React.MouseEvent<HTMLElement>
                              ) => {
                                handleclick(
                                  slot.hostUrl,
                                  slot.clientUrl,
                                  slot.token
                                );
                              }}
                              className="col-md-3"
                            >
                              <div className="img-box">
                                <img
                                  className="img-fluid rounded-3"
                                  src={slot.thumbnails[0].imageUrl}
                                  alt="image"
                                  title={slots[index].name}
                                />
                              </div>
                              <div className="badge position-absolute">
                                <div className="badges">
                                  <p className="pink mb-0">
                                    <span className="me-1 yellow">
                                      {slot?.slotData?.linesCount}
                                    </span>
                                    Lines
                                  </p>
                                </div>
                                {slot?.slotData?.tags
                                  .map(
                                    (tag: any) => FeatureFilterData[tag].name
                                  )
                                  .map((item: any, index: number) => (
                                    <div key={index} className="badges">
                                      <p className="pink mb-0">
                                        <span className="me-1 green">
                                          {item.split(" ")[0]}
                                        </span>
                                        <span className="me-1 pink">
                                          {item.split(" ")[1]}
                                        </span>
                                      </p>
                                    </div>
                                  ))}
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

export default Casino;
function b(b: any, arg1: string) {
  throw new Error("Function not implemented.");
}
