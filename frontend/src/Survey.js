import "survey-core/defaultV2.css";
import { StylesManager, Model, } from "survey-core";
import { Survey } from "survey-react-ui";
import { useState } from "react";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

StylesManager.applyTheme("defaultV2");

const json = {
    elements: [
        {
            type: "text", name: "name",
            title: "What is your name?", isRequired: true
        },
        {
            type: "text", name: "dob",
            title: "When is your Date of Birth?", isRequired: true,
            description: "ie 2000-01-29"
        },
        {
            "type": "rating",
            "name": "happy",
            "title": "on a scale from 1-5, how happy do you feel ?",
            "isRequired": true,
            "rateMin": 1,
            "rateMax": 5,
        }, {
            "type": "rating",
            "name": "energetic",
            "title": "on a scale from 1-5, how energetic do you feel ?",
            "isRequired": true,
            "rateMin": 1,
            "rateMax": 5,
        }, {
            "type": "rating",
            "name": "hopefull",
            "title": "on a scale from 1-5, how hopefull do you feel about the future ?",
            "isRequired": true,
            "rateMin": 1,
            "rateMax": 5,
        }, {
            "type": "rating",
            "name": "sleep",
            "title": "how many hours have you slept last night ?",
            "isRequired": true,
            "rateMin": 1,
            "rateMax": 8,
        },
    ]
};

function Chart(props) {
    const { data } = props;

    return (<BarChart
        width={500}
        height={300}
        data={data}
        margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
        }}
    >
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Today" fill="#8884d8" />
        <Bar dataKey="Average" fill="#82ca9d" />
        <Bar dataKey="Same Age" fill="#FF5733" />
    </BarChart>)

}
export function SurveyComponent() {
    const [showAnalytics, setShowAnalytics] = useState(false);
    const [responseData, setResponseData] = useState([]);
    const survey = new Model(json);
    survey.onComplete.add((sender, options) => {
        const { name, dob, happy, energetic, hopefull, sleep } = sender.data
        fetch(`http://localhost:3001/add?name=${name}&dob=${dob}&happy=${happy}&energetic=${energetic}&hopefull=${hopefull}&sleep=${sleep}`)
            .then(response => response.json())
            .then(data => {
                setResponseData(data);
                setShowAnalytics(true);
            }).catch(console.error)
    });

    return <div>
        {!showAnalytics ?
            <div><Survey model={survey} /></div> :
            <div> <Chart data={responseData} /> </div>}
    </div>
}

