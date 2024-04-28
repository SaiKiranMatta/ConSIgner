"use client"
import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

import containerData from './data.json';

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const renderContainerData = (containerData) => {
    const series = [];
    const { boxes, spaceOptimizationFactor } = containerData;

    for (const boxData of boxes) {
        const { box, location } = boxData;
        const color = getRandomColor();
        const optimizedLocation = {
            z: location.z * spaceOptimizationFactor,
            y: location.y * spaceOptimizationFactor,
            x: location.x * spaceOptimizationFactor,
        };

        series.push({
            type: 'column',
            data: [{
                x: optimizedLocation.x,
                y: optimizedLocation.y,
                z: optimizedLocation.z,
                length: box.length,
                width: box.width,
                height: box.height,
                color: color,
            }],
        });
    }

    return series;
};

const MyHighchartsPlot = () => {
    const series = renderContainerData(containerData);

    const options = {
        chart: {
            type: 'column',
            options3d: {
                enabled: true,
                alpha: 15,
                beta: 15,
                depth: 100,
                viewDistance: 25,
            },
        },
        title: {
            text: 'Container Visualization',
        },
        xAxis: {
            title: {
                text: 'X Axis',
            },
        },
        yAxis: {
            title: {
                text: 'Y Axis',
            },
        },
        zAxis: {
            title: {
                text: 'Z Axis',
            },
            showFirstLabel: false,
        },
        series: series,
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
};

const HomePage = () => {
    return (
        <div>
            <h1>Container Visualization</h1>
            <MyHighchartsPlot />
        </div>
    );
};

export default HomePage;
