import React from 'react';

import {
    Col,
    Card
} from "react-bootstrap";
const CustomProjectCard = ({ data }) => {
    console.log("data", data);
    return (
        <Card>
            <Col lg="12">
                <div className="text-center">
                    {/* <img className="bg-white" src={data.companylogo} alt="" /> */}
                    <h3>{data.name}</h3>
                    <p>
                        {data.description}
                        <br />
                    </p>
                    {/* <Language lang={data.lang} /> */}
                    <label>Front-End: <b>{data.frontEnd}</b></label>
                    <br />
                    <label>Back-End: <b>{data.backEnd}</b></label>

                </div>
            </Col>
        </Card>
    );
}

// const Language = ({ lang }) => {
//     console.log("LAng", lang);
//     const array = [];
//     let total_count = lang.length;
//     for (let index in lang) {
//         array.push(lang[index]);
//         //total_count += lang[index];
//     }
//     return (
//         <div className="pb-3">
//             Languages:{" "}
//             {array.length
//                 ? array.map((a) => (
//                     <a
//                         key={a.name}
//                         className="badge badge-light card-link"
//                         target=" _blank"
//                     >
//                         {a.name}:{" "}
//                         {Math.trunc((0 / total_count) * 1000) / 10} %
//                     </a>
//                 ))
//                 : "code yet to be deployed."}
//         </div>
//     );
// };


export default CustomProjectCard;